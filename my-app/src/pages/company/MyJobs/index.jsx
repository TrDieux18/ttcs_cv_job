// src/pages/MyJobsPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyJobs,
  deleteMyJob,
  getApplicantsForMyJob,
} from "@services/company/JobService";
import {
  Button,
  message,
  Table,
  Input,
  Popconfirm,
  Dropdown,
  Menu,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  MoreOutlined,
  UserOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
const tagClass = (jobType) => {
  switch (jobType) {
    case "Full-time":
      return "bg-blue-50 text-blue-800 border border-blue-200 rounded-sm px-3 py-1 font-semibold";
    case "Part-time":
      return "bg-green-50 text-green-800 border border-green-200 rounded-sm px-3 py-1 font-semibold";
    case "Contract":
      return "bg-orange-50 text-orange-800 border border-orange-200 rounded-sm px-3 py-1 font-semibold";
    case "Internship":
      return "bg-purple-50 text-purple-800 border border-purple-200 rounded-sm px-3 py-1 font-semibold";
    default:
      return "bg-gray-50 text-gray-800 border border-gray-200 rounded-sm px-3 py-1 font-semibold";
  }
};

export default function MyJobsPage() {
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

  const [applicantsModalVisible, setApplicantsModalVisible] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [applicantsLoading, setApplicantsLoading] = useState(false);

  const fetchJobs = async (page = 1, limit = 10, search = "") => {
    try {
      setLoading(true);
      const query = { page, limit, keyword: search?.trim() };
      const res = await getMyJobs(query);
      setJobs(res.data);
      setPagination({ current: page, pageSize: limit, total: res.total });
    } catch (e) {
      messageApi.error("Không thể tải danh sách công việc");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleTableChange = (newPag) =>
    fetchJobs(newPag.current, newPag.pageSize, keyword);
  const handleSearch = () => fetchJobs(1, pagination.pageSize, keyword);

  const handleDelete = async (id) => {
    try {
      const res = await deleteMyJob(id);
      if (res.success) {
        messageApi.success("Xóa công việc thành công");
        fetchJobs(pagination.current, pagination.pageSize, keyword);
      } else messageApi.error("Xóa thất bại");
    } catch {
      messageApi.error("Xóa thất bại");
    }
  };

  const handleViewApplicants = async (job) => {
    setSelectedJob(job);
    setApplicantsModalVisible(true);
    setApplicantsLoading(true);

    try {
      const res = await getApplicantsForMyJob(job._id);

      if (res.success) {
        setApplicants(res.data || []);
      } else {
        messageApi.error("Không thể tải danh sách ứng viên");
      }
    } catch (error) {
      messageApi.error("Không thể tải danh sách ứng viên");
    } finally {
      setApplicantsLoading(false);
    }
  };
  console.log(applicants);

  const handleCloseApplicantsModal = () => {
    setApplicantsModalVisible(false);
    setSelectedJob(null);
    setApplicants([]);
  };

  const columns = [
    {
      title: "STT",
      key: "idx",
      width: 60,
      align: "center",
      render: (_, __, i) =>
        (pagination.current - 1) * pagination.pageSize + i + 1,
    },
    {
      title: "Tiêu đề",
      dataIndex: "title",
      key: "title",
      render: (t) => (
        <div
          className="max-w-[480px] truncate font-medium text-gray-800"
          title={t}
        >
          {t}
        </div>
      ),
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
      align: "center",
      render: (l) => (
        <div className="text-sm font-semibold text-gray-700">{l}</div>
      ),
    },
    {
      title: "Loại hình",
      dataIndex: "jobType",
      key: "jobType",
      align: "center",
      render: (jt) => <div className={tagClass(jt)}>{jt}</div>,
    },
    {
      title: "Lương",
      dataIndex: "salary",
      key: "salary",
      align: "center",
      render: (s) => (
        <div className="text-sm font-semibold text-gray-700">
          {s || "Thỏa thuận"}
        </div>
      ),
    },
    {
      title: "Ứng viên",
      key: "applicants",
      align: "center",
      width: 100,
      render: (_, record) => (
        <Button
          type="link"
          icon={<UserOutlined />}
          onClick={() => handleViewApplicants(record)}
          className="text-topcvBlue hover:text-blue-700"
        >
          Xem
        </Button>
      ),
    },

    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_, record) => {
        const menu = (
          <Menu className="w-44" selectable={false}>
            <Menu.Item
              key="view"
              onClick={() => navigate(`/company/my-jobs/${record._id}`)}
              className="flex items-center gap-2 px-3 py-2"
            >
              <EyeOutlined className="text-base text-gray-600 mr-2" />
              <span className="text-sm text-gray-800">Xem chi tiết</span>
            </Menu.Item>

            <Menu.Item
              key="edit"
              onClick={() => navigate(`/company/my-jobs/update/${record._id}`)}
              className="flex items-center gap-2 px-3 py-2"
            >
              <EditOutlined className="text-base text-gray-600 mr-2" />
              <span className="text-sm text-gray-800">Chỉnh sửa</span>
            </Menu.Item>

            <Menu.Item
              key="delete"
              className="flex items-center gap-2 px-3 py-2"
            >
              <Popconfirm
                title="Bạn có chắc muốn xóa job này?"
                onConfirm={() => handleDelete(record._id)}
                okText="Xóa"
                cancelText="Hủy"
              >
                <span className="flex items-center gap-2">
                  <DeleteOutlined className="text-base icon-delete" />
                  <span className="text-sm text-delete">Xóa</span>
                </span>
              </Popconfirm>
            </Menu.Item>
          </Menu>
        );

        return (
          <div className="flex items-center justify-center">
            <Dropdown
              overlay={menu}
              trigger={["hover"]}
              overlayClassName="custom-dropdown-two"
            >
              <Button
                type="text"
                className="p-1 rounded-md bg-transparent hover:bg-transparent more-btn-no-color"
              >
                <MoreOutlined className="text-lg more-icon-no-color" />
              </Button>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  const getStatusDisplay = (status) => {
    const statusMap = {
      pending: {
        text: "Chờ xử lý",
        class: "bg-yellow-50 text-yellow-800 border-yellow-200",
      },
      reviewing: {
        text: "Đang xem xét",
        class: "bg-blue-50 text-blue-800 border-blue-200",
      },
      approved: {
        text: "Phù hợp",
        class: "bg-green-50 text-green-800 border-green-200",
      },
      rejected: {
        text: "Từ chối",
        class: "bg-red-50 text-red-800 border-red-200",
      },
    };
    return (
      statusMap[status] || {
        text: status,
        class: "bg-gray-50 text-gray-800 border-gray-200",
      }
    );
  };

  const applicantsColumns = [
    {
      title: "STT",
      key: "idx",
      width: 60,
      align: "center",
      render: (_, __, i) => i + 1,
    },
    {
      title: "Họ và tên",
      dataIndex: ["user", "fullName"],
      key: "fullName",
      render: (name) => (
        <div className="font-medium text-gray-800">{name || "N/A"}</div>
      ),
    },
    {
      title: "Email",
      dataIndex: ["user", "email"],
      key: "email",
      render: (email) => <div className="text-gray-700">{email || "N/A"}</div>,
    },
    {
      title: "CV",
      dataIndex: ["cv", "title"],
      key: "cvTitle",
      align: "center",
      render: (title, record) => (
        <div className="text-gray-700">
          {title ? (
            <a
              href={record.cv?.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-topcvBlue hover:text-blue-700 underline"
            >
              {title}
            </a>
          ) : (
            "N/A"
          )}
        </div>
      ),
    },
    {
      title: "Ngày ứng tuyển",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (date) => (
        <div className="text-gray-700">
          {new Date(date).toLocaleDateString("vi-VN", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status) => {
        const { text, class: statusClass } = getStatusDisplay(status);
        return (
          <span
            className={`px-3 py-1 rounded-sm border font-semibold text-xs ${statusClass}`}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      width: 200,
      render: (_, record) => (
        <div className="flex gap-2 justify-center">
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              if (record.cv?.fileUrl) {
                window.open(record.cv.fileUrl, "_blank");
              } else {
                messageApi.warning("CV không khả dụng");
              }
            }}
            className="text-topcvBlue hover:text-blue-700"
          >
            Xem CV
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      {contextHolder}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            TIN TUYỂN DỤNG
          </h1>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white border border-gray-200 rounded-md px-3 py-1 shadow-sm">
              <SearchOutlined className="text-gray-400 mr-2" />
              <Input
                placeholder="Tìm kiếm..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onPressEnter={handleSearch}
                style={{ width: 200 }}
              />
            </div>

            <Button
              type="default"
              onClick={handleSearch}
              className="border border-gray-200 bg-white hover:bg-gray-50"
            >
              Tìm
            </Button>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate("/company/my-jobs/create")}
              className="bg-primaryGreen border-primaryGreen hover:bg-green-700"
            >
              Đăng tin mới
            </Button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg shadow-card p-4">
          <Table
            rowKey="_id"
            loading={loading}
            columns={columns}
            dataSource={jobs}
            pagination={{
              ...pagination,
              showSizeChanger: true,
              showTotal: (t) => `Tổng ${t} công việc`,
            }}
            onChange={handleTableChange}
            bordered={false}
            sticky
            rowClassName={() => "hover:bg-gray-50 transition-colors"}
            locale={{ emptyText: "Chưa có công việc nào" }}
          />
        </div>
      </div>

      <Modal
        title={
          <div className="flex items-center gap-2">
            <UserOutlined className="text-topcvBlue" />
            <span className="text-lg font-semibold">
              Danh sách ứng viên
              {selectedJob && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  - {selectedJob.title}
                </span>
              )}
            </span>
          </div>
        }
        open={applicantsModalVisible}
        onCancel={handleCloseApplicantsModal}
        footer={[
          <Button key="close" onClick={handleCloseApplicantsModal}>
            Đóng
          </Button>,
        ]}
        width={1000}
        centered
      >
        <div className="mt-4">
          <Table
            rowKey="_id"
            loading={applicantsLoading}
            columns={applicantsColumns}
            dataSource={applicants}
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              showTotal: (total) => `Tổng ${total} ứng viên`,
            }}
            bordered={false}
            size="middle"
            locale={{ emptyText: "Chưa có ứng viên nào ứng tuyển" }}
          />
        </div>
      </Modal>
    </>
  );
}
