import { useEffect, useState } from "react";
import { getAllUsers } from "@services/admin/UserService";
import { Button, message, Popconfirm, Table } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { changeUserStatus } from "@services/admin/UserService";
const User = () => {
  const [users, setUsers] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        console.log("Fetched users:", response);
        setUsers(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleChangeUserStatus = async (userId, status) => {
    console.log("Change status for user:", userId, "to", status);
    try {
      const response = await changeUserStatus(userId, status);
      if (response.success) {
        setUsers((prevUsers) => {
          return prevUsers.map((user) =>
            user._id === userId ? { ...user, isActive: !status } : user
          );
        });
        messageApi.success("Cập nhật trạng thái người dùng thành công");
      } else {
        messageApi.error("Cập nhật trạng thái người dùng thất bại");
      }
    } catch (error) {
      console.error("Error changing user status:", error);
      messageApi.error("Cập nhật trạng thái người dùng thất bại");
    }
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
      align: "center",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Vai trò",
      key: "role",
      align: "center",
      render: (_, record) => record.role?.title || "—",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      key: "isActive",
      align: "center",
      render: (isActive, record) => (
        <Popconfirm
          title={`Bạn có chắc muốn ${
            isActive ? "ngừng" : "kích hoạt"
          } tài khoản này không?`}
          okText="Xác nhận"
          cancelText="Hủy"
          onConfirm={() => handleChangeUserStatus(record._id, isActive)}
        >
          <Button
            type="default"
            style={{
              color: isActive ? "green" : "red",
              borderColor: isActive ? "green" : "red",
              fontWeight: 600,
            }}
          >
            {isActive ? "Hoạt động" : "Ngừng hoạt động"}
          </Button>
        </Popconfirm>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="space-x-2">
          <Button color="gold">Chi tiết</Button>

          <Button
            type="primary"
            onClick={() => navigate(`/admin/users/update/${record._id}`)}
          >
            Sửa
          </Button>

          <Popconfirm
            title="Bạn có chắc muốn xóa sản phẩm này?"
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <div className="overflow-x-auto space-y-4 p-2">
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold">Danh sách tài khoản</h1>
          <Button type="primary">
            <NavLink to="/admin/users/create">Tạo mới</NavLink>
          </Button>
        </div>

        <Table
          bordered
          rowKey="_id"
          style={{
            background: "#f6f8fe",
            borderRadius: 8,
            overflow: "hidden",
          }}
          pagination={false}
          dataSource={users}
          columns={columns}
          locale={{ emptyText: "Không có" }}
        />
      </div>
    </div>
  );
};

export default User;
