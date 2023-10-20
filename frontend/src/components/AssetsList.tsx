import { memo, useState } from "react"
import { Row, Col, Avatar, Button, Space, Tooltip } from "antd"
import {
  DislikeOutlined,
  DislikeFilled,
  LikeOutlined,
  CheckOutlined,
  LikeFilled,
} from "@ant-design/icons"
import { useApiWithAuth as UseApiWithAuth } from "modules/api"
import { IAssetList } from "types/dashboard"

interface IAssetListProps {
  isDefault: boolean
  assetsList: IAssetList[]
}

const AssetsList: React.FC<IAssetListProps> = ({ isDefault, assetsList }) => {
  const userId = localStorage.getItem("user_id")
  const [data, setData] = useState<IAssetList[]>(assetsList)
  const isDashboard = window.location.href.includes("dashboard")
  const filterUser = (record: IAssetList, params: IAssetList) =>
    params._id === record._id ? { ...record, subscribers: params.subscribers } : record

  const subscribeVideo = async (record: IAssetList) => {
    const tmpData = [...data]
    try {
      const { put } = UseApiWithAuth(`/api/videos/${record._id}/subscribe`)
      const params = { ...record }

      if (!params.subscribers.includes(userId)) params.subscribers.push(userId)
      else params.subscribers = params.subscribers.filter((r) => r !== userId)

      if (isDashboard) setData(data.map((r) => filterUser(r, params)))
      else setData(data.filter((r) => params._id !== r._id))

      await put(params.subscribers)
    } catch (error) {
      debugger
      if (isDashboard)
        setData(
          data.map((r) => (record._id === r._id ? { ...r, subscribers: record.subscribers } : r))
        )
      else setData(tmpData)
    }
  }

  const voteVideo = async (record: IAssetList, field) => {
    try {
      const fieldName = `users_${field}`
      const { put } = UseApiWithAuth(`/api/videos/${record._id}/${field}`)
      const params = { ...record }
      if (!params[fieldName].includes(userId)) {
        params[fieldName].push(userId)
        params[field] += 1
      } else {
        params[fieldName] = params[fieldName].filter((r) => r !== userId)
        params[field] -= 1
      }
      setData(data.map((r) => (params._id === r._id ? params : r)))
      await put({ [fieldName]: params[fieldName], [field]: params[field] })
    } catch (error) {
      setData(data.map((r) => (record._id === r._id ? record : r)))
    }
  }

  return (
    <div className={`assets-list ${isDefault ? "default" : "select"}`}>
      <Row gutter={16}>
        {data &&
          data.map((record) => {
            return (
              <Col className="mb-8" key={record._id} xs={24} sm={12} lg={8} xl={6}>
                <div className="ratio mb-2">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${record.video_id}`}
                    title={record.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <Row gutter={8} align="middle" wrap={false}>
                  <Col flex="64px">
                    <Avatar size={64} src={record.channel_logo} />
                  </Col>
                  <Col flex="auto">
                    <Tooltip title={record.title}>
                      <h4
                        style={{
                          width: "100%",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                          fontWeight: 600,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {record.title}
                      </h4>
                    </Tooltip>
                    <Space className="justify-space-between w-100 mt-1" direction="vertical">
                      <h5 style={{ fontWeight: 700 }}>{record.channel_name}</h5>
                      <Space size={4}>
                        <Button
                          className="d-flex gap-4 align-items-center"
                          type="primary"
                          shape="round"
                          size="small"
                          icon={record.subscribers.includes(userId) ? <CheckOutlined /> : undefined}
                          onClick={() => subscribeVideo(record)}
                        >
                          Subscribe
                        </Button>
                        <Button
                          className="d-flex gap-4 align-items-center"
                          style={{ color: "#1273ea" }}
                          type="text"
                          shape="round"
                          icon={
                            record.users_like.includes(userId) ? <LikeFilled /> : <LikeOutlined />
                          }
                          size="small"
                          onClick={() => voteVideo(record, "like")}
                        >
                          {record.like}
                        </Button>
                        <Button
                          className="d-flex gap-4 align-items-center"
                          style={{ color: "#ff4d4f" }}
                          type="text"
                          shape="round"
                          icon={
                            record.users_dislike.includes(userId) ? (
                              <DislikeFilled />
                            ) : (
                              <DislikeOutlined />
                            )
                          }
                          size="small"
                          onClick={() => voteVideo(record, "dislike")}
                        >
                          {record.dislike}
                        </Button>
                      </Space>
                    </Space>
                  </Col>
                </Row>
              </Col>
            )
          })}
      </Row>
    </div>
  )
}

export default memo(AssetsList)
