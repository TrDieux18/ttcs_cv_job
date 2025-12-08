import { useEffect, useState } from "react";
import { getAllRoles } from "@services/admin/RoleService";
import { Button, Dropdown, Table, Space, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import RoleModal from "./components/RoleModal";

import { deleteRole } from "@services/admin/RoleService";

const Role = () => {
  const [roles, setRoles] = useState([]);
  const [openModal, setOpenModal] = useState({
    visible: false,
    type: null,
    record: null,
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await getAllRoles();
        setRoles(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const handleDeleteRole = async (id) => {
    console.log("Xóa role có id:", id);
    try {
      const response = await deleteRole(id);
      if (response.success) {
        setRoles((prevRoles) => prevRoles.filter((role) => role._id !== id));
        message.success("Xóa vai trò thành công");
      } else {
        console.error("Xóa vai trò thất bại");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const actionRoleDropdown = (record) => ({
    items: [
      {
        key: "detail",
        label: "Xem chi tiết",
        icon: <EyeOutlined style={{ fontSize: 15 }} />,
        onClick: () =>
          setOpenModal({ visible: true, type: "detail", record: record }),
      },
      { type: "divider" },
      {
        key: "edit",
        label: <span>Chỉnh sửa</span>,
        icon: <EditOutlined style={{ fontSize: 15 }} />,
        onClick: () =>
          setOpenModal({ visible: true, type: "edit", record: record }),
      },
      { type: "divider" },
      {
        key: "delete",
        label: "Xóa",
        icon: <DeleteOutlined style={{ fontSize: 15 }} />,
        danger: true,
        onClick: () => handleDeleteRole(record._id),
      },
    ],
  });

  // 🧩 Cấu hình các cột cho bảng
  const columns = [
    {
      title: "STT",
      key: "index",
      align: "center",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên vai trò",
      dataIndex: "title",
      key: "title",
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hành động",
      key: "actions",
      align: "center",
      render: (_, record) => (
        <Dropdown
          menu={actionRoleDropdown(record)}
          trigger={["hover"]}
          arrow
          placement="bottom"
          overlayClassName="custom-dropdown-two"
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Quản lý vai trò
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Danh sách vai trò và phân quyền trong hệ thống
            </p>
          </div>
          <Button
            type="primary"
            size="large"
            onClick={() =>
              setOpenModal({ visible: true, type: "create", record: null })
            }
          >
            + Tạo mới
          </Button>
        </div>

        {/* Table */}
        <Table
          bordered
          columns={columns}
          dataSource={roles}
          rowKey={(record) => record._id}
          pagination={false}
          className="shadow-sm"
          locale={{ emptyText: "Không có dữ liệu" }}
        />

        <RoleModal
          open={openModal.visible}
          type={openModal.type}
          record={openModal.record}
          onCancel={() =>
            setOpenModal({ visible: false, type: null, record: null })
          }
        />
      </div>
    </div>
  );
};

export default Role;
