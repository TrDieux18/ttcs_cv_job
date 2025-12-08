# Component Library

## 📦 Shared Components

### CVPreviewModal

Location: `my-app/src/pages/company/MyJobs/components/CVPreviewModal.jsx`

**Purpose**: Hiển thị thông tin chi tiết CV của ứng viên trong modal

**Props**:

```typescript
interface CVPreviewModalProps {
  visible: boolean;
  onClose: () => void;
  applicant: {
    user: {
      fullName: string;
      email: string;
      phone: string;
      address: string;
    };
    cv: {
      title: string;
      jobTitle: string;
      about: string;
      workExperience: Array<{
        position: string;
        company: string;
        startDate: string;
        endDate: string;
        description: string;
      }>;
      education: Array<{
        degree: string;
        school: string;
        startDate: string;
        endDate: string;
      }>;
      skills: Array<{
        name: string;
        level: string;
      }>;
      foreignLanguages: Array<{
        language: string;
        level: string;
      }>;
      certificates: Array<{
        name: string;
        issuer: string;
        date: string;
      }>;
      fileUrl: string;
    };
  };
  loading: boolean;
}
```

**Usage**:

```jsx
import CVPreviewModal from "./components/CVPreviewModal";

const [cvPreviewVisible, setCvPreviewVisible] = useState(false);
const [selectedApplicant, setSelectedApplicant] = useState(null);

<CVPreviewModal
  visible={cvPreviewVisible}
  onClose={() => setCvPreviewVisible(false)}
  applicant={selectedApplicant}
  loading={false}
/>;
```

### NotificationBell

Location: `my-app/src/components/NotificationBell/index.jsx`

**Purpose**: Hiển thị dropdown thông báo trong header

**Features**:

- Real-time notifications với Socket.IO
- Badge đếm số thông báo chưa đọc
- Click notification → mark as read + navigate
- Empty state khi không có thông báo

**Usage**:

```jsx
import NotificationBell from "@components/NotificationBell";

<NotificationBell />;
```

## 🎨 Common UI Patterns

### Status Tag Component

```jsx
const StatusTag = ({ status }) => {
  const statusMap = {
    pending: { color: "yellow", text: "Chờ xử lý" },
    reviewed: { color: "blue", text: "Đã xem" },
    accepted: { color: "green", text: "Chấp nhận" },
    rejected: { color: "red", text: "Từ chối" },
  };

  const config = statusMap[status] || { color: "gray", text: status };

  return <Tag color={config.color}>{config.text}</Tag>;
};
```

### Job Type Tag

```jsx
const jobTypeClass = (jobType) => {
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

<div className={jobTypeClass(jobType)}>{jobType}</div>;
```

### Loading State

```jsx
{loading ? (
  <div className="flex justify-center items-center py-20">
    <Spin size="large" />
  </div>
) : (
  // Content
)}
```

### Empty State

```jsx
<Empty description="Không có dữ liệu" image={Empty.PRESENTED_IMAGE_SIMPLE} />
```

## 📋 Table Components

### Basic Table Setup

```jsx
const columns = [
  {
    title: "STT",
    key: "idx",
    width: 60,
    align: "center",
    render: (_, __, i) => (page - 1) * pageSize + i + 1,
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    render: (text) => <div className="font-medium text-gray-800">{text}</div>,
  },
  {
    title: "Hành động",
    key: "action",
    align: "center",
    render: (_, record) => (
      <Button
        type="link"
        onClick={() => handleAction(record)}
        className="text-blue-600 hover:text-blue-700"
      >
        Xem
      </Button>
    ),
  },
];

<Table
  rowKey="_id"
  loading={loading}
  columns={columns}
  dataSource={data}
  pagination={{
    current: page,
    pageSize: pageSize,
    total: total,
    showSizeChanger: true,
    showTotal: (t) => `Tổng ${t} items`,
  }}
  onChange={handleTableChange}
  rowClassName={() => "hover:bg-gray-50 transition-colors"}
  locale={{ emptyText: "Chưa có dữ liệu" }}
/>;
```

### Table with Dropdown Actions

```jsx
const rowMenuItems = (record) => [
  {
    key: "1",
    label: (
      <span onClick={() => handleView(record._id)} className="flex items-center gap-2">
        <EyeOutlined /> Xem chi tiết
      </span>
    ),
  },
  { type: "divider" },
  {
    key: "2",
    label: (
      <span onClick={() => handleEdit(record._id)} className="flex items-center gap-2">
        <EditOutlined /> Chỉnh sửa
      </span>
    ),
  },
  { type: "divider" },
  {
    key: "3",
    danger: true,
    label: (
      <Popconfirm
        title="Bạn có chắc muốn xóa?"
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

// In column definition
{
  title: "Hành động",
  key: "action",
  align: "center",
  render: (_, record) => (
    <Dropdown
      menu={{ items: rowMenuItems(record) }}
      trigger={["click"]}
    >
      <Button type="text">
        <MoreOutlined />
      </Button>
    </Dropdown>
  ),
}
```

## 📝 Form Components

### Form with Validation

```jsx
const [form] = Form.useForm();
const [loading, setLoading] = useState(false);

const handleSubmit = async (values) => {
  try {
    setLoading(true);
    const response = await apiCall(values);
    if (response.success) {
      message.success("Thành công!");
      form.resetFields();
    }
  } catch (error) {
    message.error("Có lỗi xảy ra!");
  } finally {
    setLoading(false);
  }
};

<Form form={form} layout="vertical" onFinish={handleSubmit}>
  <Form.Item
    label="Tên"
    name="name"
    rules={[
      { required: true, message: "Vui lòng nhập tên" },
      { min: 3, message: "Tên phải có ít nhất 3 ký tự" },
    ]}
  >
    <Input placeholder="Nhập tên" className="!rounded-lg" />
  </Form.Item>

  <Form.Item>
    <Button
      type="primary"
      htmlType="submit"
      loading={loading}
      className="!bg-[#22c55e] hover:!bg-[#16a34a] !border-none !rounded-lg"
    >
      Lưu
    </Button>
  </Form.Item>
</Form>;
```

## 🔔 Modal Components

### Basic Modal

```jsx
const [modalVisible, setModalVisible] = useState(false);

<Modal
  title="Tiêu đề"
  open={modalVisible}
  onCancel={() => setModalVisible(false)}
  footer={[
    <Button key="cancel" onClick={() => setModalVisible(false)}>
      Đóng
    </Button>,
    <Button
      key="submit"
      type="primary"
      onClick={handleSubmit}
      className="!bg-[#22c55e] hover:!bg-[#16a34a]"
    >
      Xác nhận
    </Button>,
  ]}
  width={800}
  centered
>
  {/* Content */}
</Modal>;
```

### Modal with Table

```jsx
<Modal
  title={
    <div className="flex items-center gap-2">
      <UserOutlined className="text-blue-600" />
      <span className="text-lg font-semibold">Danh sách</span>
    </div>
  }
  open={visible}
  onCancel={onClose}
  footer={null}
  width={1400}
  centered
>
  <Table
    rowKey="_id"
    columns={columns}
    dataSource={data}
    pagination={{
      pageSize: 5,
      showSizeChanger: true,
    }}
  />
</Modal>
```

## 🎯 Icon Usage

### Common Icons

```jsx
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
  FileTextOutlined,
  MoreOutlined,
  FilterOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
```

### Icon with Text

```jsx
<Button icon={<PlusOutlined />}>
  Tạo mới
</Button>

<div className="flex items-center gap-2">
  <UserOutlined className="text-blue-600" />
  <span>Người dùng</span>
</div>
```

## 📊 Chart Components

### Pie Chart (Chart.js)

```jsx
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Label 1", "Label 2", "Label 3"],
  datasets: [
    {
      data: [30, 50, 20],
      backgroundColor: ["#60A5FA", "#34D399", "#FBBF24"],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
};

<div style={{ minHeight: 280 }}>
  <Pie data={data} options={options} />
</div>;
```

## 🔐 Protected Routes

### Route Guard Example

```jsx
import { ProtectedRoute } from "@components/guard/ProtectedRoute";

<Route
  path="/company/*"
  element={
    <ProtectedRoute requiredRole="company">
      <CompanyLayout />
    </ProtectedRoute>
  }
/>;
```
