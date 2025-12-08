# API Reference

## 🔌 API Base URLs

```javascript
// Backend API
const BASE_API = process.env.REACT_APP_API_URL || "http://localhost:3000";
```

## 🏢 Company APIs

### Job Management

#### Get My Jobs

```javascript
GET /company/jobs

Query Parameters:
- page: number (default: 1)
- limit: number (default: 10)
- keyword: string (optional)
- jobType: string (optional) - "Full-time", "Part-time", "Contract", "Internship"

Response:
{
  success: true,
  data: [
    {
      _id: string,
      title: string,
      location: string,
      jobType: string,
      salary: string,
      description: string,
      requirements: string,
      benefits: string,
      createdAt: date,
    }
  ],
  total: number
}
```

#### Create Job

```javascript
POST /company/jobs

Body:
{
  title: string,
  location: string,
  jobType: string,
  salary: string,
  description: string,
  requirements: string,
  benefits: string,
}

Response:
{
  success: true,
  data: { /* job object */ }
}
```

#### Update Job

```javascript
PATCH /company/jobs/:id

Body: { /* same as create */ }

Response:
{
  success: true,
  data: { /* updated job */ }
}
```

#### Delete Job

```javascript
DELETE /company/jobs/:id

Response:
{
  success: true,
  message: string
}
```

### Applicant Management

#### Get Applicants for Job

```javascript
GET /company/jobs/:jobId/applicants

Response:
{
  success: true,
  data: [
    {
      _id: string,
      user: {
        _id: string,
        fullName: string,
        email: string,
        phone: string,
      },
      cv: {
        _id: string,
        title: string,
        fileUrl: string,
        // ... other CV fields
      },
      job: string,
      status: "pending" | "reviewed" | "accepted" | "rejected",
      createdAt: date,
    }
  ]
}
```

#### Update Applicant Status

```javascript
PATCH /company/applicants/:id

Body:
{
  status: "pending" | "reviewing" | "reviewed" | "accepted" | "rejected"
}

Response:
{
  success: true,
  data: { /* updated applicant */ }
}

Note: Tự động gửi notification và email khi status thay đổi
```

### Company Profile

#### Get My Company

```javascript
GET /company/profile

Response:
{
  success: true,
  data: {
    _id: string,
    headline: string,
    description: string,
    logo: {
      url: string,
      public_id: string
    },
    website: string,
    location: string,
    size: string,
    companyModel: string,
    industry: string,
    country: string,
    foundedYear: string,
    workTime: string,
    about: string,
  }
}
```

#### Update My Company

```javascript
PATCH /company/profile

Body: FormData {
  headline: string,
  description: string,
  logo: File (optional),
  website: string,
  location: string,
  size: string,
  companyModel: string,
  industry: string,
  country: string,
  foundedYear: string,
  workTime: string,
  about: string,
}

Response:
{
  success: true,
  data: { /* updated company */ }
}
```

## 👤 User APIs

### Authentication

#### Login

```javascript
POST /auth/login

Body:
{
  email: string,
  password: string
}

Response:
{
  success: true,
  data: {
    user: { /* user object */ },
    token: string
  }
}
```

#### Register

```javascript
POST /auth/register

Body:
{
  email: string,
  password: string,
  fullName: string,
  role: "user" | "company"
}

Response:
{
  success: true,
  data: {
    user: { /* user object */ },
    token: string
  }
}
```

#### Logout

```javascript
POST /auth/logout

Response:
{
  success: true,
  message: string
}
```

### User Profile

#### Get User Profile

```javascript
GET /user/profile

Response:
{
  success: true,
  data: {
    _id: string,
    fullName: string,
    email: string,
    phone: string,
    address: string,
    avatar: string,
    role: string,
  }
}
```

#### Update User Profile

```javascript
PATCH /user/update-profile

Body: FormData {
  fullName: string,
  phone: string,
  address: string,
  avatar: File (optional)
}

Response:
{
  success: true,
  data: { /* updated user */ }
}
```

#### Change Password

```javascript
PATCH /user/change-password

Body:
{
  currentPassword: string,
  newPassword: string
}

Response:
{
  success: true,
  message: "Đổi mật khẩu thành công"
}

Error Response:
{
  success: false,
  message: "Mật khẩu hiện tại không đúng"
}
```

## 📄 CV APIs

#### Get User CVs

```javascript
GET /user/cvs

Response:
{
  success: true,
  data: [
    {
      _id: string,
      title: string,
      jobTitle: string,
      about: string,
      workExperience: Array,
      education: Array,
      skills: Array,
      foreignLanguages: Array,
      certificates: Array,
      fileUrl: string,
      createdAt: date,
    }
  ]
}
```

#### Create CV

```javascript
POST /user/cvs

Body: {
  title: string,
  jobTitle: string,
  about: string,
  workExperience: Array,
  education: Array,
  skills: Array,
  foreignLanguages: Array,
  certificates: Array,
  file: File (optional)
}

Response:
{
  success: true,
  data: { /* created CV */ }
}
```

## 💼 Job APIs (Client)

#### Get Jobs

```javascript
GET /jobs

Query Parameters:
- page: number
- limit: number
- keyword: string
- location: string
- jobType: string

Response:
{
  success: true,
  data: [/* jobs */],
  total: number
}
```

#### Get Job Detail

```javascript
GET /jobs/:id

Response:
{
  success: true,
  data: {
    _id: string,
    title: string,
    company: {
      _id: string,
      headline: string,
      logo: string
    },
    // ... other fields
  }
}
```

#### Apply Job

```javascript
POST /jobs/:jobId/apply

Body:
{
  cvId: string
}

Response:
{
  success: true,
  data: { /* application */ }
}
```

## 🔔 Notification APIs

#### Get Notifications

```javascript
GET /user/notifications

Query Parameters:
- page: number
- limit: number
- unreadOnly: boolean

Response:
{
  success: true,
  data: [
    {
      _id: string,
      user: string,
      type: "application_status" | "job_match" | "system",
      title: string,
      message: string,
      job: {
        _id: string,
        title: string
      },
      read: boolean,
      createdAt: date,
    }
  ],
  total: number
}
```

#### Get Unread Count

```javascript
GET /user/notifications/unread-count

Response:
{
  success: true,
  count: number
}
```

#### Mark as Read

```javascript
PATCH /user/notifications/:id/read

Response:
{
  success: true,
  data: { /* updated notification */ }
}
```

#### Mark All as Read

```javascript
PATCH /user/notifications/mark-all-read

Response:
{
  success: true,
  message: string
}
```

#### Delete Notification

```javascript
DELETE /user/notifications/:id

Response:
{
  success: true,
  message: string
}
```

## 🔄 Response Format

### Success Response

```javascript
{
  success: true,
  data: any,
  message: string (optional)
}
```

### Error Response

```javascript
{
  success: false,
  message: string,
  error: string[] (optional - validation errors)
}
```

## 🔐 Authentication

All protected routes require JWT token in header:

```javascript
headers: {
  'Authorization': `Bearer ${token}`
}
```

## 📝 Service Layer Example

```javascript
// UserService.js
import { axiosClient } from "./axiosConfig";
import { ApiResponse } from "@types/response/ApiResponse";

export const getUserProfile = async () => {
  try {
    const response = await axiosClient.get("/user/profile");
    const data = response.data;
    return new ApiResponse(data.success, data.data);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};

export const changePassword = async (passwordData) => {
  try {
    const response = await axiosClient.patch(
      "/user/change-password",
      passwordData
    );
    const data = response.data;
    return new ApiResponse(data.success, data.message);
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return new ApiResponse(false, null, [message]);
  }
};
```

## 🌐 Socket.IO Events

### Client Events

```javascript
// Connect
socket.on("connect", () => {
  console.log("Connected to socket server");
});

// Join room
socket.emit("join", userId);

// Listen for notifications
socket.on("notification", (data) => {
  // Handle new notification
  console.log("New notification:", data);
});
```

### Server Events

```javascript
// Emit to specific user
io.to(`user_${userId}`).emit("notification", notificationData);
```
