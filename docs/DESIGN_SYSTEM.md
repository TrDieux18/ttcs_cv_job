# Design System - CV Management Platform

## 🎨 Color Palette

### Primary Colors

- **Green Primary**: `#22c55e` (green-500) - Main action buttons
- **Green Hover**: `#16a34a` (green-600) - Hover states
- **Blue Primary**: `#3b82f6` (blue-600) - Links, secondary actions
- **Blue Hover**: `#2563eb` (blue-700) - Link hover states

### Neutral Colors

- **Background**: `#ffffff` (white) - Page background
- **Card Background**: `#ffffff` (white)
- **Text Primary**: `#111827` (gray-900) - Headings, important text
- **Text Secondary**: `#6b7280` (gray-500) - Descriptions, labels
- **Text Muted**: `#9ca3af` (gray-400) - Placeholders, disabled
- **Border**: `#e5e7eb` (gray-200) - Card borders, dividers

### Status Colors

- **Success**: `#22c55e` (green-500)
- **Warning**: `#f59e0b` (yellow-500)
- **Error**: `#ef4444` (red-500)
- **Info**: `#3b82f6` (blue-500)

### Job Type Tags

- **Full-time**: `bg-blue-50 text-blue-800 border-blue-200`
- **Part-time**: `bg-green-50 text-green-800 border-green-200`
- **Contract**: `bg-orange-50 text-orange-800 border-orange-200`
- **Internship**: `bg-purple-50 text-purple-800 border-purple-200`

## 📏 Typography

### Headings

```jsx
// Page Title (H1)
className = "text-2xl font-bold text-gray-900";

// Section Title (H2)
className = "text-lg font-semibold text-gray-800";

// Subsection Title (H3)
className = "text-base font-medium text-gray-800";
```

### Body Text

```jsx
// Description
className = "text-sm text-gray-500";

// Regular text
className = "text-sm text-gray-700";

// Small text
className = "text-xs text-gray-600";
```

## 🔲 Layout & Spacing

### Container

```jsx
// Page container
className = "min-h-screen bg-white";

// Content wrapper
className = "mx-auto max-w-7xl px-8 py-6";

// Narrow content (forms, profiles)
className = "mx-auto max-w-6xl px-8 py-6";
```

### Spacing

```jsx
// Header margin bottom
className = "mb-8";

// Section spacing
className = "space-y-6";

// Grid gaps
className = "gap-4"; // Small
className = "gap-6"; // Medium
```

## 🎯 Components

### Buttons

#### Primary Button

```jsx
<Button
  type="primary"
  className="!bg-[#22c55e] hover:!bg-[#16a34a] !border-none !rounded-lg !font-medium"
>
  Text
</Button>
```

#### Secondary/Default Button

```jsx
<Button type="default" className="!rounded-lg">
  Text
</Button>
```

#### Link Button

```jsx
<Button type="link" className="text-blue-600 hover:text-blue-700 font-medium">
  Text
</Button>
```

### Cards

```jsx
<Card className="shadow-sm border border-gray-200 rounded-lg">
  {/* Content */}
</Card>
```

### Input Fields

```jsx
<Input
  placeholder="Placeholder..."
  className="!rounded-lg"
  prefix={<SearchOutlined className="text-gray-400" />}
/>
```

### Select Dropdown

```jsx
<Select placeholder="Tất cả" className="!rounded-lg" style={{ width: 150 }}>
  <Option value="all">Tất cả</Option>
</Select>
```

### Table

```jsx
<Table
  rowKey="_id"
  columns={columns}
  dataSource={data}
  rowClassName={() => "hover:bg-gray-50 transition-colors"}
  pagination={{
    showSizeChanger: true,
    showTotal: (total) => `Tổng ${total} items`,
  }}
/>
```

## 📱 Responsive Design

### Breakpoints (Tailwind)

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Responsive Utilities

```jsx
// Flex direction
className = "flex flex-col sm:flex-row";

// Grid columns
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

// Text size
className = "text-xl sm:text-2xl";
```

## 🎨 Page Header Pattern

```jsx
<div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
  <div>
    <h1 className="text-2xl font-bold text-gray-900">Page Title</h1>
    <p className="mt-1 text-sm text-gray-500">Page description</p>
  </div>

  {/* Optional: Action button */}
  <Button
    type="primary"
    icon={<PlusOutlined />}
    className="!bg-[#22c55e] hover:!bg-[#16a34a] !border-none !rounded-lg !font-medium"
  >
    Action
  </Button>
</div>
```

## 🔍 Search & Filter Pattern

```jsx
<div className="mb-4 flex flex-col sm:flex-row gap-3">
  <Input
    placeholder="Tìm kiếm..."
    value={keyword}
    onChange={(e) => setKeyword(e.target.value)}
    style={{ width: 300 }}
    prefix={<SearchOutlined className="text-gray-400" />}
    className="!rounded-lg"
  />

  <Select
    placeholder="Tất cả"
    value={filter}
    onChange={setFilter}
    style={{ width: 150 }}
    className="!rounded-lg"
  >
    <Option value="all">Tất cả</Option>
  </Select>

  <Button
    type="default"
    onClick={handleSearch}
    icon={<SearchOutlined />}
    className="!rounded-lg"
  >
    Tìm kiếm
  </Button>
</div>
```

## ✨ Best Practices

1. **Consistency**: Luôn sử dụng cùng một pattern cho các components giống nhau
2. **Spacing**: Sử dụng spacing nhất quán (mb-8, gap-4, px-8 py-6)
3. **Colors**: Chỉ dùng màu từ palette đã định nghĩa
4. **Border Radius**: Luôn dùng `!rounded-lg` cho inputs, buttons, cards
5. **Shadows**: Dùng `shadow-sm` cho cards (không dùng shadow-lg)
6. **Typography**: Giữ hierarchy rõ ràng (h1: text-2xl, h2: text-lg, body: text-sm)
7. **Accessibility**: Luôn có contrast tốt giữa text và background
8. **Responsive**: Mobile-first approach, test trên nhiều screen sizes

## 📦 Component Structure

### Page Component Template

```jsx
export default function PageName() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-8 py-6">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Title</h1>
            <p className="mt-1 text-sm text-gray-500">Description</p>
          </div>
        </div>

        {/* Content Card */}
        <Card className="shadow-sm border border-gray-200 rounded-lg">
          {/* Content */}
        </Card>
      </div>
    </div>
  );
}
```
