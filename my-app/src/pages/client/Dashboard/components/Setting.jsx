import { useState } from "react";
import { Form, Input, Button, message, Card, Progress, Typography } from "antd";
import { changePassword } from "@services/client/UserService";

const { Text } = Typography;

const Setting = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [strength, setStrength] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState("");

  const checkStrength = (password) => {
    let score = 0;

    if (!password) return 0;

    if (password.length >= 6) score += 25;
    if (/[A-Z]/.test(password)) score += 20;
    if (/[0-9]/.test(password)) score += 20;
    if (/[^A-Za-z0-9]/.test(password)) score += 35;

    if (score < 40) setStrengthLabel("Yếu");
    else if (score < 70) setStrengthLabel("Trung bình");
    else setStrengthLabel("Mạnh");

    return Math.min(score, 100);
  };

  const handleNewPasswordChange = (e) => {
    const value = e.target.value;
    setStrength(checkStrength(value));
  };

  const handleChangePassword = async (values) => {
    const { currentPassword, newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      message.error("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    if (strength < 40) {
      message.error("Mật khẩu quá yếu, vui lòng chọn mật khẩu mạnh hơn!");
      return;
    }

    try {
      setLoading(true);
      const response = await changePassword({ currentPassword, newPassword });

      if (response.success) {
        message.success(response.data || "Đổi mật khẩu thành công!");
        form.resetFields();
        setStrength(0);
        setStrengthLabel("");
      } else {
        const errorMsg = Array.isArray(response.error)
          ? response.error.join(", ")
          : response.error || "Đổi mật khẩu thất bại!";
        message.error(errorMsg);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      message.error("Có lỗi xảy ra khi đổi mật khẩu!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className=" mx-auto mt-10 shadow-sm border border-gray-200 rounded-md bg-white">
      <h2 className="text-[22px] font-bold mb-4 text-green-600 text-center">
        Đổi mật khẩu
      </h2>

      <Form form={form} layout="vertical" onFinish={handleChangePassword}>
        <Form.Item
          label="Mật khẩu hiện tại"
          name="currentPassword"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu hiện tại" },
          ]}
        >
          <Input.Password placeholder="Nhập mật khẩu hiện tại" />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPassword"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới" },
            { min: 6, message: "Mật khẩu phải ít nhất 6 ký tự" },
          ]}
        >
          <Input.Password
            placeholder="Nhập mật khẩu mới"
            onChange={handleNewPasswordChange}
          />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu mới"
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Xác nhận mật khẩu mới" />
        </Form.Item>

        {strength > 0 && (
          <div className="mb-4">
            <Progress
              percent={strength}
              showInfo={false}
              strokeColor={
                strength < 40
                  ? "#ff4d4f"
                  : strength < 70
                  ? "#faad14"
                  : "#52c41a"
              }
            />
            <Text
              type={
                strength < 40 ? "danger" : strength < 70 ? "warning" : "success"
              }
            >
              {strengthLabel}
            </Text>
          </div>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            className="!bg-green-600 !hover:bg-green-700 text-white"
          >
            Lưu mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Setting;
