import { useEffect, useState } from "react";
import {
  getAllUsers,
  changeUserStatus,
  deleteUser,
} from "@services/admin/UserService";
import {
  Button,
  Dropdown,
  message,
  Popconfirm,
  Table,
  Input,
  Select,
} from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const User = () => {
  const [users, setUsers] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [status, setStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  // ✅ Fetch danh sách user
  const fetchUsers = async (
    page = 1,
    limit = 5,
    search = "",
    active = "all"
  ) => {
    try {
      setLoading(true);
      const query = {
        page,
        limit,
        keyword: search?.trim(),
      };

      if (active !== "all") query.isActive = active === "true";

      const response = await getAllUsers(query);

      setUsers(response.data);
      setPagination({
        current: page,
        pageSize: limit,
        total: response.total,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      messageApi.error("Không thể tải danh sách người dùng");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Gọi 1 lần khi mount
  useEffect(() => {
    fetchUsers(pagination.current, pagination.pageSize, keyword, status);
  }, []);

  // ✅ Xử lý khi đổi trạng thái lọc
  const handleStatusChange = (value) => {
    setStatus(value);
    fetchUsers(1, pagination.pageSize, keyword, value);
  };

  // ✅ Khi đổi trang
  const handleTableChange = (newPagination) => {
    fetchUsers(newPagination.current, newPagination.pageSize, keyword, status);
  };

  // ✅ Khi bấm tìm kiếm
  const handleSearch = () => {
    fetchUsers(1, pagination.pageSize, keyword, status);
  };

  // ✅ Cập nhật trạng thái user
  const handleChangeUserStatus = async (userId, isActive) => {
    try {
      const response = await changeUserStatus(userId, isActive);
      if (response.success) {
        setUsers((prev) =>
          prev.map((user) =>
            user._id === userId ? { ...user, isActive: !isActive } : user
          )
        );
        messageApi.success("Cập nhật trạng thái thành công");
      } else {
        messageApi.error("Cập nhật thất bại");
      }
    } catch {
      messageApi.error("Cập nhật thất bại");
    }
  };

  // ✅ Xóa user
  const handleDeleteUser = async (userId) => {
    try {
      const response = await deleteUser(userId);
      if (response.success) {
        messageApi.success("Xóa người dùng thành công");
        fetchUsers(pagination.current, pagination.pageSize, keyword, status);
      } else {
        messageApi.error("Xóa thất bại");
      }
    } catch {
      messageApi.error("Xóa thất bại");
    }
  };

  const actionUserDropdown = (record) => ({
    items: [
      {
        key: "detail",
        label: "Xem chi tiết",
        icon: <EyeOutlined style={{ fontSize: 15 }} />,
        onClick: () => navigate(`/admin/users/detail/${record._id}`),
      },
      { type: "divider" },
      {
        key: "edit",
        label: <span className="text-sky-400">Chỉnh sửa</span>,
        icon: <EditOutlined style={{ color: "#00BCFF", fontSize: 15 }} />,
        onClick: () => navigate(`/admin/users/update/${record._id}`),
      },
      { type: "divider" },
      {
        key: "delete",
        label: "Xóa",
        icon: <DeleteOutlined style={{ fontSize: 15 }} />,
        danger: true,
        onClick: () => handleDeleteUser(record._id),
      },
    ],
  });

  const columns = [
    {
      title: "STT",
      key: "index",
      align: "center",
      render: (_, __, i) => i + 1,
    },
    { title: "Tên đăng nhập", dataIndex: "username", align: "center" },
    { title: "Họ và tên", dataIndex: "fullName", align: "center" },
    { title: "Email", dataIndex: "email", align: "center" },
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
        <Dropdown
          menu={actionUserDropdown(record)}
          trigger={["click"]}
          placement="bottom"
          arrow
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      <div className="overflow-x-auto space-y-4 p-2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Danh sách tài khoản</h1>
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Tìm kiếm..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onPressEnter={handleSearch}
              prefix={<SearchOutlined />}
              style={{ width: 220 }}
            />

            <Select
              value={status}
              style={{ width: 150 }}
              onChange={handleStatusChange}
            >
              <Option value="all">Tất cả</Option>
              <Option value="true">Hoạt động</Option>
              <Option value="false">Ngừng hoạt động</Option>
            </Select>

            <Button
              type="primary"
              onClick={handleSearch}
              style={{ background: "#3875F6" }}
            >
              Tìm
            </Button>

            <Button type="primary" style={{ background: "#3875F6" }}>
              <NavLink to="/admin/users/create">Tạo mới</NavLink>
            </Button>
          </div>
        </div>

        <Table
          bordered
          rowKey="_id"
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} người dùng`,
          }}
          onChange={handleTableChange}
          style={{
            background: "#f6f8fe",
            borderRadius: 8,
            overflow: "hidden",
          }}
          dataSource={users}
          columns={columns}
          locale={{ emptyText: "Không có" }}
        />
      </div>
    </div>
  );
};

export default User;
