import { useEffect } from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { formatDateTime } from "@helpers/formatDate";
import { createRole } from "@services/admin/RoleService";
import { updateRole } from "@services/admin/RoleService";

const RoleModal = ({ open, type, record, onCancel }) => {
  const [form] = Form.useForm();

  const isDetail = type === "detail";

  useEffect(() => {
    if (type === "edit" || type === "detail") {
      form.setFieldsValue({
        title: record?.title || "",
        description: record?.description || "",
      });
    } else {
      form.resetFields();
    }
  }, [type, record]);

  const handleSubmit = async () => {
    try {
      const values = form.getFieldsValue();

      if (type === "create") {
        console.log("Tạo mới vai trò:", values);

        const response = await createRole(values);

        if (response?.success && response?.data) {
          message.success("Tạo vai trò thành công");
        } else {
          message.error("Tạo vai trò thất bại");
        }
      } else if (type === "edit") {
        const response = await updateRole(record._id, values);
        if (response?.success) {
          message.success("Cập nhật vai trò thành công");
        } else {
          message.error("Cập nhật vai trò thất bại");
        }
      }
    } catch (error) {
      console.error("Lỗi khi xử lý vai trò:", error);
      message.error("Đã xảy ra lỗi trong quá trình xử lý!");
    } finally {
      onCancel();
    }
  };

  return (
    <Modal
      title={
        type === "create"
          ? "Tạo vai trò"
          : type === "detail"
          ? "Chi tiết vai trò"
          : "Chỉnh sửa vai trò"
      }
      open={open}
      onCancel={onCancel}
      width={700}
      footer={
        !isDetail && (
          <div className="flex justify-end gap-2">
            <Button onClick={onCancel}>Hủy</Button>
            <Button
              type="primary"
              onClick={handleSubmit}
              style={{ background: "#3875F6" }}
            >
              {type === "create" ? "Tạo mới" : "Lưu thay đổi"}
            </Button>
          </div>
        )
      }
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Tên vai trò"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tên vai trò" }]}
        >
          <Input placeholder="Nhập tên vai trò" disabled={isDetail} />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
        >
          <Input.TextArea
            rows={2}
            placeholder="Mô tả về vai trò"
            disabled={isDetail}
          />
        </Form.Item>

        {(record?.createdAt || record?.updatedAt) && (
          <div className="text-sm text-gray-500 mt-4 border-t pt-2">
            <p>
              <b>Ngày tạo:</b> {formatDateTime(record.createdAt)}
            </p>
            <p>
              <b>Cập nhật gần nhất:</b> {formatDateTime(record.updatedAt)}
            </p>
          </div>
        )}
      </Form>
    </Modal>
  );
};

export default RoleModal;
