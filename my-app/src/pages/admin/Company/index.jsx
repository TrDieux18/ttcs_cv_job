import { useEffect, useState } from "react";
import { getAllCompanies, deleteCompany } from "@services/admin/CompanyService";
import { Button, Dropdown, message, Table, Input, Image } from "antd";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
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
    <div className="p-6 bg-white min-h-screen">
      {contextHolder}
      <div className="max-w-full">
        {}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Quản lý công ty</h1>
          <p className="text-sm text-gray-500 mt-1">
            Danh sách công ty đăng ký trong hệ thống
          </p>
        </div>

        {}
        <div className="flex gap-3 mb-6">
          <Input
            placeholder="Tìm kiếm theo tên công ty..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onPressEnter={handleSearch}
            prefix={<SearchOutlined />}
            size="large"
            style={{ width: 300 }}
          />

          <Button
            type="primary"
            size="large"
            onClick={handleSearch}
            icon={<SearchOutlined />}
          >
            Tìm kiếm
          </Button>
        </div>

        {}
        <Table
          bordered
          rowKey="_id"
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showTotal: (total) => `Tổng ${total} công ty`,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
          onChange={handleTableChange}
          className="shadow-sm"
          dataSource={companies}
          columns={columns}
          locale={{ emptyText: "Không có dữ liệu" }}
        />
      </div>
    </div>
  );
};

export default Company;
