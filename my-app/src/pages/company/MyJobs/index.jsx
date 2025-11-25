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
  Select,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  MoreOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { updateStatusApplicant } from "@services/company/ApplicantService";

const { Option } = Select;
const tagClass = (jobType) => {
  switch (jobType) {
    case "Full-time":
      return "bg-blue-50 text-blue-800 border border-blue-200 rounded-sm px-2 py-1 font-semibold";
    case "Part-time":
      return "bg-green-50 text-green-800 border border-green-200 rounded-sm px-2 py-1 font-semibold";
    case "Contract":
      return "bg-orange-50 text-orange-800 border border-orange-200 rounded-sm px-2 py-1 font-semibold";
    case "Internship":
      return "bg-purple-50 text-purple-800 border border-purple-200 rounded-sm px-2 py-1 font-semibold";
    default:
      return "bg-gray-50 text-gray-800 border border-gray-200 rounded-sm px-2 py-1 font-semibold";
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

  const [jobTypeFilter, setJobTypeFilter] = useState("");

  const fetchJobs = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const query = {
        page,
        limit,
        keyword: keyword?.trim(),
        jobType: jobTypeFilter || undefined,
      };
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
  const handleSearch = () => fetchJobs(1, pagination.pageSize);

  const handleDelete = async (id) => {
    console.log("Deleting job with id:", id);
    try {
      setLoading(true);
      const res = await deleteMyJob(id);
      if (res.success) {
        messageApi.success("Xóa công việc thành công");
        fetchJobs(pagination.current, pagination.pageSize, keyword);
      } else messageApi.error("Xóa thất bại");
    } catch {
      messageApi.error("Xóa thất bại");
    } finally {
      setLoading(false);
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
              onClick={() => navigate(`/company/my-jobs/update/${record._id}`)}
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

  const handleChangeStatusApplicant = async (applicantId, newStatus) => {
    try {
      setLoading(true);
      const response = await updateStatusApplicant(applicantId, newStatus);
      if (response.success) {
        setApplicants((prev) =>
          prev.map((applicant) =>
            applicant._id === applicantId
              ? { ...applicant, status: newStatus.toString() }
              : applicant
          )
        );
        messageApi.success("Cập nhật trạng thái ứng viên thành công");
      }
    } catch (error) {
      console.error("Failed to update applicant status", error);
    } finally {
      setLoading(false);
    }
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
      render: (_, record) => {
        return (
          <Select
            className={`px-2 py-1 w-30  `}
            onChange={(newStatus) =>
              handleChangeStatusApplicant(record._id, newStatus)
            }
            defaultValue="pending"
            value={record.status}
          >
            <Option value="pending">
              <span className="text-yellow-500">Chờ xử lý</span>
            </Option>
            <Option value="reviewed">
              <span className="text-blue-500">Đã xem</span>
            </Option>
            <Option value="accepted">
              <span className="text-green-500">Chấp nhận</span>
            </Option>

            <Option value="rejected">
              <span className="text-red-500">Từ chối</span>
            </Option>
          </Select>
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
            <Input
              placeholder="Tìm kiếm ..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onPressEnter={() => fetchJobs(1)}
              style={{ width: 250 }}
              prefix={<SearchOutlined />}
            />
            <Select
              placeholder="Chọn loại hình"
              value={jobTypeFilter || "all"}
              onChange={(value) => setJobTypeFilter(value)}
              allowClear
              style={{ width: 150 }}
              defaultValue="all"
            >
              <Option value="all">Tất cả</Option>

              <Option value="Full-time">Full-time</Option>
              <Option value="Part-time">Part-time</Option>
              <Option value="Contract">Contract</Option>
              <Option value="Internship">Internship</Option>
            </Select>
            <Button type="default" onClick={() => fetchJobs(1)}>
              Tìm
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
        width={1300}
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
