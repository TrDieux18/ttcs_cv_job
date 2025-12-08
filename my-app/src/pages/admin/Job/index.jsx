import { useEffect, useState } from "react";
import { getAllJobsAdmin, deleteJobAdmin } from "@services/admin/JobService";
import { Button, Dropdown, message, Table, Input, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EyeOutlined,
  MoreOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { formatDateTime } from "@helpers/formatDate";

const Job = () => {
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
      const query = {
        page,
        limit,
        keyword: search?.trim(),
      };

      const response = await getAllJobsAdmin(query);

      setJobs(response.data);
      setPagination({
        current: page,
        pageSize: limit,
        total: response.total,
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
      messageApi.error("Không thể tải danh sách công việc");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs(pagination.current, pagination.pageSize, keyword);
  }, []);

  const handleTableChange = (newPagination) => {
    fetchJobs(newPagination.current, newPagination.pageSize, keyword);
  };

  const handleSearch = () => {
    fetchJobs(1, pagination.pageSize, keyword);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await deleteJobAdmin(jobId);
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

  const actionJobDropdown = (record) => ({
    items: [
      {
        key: "detail",
        label: "Xem chi tiết",
        icon: <EyeOutlined style={{ fontSize: 15 }} />,
        onClick: () => navigate(`/admin/jobs/detail/${record._id}`),
      },
      { type: "divider" },
      {
        key: "delete",
        label: "Xóa",
        icon: <DeleteOutlined style={{ fontSize: 15 }} />,
        danger: true,
        onClick: () => handleDeleteJob(record._id),
      },
    ],
  });

  const columns = [
    {
      title: "STT",
      key: "index",
      align: "center",
      width: 60,
      render: (_, __, i) =>
        (pagination.current - 1) * pagination.pageSize + i + 1,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      align: "left",
      width: 250,
    },
    {
      title: "Công ty",
      key: "company",
      align: "center",
      render: (_, record) => record.company?.headline || "—",
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      align: "center",
      width: 150,
    },
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
        return <Tag color={colorMap[jobType] || "default"}>{jobType}</Tag>;
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
      width: 100,
      fixed: "right",
      render: (_, record) => (
        <Dropdown
          menu={actionJobDropdown(record)}
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
          <h1 className="text-2xl font-bold text-gray-900">Quản lý việc làm</h1>
          <p className="text-sm text-gray-500 mt-1">
            Danh sách công việc được đăng tuyển
          </p>
        </div>

        {}
        <div className="flex gap-3 mb-6">
          <Input
            placeholder="Tìm kiếm theo tiêu đề công việc..."
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
            showTotal: (total) => `Tổng ${total} công việc`,
            pageSizeOptions: ["10", "20", "50", "100"],
          }}
          onChange={handleTableChange}
          className="shadow-sm"
          dataSource={jobs}
          columns={columns}
          locale={{ emptyText: "Không có dữ liệu" }}
          scroll={{ x: 1200 }}
        />
      </div>
    </div>
  );
};

export default Job;
