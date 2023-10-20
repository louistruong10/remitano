import { memo } from "react"
import { Row, Col, Badge, Button } from "antd"
import { useHistory } from "react-router-dom"
import UserSvg from "components/Icon/UserSvg"

const Header: React.FC = () => {
  const history = useHistory()

  return (
    <Row className="header pb-20" align="middle">
      <Col flex="auto">
        <Button
          className="user-name d-flex align-items-center"
          onClick={() => history.replace("/dashboard")}
        >
          <Badge status="processing" />
          <p className="font-weight-700">Reminato</p>
        </Button>
      </Col>
      <Col flex="32px" className="user-icon">
        <Button
          type="default"
          icon={<UserSvg />}
          size="middle"
          onClick={() => history.replace("/assets")}
        />
      </Col>
    </Row>
  )
}

export default memo(Header)
