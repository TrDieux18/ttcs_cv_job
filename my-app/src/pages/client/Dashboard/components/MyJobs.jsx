import { useEffect, useState } from "react";
import { Tabs, Table, Tag, Typography, Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { getApplicationsByUser } from "@services/client/ApplicationService";
import { getSavedJobsByUser } from "@services/client/SaveJobService";

const { Text } = Typography;

const MyJobs = () => {
  const [activeTab, setActiveTab] = useState("applied");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const [appliedResponse, savedResponse] = await Promise.all([
          getApplicationsByUser(),
          getSavedJobsByUser(),
        ]);
        if (appliedResponse.success) setAppliedJobs(appliedResponse.data);
        if (savedResponse.success) setSavedJobs(savedResponse.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };
    fetchApplications();
  }, []);

  const appliedColumns = [
    {
      title: "Logo",
      key: "logo",
      width: 80,
      render: (_, record) => (
        <img
          src={record?.job?.company?.logo?.url || "/default.png"}
          alt="logo"
          className="w-12 h-12 object-cover rounded-md"
        />
      ),
    },
    {
      title: "Công việc",
      key: "title",
      render: (_, record) => (
        <div>
          <div className="font-semibold text-[15px]">{record.job.title}</div>
          <div className="text-gray-500 text-sm">
            {record.job.company?.headline || "Không có tên công ty"}
          </div>
        </div>
      ),
    },
    {
      title: "Lương",
      dataIndex: ["job", "salary"],
      key: "salary",
      render: (salary) => salary || "Thỏa thuận",
    },
    {
      title: "Địa điểm",
      dataIndex: ["job", "location"],
      key: "location",
      render: (loc) => loc || "Địa điểm không xác định",
    },
    {
      title: "Ngày ứng tuyển",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) =>
        date ? new Date(date).toLocaleDateString("vi-VN") : "-",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "pending"
            ? "gold"
            : status === "accepted"
            ? "green"
            : "red";
        const text =
          status === "pending"
            ? "Đang chờ"
            : status === "accepted"
            ? "Đã duyệt"
            : "Từ chối";
        return <Tag color={color}>{text}</Tag>;
      },
    },
  ];

  const savedColumns = appliedColumns.slice(0, 4);

  const renderEmptyState = () => (
    <Card className="text-center py-16">
      <Text type="secondary" className="text-base mb-4 block">
        Bạn chưa ứng tuyển vào công việc nào trong 12 tháng qua.
      </Text>
      <Button
        type="primary"
        danger
        size="large"
        onClick={() => navigate("/jobs")}
      >
        Tìm việc ngay
      </Button>
    </Card>
  );

  const renderJobList = (jobs, tab) => {
    if (!jobs || jobs.length === 0) return renderEmptyState();

    return (
      <div className="bg-white rounded-md shadow-sm p-4">
        <Table
          columns={tab === "applied" ? appliedColumns : savedColumns}
          dataSource={jobs}
          rowKey={(record) => record._id}
          pagination={false}
          onRow={(record) => ({
            onClick: () => navigate(`/jobs/${record.job._id}`),
          })}
          rowClassName={() =>
            "cursor-pointer hover:bg-gray-50 transition-all duration-150"
          }
        />
      </div>
    );
  };

  const tabs = [
    {
      key: "applied",
      label: (
        <span className="flex items-center gap-1">
          <span className="font-semibold">Đã ứng tuyển</span>
          <Tag color="green">{appliedJobs.length}</Tag>
        </span>
      ),
    },
    {
      key: "saved",
      label: (
        <span className="flex items-center gap-1">
          <span className="font-semibold">Đã lưu</span>
          <Tag>{savedJobs.length}</Tag>
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white px-5 pt-6 shadow-sm rounded-md">
        <h2 className="text-2xl font-bold mb-2">Việc làm của tôi</h2>
        <Text type="secondary">
          Các công việc bạn đã ứng tuyển được lưu trong 12 tháng gần đây.
        </Text>

        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabs}
          className="custom-tabs mt-4"
        />
      </div>

      <div>
        {activeTab === "applied"
          ? renderJobList(appliedJobs, "applied")
          : renderJobList(savedJobs, "saved")}
      </div>
    </div>
  );
};

export default MyJobs;
