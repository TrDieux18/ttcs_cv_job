# 🌟 CV & Job Management System

Hệ thống quản lý CV và tuyển dụng việc làm toàn diện, kết nối ứng viên với nhà tuyển dụng một cách hiệu quả.

## 📋 Giới thiệu

**CV & Job Management System** là một nền tảng tuyển dụng trực tuyến hiện đại, cung cấp giải pháp quản lý CV và việc làm cho ba nhóm đối tượng chính:

- **Ứng viên**: Tìm kiếm việc làm, tạo và quản lý CV, theo dõi trạng thái ứng tuyển
- **Nhà tuyển dụng**: Đăng tin tuyển dụng, quản lý ứng viên, tìm kiếm nhân tài
- **Quản trị viên**: Quản lý toàn bộ hệ thống, người dùng, công ty và nội dung

## ✨ Tính năng chính

### Cho Ứng viên

- 📄 Tạo và quản lý CV trực tuyến
- 🔍 Tìm kiếm việc làm theo nhiều tiêu chí
- 💼 Ứng tuyển công việc nhanh chóng
- ⭐ Lưu công việc yêu thích
- 👁️ Theo dõi công ty
- 🔔 Nhận thông báo về công việc phù hợp

### Cho Nhà tuyển dụng

- 📝 Đăng tin tuyển dụng
- 👥 Quản lý hồ sơ ứng viên
- 📊 Theo dõi trạng thái ứng tuyển
- 🏢 Quản lý thông tin công ty
- 📧 Giao tiếp với ứng viên

### Cho Quản trị viên

- 👨‍💼 Quản lý người dùng và phân quyền
- 🏭 Quản lý công ty
- 📋 Quản lý tin tuyển dụng
- 📰 Quản lý blog/tin tức
- 📊 Báo cáo và thống kê
- 🛡️ Kiểm soát nội dung

## 🏗️ Cấu trúc dự án

Dự án được tổ chức thành 3 phần chính:

### 📁 BE (Backend)

Backend API được xây dựng với Node.js và Express.js

**Công nghệ sử dụng:**

- **Framework**: Express.js 5.x
- **Database**: MongoDB với Mongoose ODM
- **Authentication**: JWT & Cookie-based authentication
- **File Upload**: Multer + Cloudinary
- **Real-time**: Socket.IO
- **Email**: Nodemailer
- **Security**: bcrypt, CORS

**Cấu trúc:**

```
BE/
├── app.js              # Entry point
├── configs/            # Cấu hình database, email, cloudinary
├── controllers/        # Xử lý logic nghiệp vụ
│   ├── admin/         # Controllers cho admin
│   ├── client/        # Controllers cho ứng viên
│   └── company/       # Controllers cho nhà tuyển dụng
├── models/            # MongoDB schemas
├── routes/            # API routes
├── middlewares/       # Authentication, validation, upload
└── helpers/           # Utility functions
```

### 📁 my-app (Frontend)

Giao diện người dùng được xây dựng với React

**Công nghệ sử dụng:**

- **Framework**: React 18.x
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **UI Library**: Ant Design 5.x
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS
- **Charts**: Chart.js, Recharts
- **HTTP Client**: Axios
- **Animation**: Framer Motion
- **PDF Generation**: @react-pdf/renderer, html2pdf.js

**Cấu trúc:**

```
my-app/
├── src/
│   ├── components/    # Reusable components
│   ├── pages/         # Page components
│   ├── routes/        # Route configurations
│   ├── store/         # Redux store
│   ├── services/      # API services
│   ├── helpers/       # Utility functions
│   ├── constants/     # Constants & configs
│   └── types/         # TypeScript types (nếu có)
└── public/            # Static files
```

### 📁 database

Chứa dữ liệu mẫu và backup database

```
database/
├── db.json            # Database mock
└── db_change/         # Collections backup
    ├── blogs.json
    ├── companies.json
    ├── cvs.json
    ├── jobs.json
    ├── roles.json
    └── users.json
```

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống

- Node.js >= 16.x
- MongoDB >= 5.x
- npm hoặc yarn

### 1. Clone repository

```bash
git clone https://github.com/TrDieux18/ttcs_cv_job.git
cd ttcs_cv_job
```

### 2. Cài đặt Backend

```bash
cd BE
npm install
```

Tạo file `.env` trong thư mục `BE`:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ORIGIN_URL=http://localhost:5173

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email
EMAIL_USER=your_email
EMAIL_PASSWORD=your_app_password
```

Chạy backend:

```bash
npm start
```

Backend sẽ chạy tại `http://localhost:8000`

### 3. Cài đặt Frontend

```bash
cd my-app
npm install
```

Tạo file `.env` trong thư mục `my-app`:

```env
VITE_API_URL=http://localhost:8000
```

Chạy frontend:

```bash
npm run dev
```

Frontend sẽ chạy tại `http://localhost:5173`

## 📚 API Documentation

### Authentication

- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất

### Jobs (Client)

- `GET /api/client/jobs` - Danh sách việc làm
- `GET /api/client/jobs/:id` - Chi tiết việc làm
- `POST /api/client/applications` - Ứng tuyển

### Admin

- `GET /api/admin/dashboard` - Dashboard thống kê
- `GET /api/admin/users` - Quản lý người dùng
- `GET /api/admin/companies` - Quản lý công ty
- `GET /api/admin/jobs` - Quản lý việc làm

### Company

- `POST /api/company/jobs` - Đăng tin tuyển dụng
- `GET /api/company/applicants` - Danh sách ứng viên
- `PATCH /api/company/applications/:id` - Cập nhật trạng thái ứng tuyển

## 👥 Phân quyền

Hệ thống hỗ trợ 3 vai trò chính:

- **Admin**: Toàn quyền quản lý hệ thống
- **Company/Recruiter**: Quản lý tin tuyển dụng và ứng viên
- **User/Candidate**: Tìm kiếm việc làm và ứng tuyển

## 🛡️ Bảo mật

- JWT-based authentication
- Password hashing với bcrypt
- CORS protection
- Cookie-based session management
- Role-based access control (RBAC)
- Input validation và sanitization

## 📊 Database Schema

### Các Collection chính:

- **users**: Thông tin người dùng
- **companies**: Thông tin công ty
- **jobs**: Tin tuyển dụng
- **cvs**: CV của ứng viên
- **applications**: Đơn ứng tuyển
- **blogs**: Bài viết/tin tức
- **roles**: Phân quyền
- **notifications**: Thông báo
- **savedJobs**: Việc làm đã lưu
- **followCompany**: Theo dõi công ty

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng:

1. Fork dự án
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit thay đổi (`git commit -m 'Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 License

Dự án này được phát triển cho mục đích học tập và nghiên cứu.

## 📧 Liên hệ

- GitHub: [@TrDieux18](https://github.com/TrDieux18)
- Repository: [ttcs_cv_job](https://github.com/TrDieux18/ttcs_cv_job)

## 🙏 Acknowledgments

- Ant Design Team
- React Community
- Express.js Team
- MongoDB Team

---

**Made with ❤️ by TrDieux18**
