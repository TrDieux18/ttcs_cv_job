import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EyeOutlined,
  PushpinOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  Table,
  Input,
  Button,
  Dropdown,
  Popconfirm,
  message,
  Tag,
  Pagination,
} from "antd";

const { Search } = Input;

// Mock API -------------------------------------------------------
const mockFetchCVs = async ({ page = 1, limit = 10, keyword = "" } = {}) => {
  const total = 3;
  const items = Array.from({
    length: Math.min(limit, total - (page - 1) * limit),
  }).map((_, i) => {
    const idx = (page - 1) * limit + i + 1;
    return {
      _id: `cv-${idx}`,
      name: `Ứng viên ${idx}`,
      title: ["Senior Frontend", "Backend Engineer", "QA Tester"][idx % 3],
      position: ["Frontend Developer", "Backend Developer", "Tester"][idx % 3],
      status: ["Mới", "Đang xử lý", "Từ chối"][idx % 3],
      submittedAt: new Date(Date.now() - idx * 86400000).toISOString(),
    };
  });

  await new Promise((r) => setTimeout(r, 200));
  return { data: items, total };
};

const mockDeleteCV = async () => {
  await new Promise((r) => setTimeout(r, 150));
  return { success: true };
};

const mockPinCV = async () => {
  await new Promise((r) => setTimeout(r, 150));
  return { success: true };
};

// ---------------------------------------------------------------

const StatusTag = ({ status }) => {
  const map = {
    Mới: "blue",
    "Đang xử lý": "gold",
    "Từ chối": "red",
  };
  return <Tag color={map[status]}>{status}</Tag>;
};

export default function CVManagementPage() {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [cvs, setCvs] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = async (p = 1, l = limit, q = keyword) => {
    setLoading(true);
    try {
      const res = await mockFetchCVs({ page: p, limit: l, keyword: q });
      setCvs(res.data);
      setTotal(res.total);
      setPage(p);
    } catch {
      messageApi.error("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSearch = () => fetchData(1, limit, keyword);

  const handleDelete = async (id) => {
    setLoading(true);
    const res = await mockDeleteCV(id);
    if (res.success) {
      message.success("Xóa thành công");
      fetchData(page, limit, keyword);
    }
    setLoading(false);
  };

  const handlePin = async (id) => {
    setLoading(true);
    const res = await mockPinCV(id);
    if (res.success) {
      message.success("Đã ghim CV");
    }
    setLoading(false);
  };

  // Dropdown Menu Items --------------------------------------
  const rowMenuItems = (record) => [
    {
      key: "1",
      label: (
        <span
          onClick={() => navigate(`/company/cvs/${record._id}`)}
          className="flex items-center gap-2"
        >
          <EyeOutlined /> Xem chi tiết
        </span>
      ),
    },
    { type: "divider" },
    {
      key: "2",
      label: (
        <span
          onClick={() => handlePin(record._id)}
          className="flex items-center gap-2"
        >
          <PushpinOutlined /> Ghim
        </span>
      ),
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
      title: "Tiêu đề",
      dataIndex: "title",
      align: "center",
    },
    {
      title: "Vị trí",
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
      render: (v) => new Date(v).toLocaleDateString(),
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

  return (
    <div className="space-y-4">
      {contextHolder}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Quản lý CV</h1>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white rounded-md px-1 py-1">
            <Search
              placeholder="Tìm kiếm CV…"
              allowClear
              onSearch={onSearch}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{ width: 200 }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-card p-4">
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
            fetchData(pagination.current, pagination.pageSize, keyword);
          }}
          sticky
          rowClassName={() => "hover:bg-gray-50 transition-colors"}
          locale={{ emptyText: "Chưa có CV nào" }}
        />
      </div>
    </div>
  );
}
