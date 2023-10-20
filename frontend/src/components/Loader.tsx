import { Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"

export interface LoaderProps {
  classCustom?: string
  size?: "default" | "small" | "large"
  style?: React.CSSProperties
}

const Loader: React.FC<LoaderProps> = ({
  classCustom = "loader-custom",
  size = "default",
  style,
}) => {
  const loading = <LoadingOutlined style={{ fontSize: 24 }} spin />
  return (
    <div className={`loader-container ${classCustom}`} style={style}>
      <Spin indicator={loading} size={size} />
    </div>
  )
}

export default Loader
