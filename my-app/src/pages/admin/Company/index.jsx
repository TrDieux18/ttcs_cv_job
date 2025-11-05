import { useEffect, useState } from "react";
import {
  getAllCompanies,
  deleteCompany,
} from "@services/admin/CompanyService";
import {
  Button,
  Dropdown,
  message,
  Popconfirm,
  Table,
  Input,
  Image,
} from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";

const Company = () => {
  const [companies, setCompanies] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  // ✅ Fetch danh sách company
  const fetchCompanies = async (page = 1, limit = 10, search = "") => {
    try {
      setLoading(true);
      const query = {
        page,
        limit,
        keyword: search?.trim(),
      };

      const response = await getAllCompanies(query);

      setCompanies(response.data);
      setPagination({
        current: page,
        pageSize: limit,
        total: response.total,
      });
    } catch (error) {
      console.error("Error fetching companies:", error);
      messageApi.error("Không thể tải danh sách công ty");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies(pagination.current, pagination.pageSize, keyword);
  }, []);

  const handleTableChange = (newPagination) => {
    fetchCompanies(newPagination.current, newPagination.pageSize, keyword);
  };

  const handleSearch = () => {
    fetchCompanies(1, pagination.pageSize, keyword);
  };

  const handleDeleteCompany = async (companyId) => {
    try {
      const response = await deleteCompany(companyId);
      if (response.success) {
        messageApi.success("Xóa công ty thành công");
        fetchCompanies(pagination.current, pagination.pageSize, keyword);
      } else {
        messageApi.error("Xóa thất bại");
      }
    } catch {
      messageApi.error("Xóa thất bại");
    }
  };

  const actionCompanyDropdown = (record) => ({
    items: [
      {
        key: "detail",
        label: "Xem chi tiết",
        icon: <EyeOutlined style={{ fontSize: 15 }} />,
        onClick: () => navigate(`/admin/companies/detail/${record._id}`),
      },
      { type: "divider" },
      {
        key: "edit",
        label: <span>Chỉnh sửa</span>,
        icon: <EditOutlined style={{ fontSize: 15 }} />,
        onClick: () => navigate(`/admin/companies/update/${record._id}`),
      },
      { type: "divider" },
      {
        key: "delete",
        label: "Xóa",
        icon: <DeleteOutlined style={{ fontSize: 15 }} />,
        danger: true,
        onClick: () => handleDeleteCompany(record._id),
      },
    ],
  });

  const columns = [
    {
      title: "STT",
      key: "index",
      align: "center",
      render: (_, __, i) =>
        (pagination.current - 1) * pagination.pageSize + i + 1,
    },
    {
      title: "Logo",
      key: "logo",
      align: "center",
      render: (_, record) =>
        record.logo?.url ? (
          <Image
            src={record.logo.url}
            width={50}
            height={50}
            style={{ objectFit: "cover", borderRadius: "8px" }}
          />
        ) : (
          <div
            style={{
              width: 50,
              height: 50,
              backgroundColor: "#f0f0f0",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            —
          </div>
        ),
    },
    { title: "Tiêu đề", dataIndex: "headline", align: "center" },
    {
      title: "User",
      key: "user",
      align: "center",
      render: (_, record) => record.user?.fullName || "—",
    },
    { title: "Website", dataIndex: "website", align: "center" },
    { title: "Địa điểm", dataIndex: "location", align: "center" },
    { title: "Quy mô", dataIndex: "size", align: "center" },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Dropdown
          menu={actionCompanyDropdown(record)}
          trigger={["hover"]}
          placement="bottom"
          arrow
          overlayClassName="custom-dropdown-two"
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
          <h1 className="text-xl font-semibold">Danh sách công ty</h1>
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Tìm kiếm..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onPressEnter={handleSearch}
              prefix={<SearchOutlined />}
              style={{ width: 220 }}
            />

            <Button
              type="primary"
              onClick={handleSearch}
              style={{ background: "#3875F6" }}
            >
              Tìm
            </Button>

            <Button type="primary" style={{ background: "#3875F6" }}>
              <NavLink to="/admin/companies/create">Tạo mới</NavLink>
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
            showTotal: (total) => `Tổng ${total} công ty`,
          }}
          onChange={handleTableChange}
          style={{
            background: "#f6f8fe",
            borderRadius: 8,
            overflow: "hidden",
          }}
          dataSource={companies}
          columns={columns}
          locale={{ emptyText: "Không có" }}
        />
      </div>
    </div>
  );
};

export default Company;
