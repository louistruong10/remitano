import { memo, useEffect, useState } from "react"
import { Skeleton } from "antd"
import { useLocation, useHistory } from "react-router-dom"
import AssetsList from "components/AssetsList"
import { useApiWithAuth } from "modules/api"
import Header from "components/Header"

const Assets: React.FC = () => {
  const { pathname } = useLocation()
  const { get } = useApiWithAuth("/api/videos/subscribe_videos")
  const [assetsList, setAssetsList] = useState(null)

  const history = useHistory()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(!assetsList)
  }, [assetsList])

  useEffect(() => {
    if (!localStorage.getItem("token")) history.replace("/signin")
  }, [pathname, history])

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
        <div className="assets wallet">
          <Skeleton loading={loading}>
            <AssetsList assetsList={assetsList} isDefault />
          </Skeleton>
        </div>
      </div>
    </div>
  )
}

export default memo(Assets)
