import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EyeOutlined,
  PushpinOutlined,
  DeleteOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Table,
  Input,
  Button,
  Dropdown,
  Popconfirm,
  message,
  Tag,
  Card,
  Tabs,
} from "antd";
import { getAllApplicants } from "@services/company/ApplicantService";

const { Search } = Input;

const StatusTag = ({ status }) => {
  const map = {
    pending: { color: "blue", label: "Chờ xử lý" },
    reviewing: { color: "orange", label: "Đang xem xét" },
    reviewed: { color: "purple", label: "Đã xem xét" },
    accepted: { color: "green", label: "Đã chấp nhận" },
    rejected: { color: "red", label: "Từ chối" },
  };
  const config = map[status] || { color: "default", label: status };
  return <Tag color={config.color}>{config.label}</Tag>;
};

export default function CVManagementPage() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [cvs, setCvs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = async (
    p = 1,
    l = limit,
    q = keyword,
    status = activeTab
  ) => {
    setLoading(true);
    try {
      const params = {
        page: p,
        limit: l,
      };

      if (q.trim()) {
        params.keyword = q;
      }

      if (status !== "all") {
        params.status = status;
      }

      const res = await getAllApplicants(params);

      console.log("API Response:", res); // Debug

      if (res.success) {
        const { applications, pagination } = res.data || {};

        const transformedData = (applications || []).map((app) => ({
          _id: app._id,
          name: app.user?.fullName || "N/A",
          email: app.user?.email || "N/A",
          phone: app.user?.phone || "N/A",
          title: app.cv?.title || "N/A",
          position: app.job?.title || "N/A",
          status: app.status,
          submittedAt: app.createdAt,
          cvUrl: app.cv?.fileUrl,
        }));

        setCvs(transformedData);
        setTotal(pagination?.total || 0);
        setPage(p);
      } else {
        messageApi.error(res.message || "Không thể tải dữ liệu");
        setCvs([]);
        setTotal(0);
      }
    } catch (error) {
      messageApi.error("Không thể tải dữ liệu");
      console.error(error);
      setCvs([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const onSearch = () => fetchData(1, limit, keyword, activeTab);

  const handleDelete = async (id) => {
    messageApi.warning("Chức năng xóa đang được phát triển");
  };

  const handlePin = async (id) => {
    messageApi.warning("Chức năng ghim đang được phát triển");
  };

  const rowMenuItems = (record) => [
    {
      key: "1",
      label: (
        <span className="flex items-center gap-2">
          <EyeOutlined /> Xem chi tiết
        </span>
      ),
      onClick: () => navigate(`/company/cvs/${record._id}`),
    },
    { type: "divider" },
    {
      key: "2",
      label: (
        <span className="flex items-center gap-2">
          <PushpinOutlined /> Ghim
        </span>
      ),
      onClick: () => handlePin(record._id),
    },
    { type: "divider" },
    {
      key: "3",
      danger: true,
      label: (
        <Popconfirm
          title="Bạn có chắc muốn xóa CV này?"
          okText="Xóa"
          cancelText="Hủy"
          onConfirm={() => handleDelete(record._id)}
        >
          <span className="flex items-center gap-2 text-red-600">
            <DeleteOutlined /> Xóa
          </span>
        </Popconfirm>
      ),
    },
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      width: 70,
      align: "center",
      render: (_, __, i) => (page - 1) * limit + i + 1,
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Tiêu đề CV",
      dataIndex: "title",
      align: "center",
    },
    {
      title: "Vị trí ứng tuyển",
      dataIndex: "position",
      align: "center",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
      render: (text) => <StatusTag status={text} />,
    },
    {
      title: "Ngày gửi",
      dataIndex: "submittedAt",
      align: "center",
      render: (v) => new Date(v).toLocaleDateString("vi-VN"),
    },
    {
      title: "Hành động",
      align: "center",
      width: 90,
      render: (_, record) => (
        <Dropdown
          menu={{ items: rowMenuItems(record) }}
          trigger={["click"]}
          overlayClassName="custom-dropdown-two"
        >
          <Button type="text">
            <MoreOutlined />
          </Button>
        </Dropdown>
      ),
    },
  ];

  const tabItems = [
    {
      key: "all",
      label: "Tất cả",
    },
    {
      key: "pending",
      label: "Chờ xử lý",
    },
    {
      key: "accepted",
      label: "Đã chấp nhận",
    },
    {
      key: "rejected",
      label: "Đã từ chối",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {contextHolder}

      <div className="mx-auto max-w-7xl px-8 py-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Quản lý CV</h1>
            <p className="mt-1 text-sm text-gray-500">
              Quản lý và theo dõi các CV ứng tuyển
            </p>
          </div>
        </div>

        <Card className="shadow-sm border border-gray-200 rounded-lg">
          <Tabs
            activeKey={activeTab}
            onChange={(key) => {
              setActiveTab(key);
              setPage(1);
            }}
            items={tabItems}
            className="mb-4"
          />

          <div className="mb-4">
            <Search
              placeholder="Tìm kiếm theo tên hoặc email…"
              allowClear
              onSearch={onSearch}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ width: 350 }}
              prefix={<SearchOutlined className="text-gray-400" />}
              className="!rounded-lg"
            />
          </div>

          <Table
            rowKey="_id"
            loading={loading}
            columns={columns}
            dataSource={cvs}
            pagination={{
              current: page,
              pageSize: limit,
              total: total,
              showSizeChanger: true,
              showTotal: (t) => `Tổng ${t} CV`,
            }}
            onChange={(pagination) => {
              setLimit(pagination.pageSize);
              fetchData(
                pagination.current,
                pagination.pageSize,
                keyword,
                activeTab
              );
            }}
            sticky
            rowClassName={() => "hover:bg-gray-50 transition-colors"}
            locale={{ emptyText: "Chưa có CV nào" }}
          />
        </Card>
      </div>
    </div>
  );
}
