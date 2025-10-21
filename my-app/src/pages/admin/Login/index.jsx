import { AuthLayout } from "@components/layout/AuthAdminLayout";

import { Button, Checkbox, Form, Input, message } from "antd";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@services/common/AuthService";
import { setUser } from "@store/UserReducer";

const LoginAdmin = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAuth = async (values) => {
    try {
      const response = await login(values);
      if (response.success && response.data) {
        dispatch(setUser(response.data));
        localStorage.setItem("user", JSON.stringify(response.data));
        messageApi.success("Đăng nhập thành công");

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1500);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      {contextHolder}
      <AuthLayout>
        <div className="p-4">
          <div className="name flex gap-2 items-center">
            <div className="text-[#c41212] bg-[#3929cc] flex items-center justify-center h-7 w-7 rounded-full">
              <img src="@assets/image/image.png" alt="anh" />
            </div>
            <p className="text-2xl font-bold text-[var(--color-text-two)]">
              Cyberverdict
            </p>
          </div>

          <div className="flex flex-col justify-center items-center mt-20">
            <div className="mb-6 text-[var(--color-text-two)] text-center">
              <h1 className="text-3xl font-bold">Login to your Account</h1>
              <p>with your enroll Email Address</p>
            </div>

            <Form
              name="basic"
              layout="vertical"
              style={{ width: 400 }}
              initialValues={{ remember: true }}
              onFinish={loginAuth}
              autoComplete="true"
            >
              <Form.Item
                label={<span>Tên đăng nhập</span>}
                name="username"
                rules={[{ required: true, message: "Nhập tên đăng nhập" }]}
              >
                <Input
                  className="shadow-sm focus:shadow-lg focus:ring-2 focus:ring-blue-400 border-none px-4 h-12"
                  placeholder="Nhập tên đăng nhập"
                />
              </Form.Item>

              <Form.Item
                label={
                  <span className="text-[var(--color-text-one)] text-[16px]">
                    Password
                  </span>
                }
                name="password"
                rules={[{ required: true, message: "Nhập mật khẩu!" }]}
              >
                <Input.Password
                  className="shadow-sm focus:shadow-lg focus:ring-2 focus:ring-blue-400 border-none px-4 h-12"
                  placeholder="Nhập mật khẩu"
                />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>
                  <span className="text-[var(--color-text-one)] text-[16px]">
                    Remember my password
                  </span>
                </Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full !h-12 !shadow-lg !text-lg mt-3"
                  size="large"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
};

export default LoginAdmin;
