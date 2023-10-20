import { memo, useEffect, useState } from "react"
import { Row, Col, Badge, Button, Skeleton, Space } from "antd"
import { useApiWithAuth } from "modules/api"
import AssetsList from "components/AssetsList"
import Header from "components/Header"

const Dashboard: React.FC = () => {
  const { get } = useApiWithAuth("/api/videos")
  const [assetsList, setAssetsList] = useState(null)
  const [loading, setLoading] = useState(true)

  const setDataList = async () => {
    const res = await get()
    setAssetsList(res?.data ?? null)
    setLoading(false)
  }

  useEffect(() => {
    if (localStorage.getItem("token")) setDataList()
  }, [])

  return (
    <div className="dashboard-page">
      <Header />
      <div className="body">
        <div className="assets">
          {loading ? (
            <Row gutter={16}>
              {Array.from(Array(4)).map((record) => (
                <Col className="mb-8" key={record} xs={24} sm={12} lg={8} xl={6}>
                  <div className="ratio mb-2">
                    <Skeleton.Avatar
                      active
                      size="large"
                      shape="square"
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <Row gutter={8} align="middle" wrap={false}>
                    <Col flex="64px">
                      <Skeleton.Avatar active size="large" shape="circle" />
                    </Col>
                    <Col flex="auto">
                      <Skeleton.Input active size="large" />
                      <Space className="justify-space-between w-100 mt-1" direction="vertical">
                        <Skeleton.Input
                          style={{ width: 300, borderRadius: 8 }}
                          active
                          size="large"
                        />
                        <Space size={4}>
                          <Skeleton.Button active size="large" />
                          <Skeleton.Button active size="large" />
                          <Skeleton.Button active size="large" />
                        </Space>
                      </Space>
                    </Col>
                  </Row>
                </Col>
              ))}
            </Row>
          ) : (
            <AssetsList assetsList={assetsList} isDefault />
          )}
        </div>
      </div>
    </div>
  )
}

export default memo(Dashboard)
