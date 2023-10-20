import { memo, useCallback, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { Button, Form, Input, Row, Col, notification } from "antd"
import { EyeOutlined } from "@ant-design/icons"
import logoBg from "assets/logo.png"
import { useApi } from "../modules/api"

const Login: React.FC = () => {
  const [form] = Form.useForm()
  const { post } = useApi("/signup")
  const history = useHistory()

  const handleSubmit = async () => {
    const data = await post({
      email: form.getFieldValue("email"),
      password: form.getFieldValue("password"),
    })
    if (data) {
      localStorage.setItem("token", data?.token)
      history.replace("/dashboard")
    } else {
      notification.error({
        message: "Error",
        description: "Wrong password!",
      })
    }
  }
  const loading = false

  return (
    <div className="login-page flex">
      <section className="card">
        <Row className="login-container text-center">
          <Col span={24}>
            <div className="login-bg"></div>
            <img src={logoBg} alt="" />
          </Col>
        </Row>
        <div className="title text-center pb-6">
          <h1 className="pb-2">Remitano</h1>
          <p>Your Digital Passport</p>
        </div>
        <Form
          form={form}
          onFinish={handleSubmit}
          size="small"
          layout="vertical"
          className="loginForm"
          requiredMark={false}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input type="email" placeholder="admin@reminato.com" size="large" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password type="password" placeholder="123456" size="large" />
          </Form.Item>
          <div className="text-center">
            <Button
              htmlType="submit"
              type="primary"
              disabled={loading}
              loading={loading}
              className="loginFormButton mt-2"
              size="large"
            >
              Submit
            </Button>
          </div>
        </Form>
      </section>
    </div>
  )
}

export default memo(Login)
