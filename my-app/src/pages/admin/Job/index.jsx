import { useEffect, useState } from "react";
import {
  getAllJobsAdmin,
  deleteJobAdmin,
} from "@services/admin/JobService";
import {
  Button,
  Dropdown,
  message,
  Popconfirm,
  Table,
  Input,
  Tag,
} from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
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
        key: "edit",
        label: <span>Chỉnh sửa</span>,
        icon: <EditOutlined style={{ fontSize: 15 }} />,
        onClick: () => navigate(`/admin/jobs/update/${record._id}`),
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
    <div>
      {contextHolder}
      <div className="overflow-x-auto space-y-4 p-2">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Danh sách công việc</h1>
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
              <NavLink to="/admin/jobs/create">Tạo mới</NavLink>
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
          style={{
            background: "#f6f8fe",
            borderRadius: 8,
            overflow: "hidden",
          }}
          dataSource={jobs}
          columns={columns}
          locale={{ emptyText: "Không có" }}
          scroll={{ x: 1200 }}
        />
      </div>
    </div>
  );
};

export default Job;
