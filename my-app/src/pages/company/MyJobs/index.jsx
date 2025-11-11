import { useEffect, useState } from "react";
import { getMyJobs, deleteMyJob } from "@services/company/JobService";
import {
  Button,
  message,
  Table,
  Input,
  Tag,
  Popconfirm,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { formatDateTime } from "@helpers/formatDate";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const fetchJobs = async (page = 1, limit = 10, search = "") => {
    try {
      setLoading(true);
      const query = { page, limit, keyword: search?.trim() };
      const response = await getMyJobs(query);
      setJobs(response.data);
      setPagination({ current: page, pageSize: limit, total: response.total });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      messageApi.error("Không thể tải danh sách công việc");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleTableChange = (newPagination) => {
    fetchJobs(newPagination.current, newPagination.pageSize, keyword);
  };

  const handleSearch = () => {
    fetchJobs(1, pagination.pageSize, keyword);
  };

  const handleDelete = async (jobId) => {
    try {
      const response = await deleteMyJob(jobId);
      if (response.success) {
        messageApi.success("Xóa công việc thành công");
        fetchJobs(pagination.current, pagination.pageSize, keyword);
      } else {
        messageApi.error("Xóa thất bại");
      }
    } catch {
      messageApi.error("Xóa thất bại");
    }
  };

  const columns = [
    {
      title: "STT",
      key: "index",
      align: "center",
      width: 60,
      render: (_, __, i) =>
        (pagination.current - 1) * pagination.pageSize + i + 1,
    },
    { title: "Tiêu đề", dataIndex: "title", align: "left", width: 250 },
    { title: "Địa điểm", dataIndex: "location", align: "center", width: 150 },
    {
      title: "Loại hình",
      dataIndex: "jobType",
      align: "center",
      width: 120,
      render: (jobType) => {
        const colorMap = {
          "Full-time": "blue",
          "Part-time": "green",
          Contract: "orange",
          Internship: "purple",
        };
        return <Tag color={colorMap[jobType]}>{jobType}</Tag>;
      },
    },
    {
      title: "Lương",
      dataIndex: "salary",
      align: "center",
      width: 150,
      render: (salary) => salary || "Thỏa thuận",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      align: "center",
      width: 150,
      render: (date) => formatDateTime(date),
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      width: 150,
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/company/my-jobs/update/${record._id}`)}
          >
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa job này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      {contextHolder}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Công việc của tôi</h1>
          <div className="flex gap-2">
            <Input
              placeholder="Tìm kiếm..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onPressEnter={handleSearch}
              prefix={<SearchOutlined />}
              style={{ width: 220 }}
            />
            <Button type="primary" onClick={handleSearch}>
              Tìm
            </Button>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate("/company/my-jobs/create")}
              style={{ background: "#52c41a" }}
            >
              Đăng tin mới
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
            showTotal: (total) => `Tổng ${total} công việc`,
          }}
          onChange={handleTableChange}
          dataSource={jobs}
          columns={columns}
          locale={{ emptyText: "Chưa có công việc nào" }}
          scroll={{ x: 1000 }}
        />
      </div>
    </div>
  );
};

export default MyJobs;
