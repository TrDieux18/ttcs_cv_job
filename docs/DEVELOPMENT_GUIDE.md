# Development Guide

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16.x
- npm or yarn
- MongoDB >= 5.x
- Git

### Environment Setup

#### Backend (.env)

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/cv-management

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# Cloudinary (File Upload)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Email (Resend SMTP)
EMAIL_HOST=smtp.resend.com
EMAIL_PORT=465
EMAIL_USER=resend
EMAIL_PASS=your-resend-api-key
EMAIL_FROM=noreply@yourdomain.com

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

### Installation

#### Backend

```bash
cd BE
npm install
npm run dev
```

#### Frontend

```bash
cd my-app
npm install
npm run dev
```

#### Database (Optional - JSON Server for testing)

```bash
cd database
npm install
npm start
```

## 📦 Package Scripts

### Backend (BE/package.json)

```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "jest",
    "lint": "eslint .",
    "format": "prettier --write ."
  }
}
```

### Frontend (my-app/package.json)

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx",
    "format": "prettier --write \"src/**/*.{js,jsx,css}\""
  }
}
```

## 🏗️ Development Workflow

### 1. Create New Feature

#### Backend

```bash
# 1. Create model
touch BE/models/feature.model.js

# 2. Create controller
touch BE/controllers/client/feature.controller.js

# 3. Create route
touch BE/routes/client/feature.route.js

# 4. Register route in BE/routes/client/index.route.js
```

#### Frontend

```bash
# 1. Create service
touch my-app/src/services/client/FeatureService.js

# 2. Create page/component
mkdir my-app/src/pages/client/Feature
touch my-app/src/pages/client/Feature/index.jsx

# 3. Add route in my-app/src/routes/ClientRoute.jsx
```

### 2. Backend Model Example

```javascript
// BE/models/feature.model.js
import mongoose from "mongoose";

const featureSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deleted: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Index for soft delete
featureSchema.index({ deleted: 1 });

const Feature = mongoose.model("Feature", featureSchema);
export default Feature;
```

### 3. Backend Controller Example

```javascript
// BE/controllers/client/feature.controller.js
import { Types } from "mongoose";
import Feature from "../../models/feature.model.js";

export const getFeatures = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const { page = 1, limit = 10 } = req.query;

    const features = await Feature.find({
      user: new Types.ObjectId(userId),
      deleted: 1,
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Feature.countDocuments({
      user: new Types.ObjectId(userId),
      deleted: 1,
    });

    res.status(200).json({
      success: true,
      data: features,
      total,
    });
  } catch (error) {
    console.error("Error getting features:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};

export const createFeature = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Tiêu đề là bắt buộc",
      });
    }

    const feature = await Feature.create({
      title,
      description,
      user: userId,
    });

    res.status(201).json({
      success: true,
      data: feature,
    });
  } catch (error) {
    console.error("Error creating feature:", error);
    res.status(500).json({
      success: false,
      message: "Lỗi server",
    });
  }
};
```

### 4. Backend Route Example

```javascript
// BE/routes/client/feature.route.js
import express from "express";
import * as controller from "../../controllers/client/feature.controller.js";
import { authMiddleware } from "../../middlewares/admin/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, controller.getFeatures);
router.post("/", authMiddleware, controller.createFeature);

export default router;
```

### 5. Frontend Service Example

```javascript
// my-app/src/services/client/FeatureService.js
import { axiosClient } from "../axiosConfig";
import { ApiResponse } from "@types/response/ApiResponse";

const BASE_API = "/feature";

export const getFeatures = async (params) => {
  try {
    const response = await axiosClient.get(BASE_API, { params });
    const data = response.data;
    return new ApiResponse(data.success, data.data, data.message, data.total);
  } catch (error) {
    console.error("Error getting features:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};

export const createFeature = async (featureData) => {
  try {
    const response = await axiosClient.post(BASE_API, featureData);
    const data = response.data;
    return new ApiResponse(data.success, data.data, data.message);
  } catch (error) {
    console.error("Error creating feature:", error);
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};
```

### 6. Frontend Component Example

```jsx
// my-app/src/pages/client/Feature/index.jsx
import { useEffect, useState } from "react";
import { Button, Table, message, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getFeatures } from "@services/client/FeatureService";

export default function FeaturePage() {
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchFeatures = async (page = 1, limit = 10) => {
    try {
      setLoading(true);
      const response = await getFeatures({ page, limit });
      if (response.success) {
        setFeatures(response.data);
        setPagination({
          current: page,
          pageSize: limit,
          total: response.total,
        });
      } else {
        message.error("Không thể tải dữ liệu");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeatures();
  }, []);

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
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-8 py-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Features</h1>
            <p className="mt-1 text-sm text-gray-500">Quản lý features</p>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className="!bg-[#22c55e] hover:!bg-[#16a34a] !border-none !rounded-lg"
          >
            Tạo mới
          </Button>
        </div>

        <Card className="shadow-sm border border-gray-200 rounded-lg">
          <Table
            rowKey="_id"
            loading={loading}
            columns={columns}
            dataSource={features}
            pagination={{
              ...pagination,
              showSizeChanger: true,
              showTotal: (total) => `Tổng ${total} items`,
            }}
            onChange={(newPag) =>
              fetchFeatures(newPag.current, newPag.pageSize)
            }
          />
        </Card>
      </div>
    </div>
  );
}
```

## 🧪 Testing

### Backend Testing (Jest)

```javascript
// BE/tests/feature.test.js
import request from "supertest";
import app from "../app";

describe("Feature API", () => {
  let token;

  beforeAll(async () => {
    // Login and get token
    const response = await request(app).post("/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });
    token = response.body.data.token;
  });

  test("GET /feature - should return features", async () => {
    const response = await request(app)
      .get("/feature")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
```

## 🔧 Debugging

### Backend

```javascript
// Add console.log in controller
console.log("Request body:", req.body);
console.log("User ID:", res.locals.user.id);

// Use debugger
debugger;

// Enable debug in package.json
"dev": "NODE_ENV=development DEBUG=* nodemon app.js"
```

### Frontend

```javascript
// Use React DevTools
// Use console.log
console.log("State:", state);
console.log("Props:", props);

// Network tab in browser DevTools
// Check API requests and responses
```

## 📊 Database Management

### MongoDB Commands

```bash
# Connect to MongoDB
mongosh

# Use database
use cv-management

# List collections
show collections

# Query examples
db.users.find().pretty()
db.jobs.find({ deleted: 1 }).limit(10)

# Update
db.users.updateOne(
  { _id: ObjectId("...") },
  { $set: { fullName: "New Name" } }
)

# Export collection
mongoexport --db=cv-management --collection=users --out=users.json

# Import collection
mongoimport --db=cv-management --collection=users --file=users.json
```

## 🐛 Common Issues & Solutions

### CORS Error

```javascript
// BE/app.js - Add CORS middleware
import cors from "cors";
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
```

### JWT Token Issues

```javascript
// Check token expiration
// Refresh token on 401 error
// Clear token on logout
```

### MongoDB Connection

```javascript
// Check MongoDB is running
// Verify connection string
// Check network access
```

## 📝 Code Style Guidelines

### JavaScript/JSX

- Use ES6+ features
- Prefer `const` over `let`
- Use arrow functions
- Destructure objects and arrays
- Use async/await over promises

### React

- Use functional components with hooks
- Keep components small and focused
- Use prop-types or TypeScript
- Avoid inline styles (use Tailwind classes)

### Naming

- Components: PascalCase
- Functions/Variables: camelCase
- Constants: UPPER_SNAKE_CASE
- Files: Follow component name

## 🚢 Deployment

### Backend

```bash
# Build
npm run build

# Start production
NODE_ENV=production npm start
```

### Frontend

```bash
# Build
npm run build

# Output in dist/
# Deploy to hosting (Vercel, Netlify, etc.)
```

## 📚 Resources

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [MongoDB Manual](https://docs.mongodb.com)
- [Ant Design Components](https://ant.design/components)
- [Tailwind CSS](https://tailwindcss.com)
- [Socket.IO Documentation](https://socket.io/docs)
