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
    <div>
      <div className="overflow-x-auto space-y-4 p-2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Danh sách vai trò</h1>
          <Button
            type="primary"
            onClick={() =>
              setOpenModal({ visible: true, type: "create", record: null })
            }
            style={{ background: "#3875F6" }}
          >
            Tạo mới
          </Button>
        </div>
      </div>

      <Table
        style={{
          background: "#f6f8fe",
          borderRadius: 8,
          overflow: "hidden",
        }}
        bordered
        columns={columns}
        dataSource={roles}
        rowKey={(record) => record._id}
        pagination={false}
        locale={{ emptyText: "Không có" }}
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
  );
};

export default Role;
