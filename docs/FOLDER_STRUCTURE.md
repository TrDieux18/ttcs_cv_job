# Folder Structure

## 📁 Project Overview

```
cv-management/
├── BE/                          # Backend (Express.js + MongoDB)
├── my-app/                      # Frontend (React + Vite)
├── database/                    # Database backups & scripts
└── docs/                        # Documentation (this folder)
```

## 🔙 Backend Structure (BE/)

```
BE/
├── app.js                       # Main application entry point
├── package.json                 # Dependencies & scripts
├── .env                         # Environment variables
│
├── configs/                     # Configuration files
│   ├── cloudinary.js           # Cloudinary (file upload)
│   ├── database.js             # MongoDB connection
│   ├── email.js                # Nodemailer with Resend SMTP
│   └── system.js               # System constants
│
├── controllers/                 # Request handlers
│   ├── admin/                  # Admin controllers
│   │   ├── company.controller.js
│   │   ├── cv.controller.js
│   │   ├── job.controller.js
│   │   ├── role.controller.js
│   │   └── user.controller.js
│   │
│   ├── client/                 # Client/User controllers
│   │   ├── application.controller.js
│   │   ├── blog.controller.js
│   │   ├── company.controller.js
│   │   ├── cv.controller.js
│   │   ├── followCompany.controller.js
│   │   ├── job.controller.js
│   │   ├── notification.controller.js
│   │   ├── saveJob.controller.js
│   │   └── user.controller.js
│   │
│   ├── common/                 # Shared controllers
│   │   └── auth.controller.js
│   │
│   └── company/                # Company-specific controllers
│       ├── applicantion.controller.js
│       ├── company.controller.js
│       └── job.controller.js
│
├── models/                      # Mongoose schemas
│   ├── application.model.js
│   ├── blog.model.js
│   ├── company.model.js
│   ├── cv.model.js
│   ├── followCompany.model.js
│   ├── job.model.js
│   ├── notification.model.js
│   ├── role.model.js
│   ├── savedJob.model.js
│   └── user.model.js
│
├── routes/                      # API routes
│   ├── admin/
│   │   ├── index.route.js
│   │   ├── company.route.js
│   │   ├── cv.route.js
│   │   ├── job.route.js
│   │   ├── role.route.js
│   │   └── user.route.js
│   │
│   ├── client/
│   │   ├── index.route.js
│   │   ├── application.route.js
│   │   ├── blog.route.js
│   │   ├── company.route.js
│   │   ├── cv.route.js
│   │   ├── followCompany.route.js
│   │   ├── job.route.js
│   │   ├── notification.route.js
│   │   ├── saveJob.route.js
│   │   └── user.route.js
│   │
│   ├── common/
│   │   ├── index.route.js
│   │   └── auth.route.js
│   │
│   └── company/
│       ├── index.route.js
│       ├── applicantion.route.js
│       ├── company.route.js
│       └── job.route.js
│
├── middlewares/                 # Express middlewares
│   └── admin/
│       ├── auth.middleware.js
│       ├── checkPermission.middleware.js
│       ├── generateSlug.middleware.js
│       └── uploadCloudinary.middleware.js
│
├── helpers/                     # Utility functions
│   ├── buildUpdateProfileData.js
│   ├── capitalizeFirstLetter.js
│   ├── formatName.js
│   ├── normalizeLocation.js
│   ├── queryFilter.js
│   ├── safeJsonParse.js
│   └── upload.js
│
├── dtos/                        # Data Transfer Objects
│   └── user.dto.js
│
├── enums/                       # Enumerations
│   ├── permissons.enum.js
│   └── roles.enum.js
│
├── validate/                    # Validation schemas
│   └── test.validate.js
│
├── public/                      # Static files
│   └── images/
│
└── uploads/                     # Uploaded files
```

## 🎨 Frontend Structure (my-app/)

```
my-app/
├── index.html                   # HTML entry point
├── package.json                 # Dependencies & scripts
├── vite.config.js              # Vite configuration
├── .gitignore
│
├── public/                      # Static assets
│   ├── manifest.json
│   └── robots.txt
│
└── src/
    ├── index.jsx               # React entry point
    ├── App.jsx                 # Main App component
    ├── index.css               # Global styles
    ├── App.css
    │
    ├── assets/                 # Images, fonts, etc.
    │   ├── css/
    │   │   ├── base.css
    │   │   └── reset.css
    │   └── image/
    │
    ├── components/             # Shared components
    │   ├── AllRoute/
    │   │   └── index.jsx
    │   │
    │   ├── guard/              # Route guards
    │   │   ├── ComponentGuard.jsx
    │   │   ├── ProtectedRoute.jsx
    │   │   ├── PublicRoute.jsx
    │   │   └── RouteGuard.jsx
    │   │
    │   ├── layout/             # Layout components
    │   │   ├── AdminLayout.jsx
    │   │   ├── AuthAdminLayout.jsx
    │   │   ├── CompanyLayout.jsx
    │   │   ├── index.jsx
    │   │   └── LayoutDefault.scss
    │   │
    │   ├── NotificationBell/   # Notification dropdown
    │   │   └── index.jsx
    │   │
    │   └── PrivateRoute/
    │       └── index.jsx
    │
    ├── constants/              # Constants & enums
    │   └── enums/
    │       ├── PermissionEnum.js
    │       └── RoleEnum.js
    │
    ├── helpers/                # Utility functions
    │   ├── cookie.js
    │   ├── createMarkup.js
    │   ├── formatDate.js
    │   ├── formatName.js
    │   ├── getRelavtiveTime.js
    │   ├── htmlListToText.js
    │   ├── parseHTMLList.js
    │   ├── roleHelper.js
    │   ├── socket.js
    │   └── toHtmlList.js
    │
    ├── pages/                  # Page components
    │   ├── admin/              # Admin pages
    │   │   ├── Company/
    │   │   ├── CV/
    │   │   ├── Dashboard/
    │   │   ├── Job/
    │   │   ├── Login/
    │   │   ├── Role/
    │   │   └── User/
    │   │
    │   ├── client/             # Client/User pages
    │   │   ├── About/
    │   │   ├── Blogs/
    │   │   ├── Companies/
    │   │   ├── CV/
    │   │   ├── Dashboard/
    │   │   │   ├── index.jsx
    │   │   │   └── components/
    │   │   │       ├── Profile.jsx
    │   │   │       ├── Setting.jsx
    │   │   │       ├── Notificantion.jsx
    │   │   │       └── ...
    │   │   ├── Home/
    │   │   ├── Jobs/
    │   │   ├── Login/
    │   │   ├── Register/
    │   │   └── Templates/
    │   │
    │   ├── common/             # Common pages
    │   │   └── Logout/
    │   │
    │   └── company/            # Company pages
    │       ├── MyCompany/
    │       │   └── index.jsx
    │       │
    │       └── MyJobs/
    │           ├── index.jsx
    │           ├── CVManagementPage.jsx
    │           ├── RecruitmentReportsPage.jsx
    │           └── components/
    │               ├── CVPreviewModal.jsx
    │               └── MyJobForm.jsx
    │
    ├── routes/                 # Route definitions
    │   ├── index.jsx
    │   ├── AdminRoute.jsx
    │   ├── ClientRoute.jsx
    │   └── CompanyRoute.jsx
    │
    ├── services/               # API services
    │   ├── admin/
    │   │   ├── CompanyService.js
    │   │   ├── CvService.js
    │   │   ├── JobService.js
    │   │   ├── RoleService.js
    │   │   └── UserService.js
    │   │
    │   ├── client/
    │   │   ├── ApplicationService.js
    │   │   ├── BlogService.js
    │   │   ├── CompanyService.js
    │   │   ├── CvService.js
    │   │   ├── FollowCompanyService.js
    │   │   ├── JobsService.js
    │   │   ├── NotificationService.js
    │   │   ├── SaveJobService.js
    │   │   └── UserService.js
    │   │
    │   ├── common/
    │   │   └── AuthService.js
    │   │
    │   └── company/
    │       ├── ApplicantService.js
    │       ├── CompanyService.js
    │       └── JobService.js
    │
    ├── store/                  # Redux store
    │   ├── index.js
    │   ├── AppliedReducer.js
    │   ├── FollowCompanyReducer.js
    │   ├── SavedJobReducer.js
    │   └── UserReducer.js
    │
    └── types/                  # TypeScript/JSDoc types
        ├── api.js
        ├── request/
        │   └── LoginRequest.js
        └── response/
            └── ApiResponse.js
```

## 📚 Documentation Structure (docs/)

```
docs/
├── DESIGN_SYSTEM.md            # Design tokens, colors, typography
├── COMPONENT_LIBRARY.md        # Reusable components
├── API_REFERENCE.md            # API endpoints documentation
├── FOLDER_STRUCTURE.md         # This file
└── DEVELOPMENT_GUIDE.md        # Setup & development workflow
```

## 🗄️ Database Structure (database/)

```
database/
├── package.json
├── db.json                     # JSON Server data
└── db_change/                  # MongoDB exports
    ├── cv-management.blogs.json
    ├── cv-management.companies.json
    ├── cv-management.cvs.json
    ├── cv-management.jobs.json
    ├── cv-management.roles.json
    └── cv-management.users.json
```

## 📝 Key File Locations

### Authentication

- Backend: `BE/controllers/common/auth.controller.js`
- Frontend: `my-app/src/services/common/AuthService.js`
- Middleware: `BE/middlewares/admin/auth.middleware.js`

### User Management

- Model: `BE/models/user.model.js`
- Controller: `BE/controllers/client/user.controller.js`
- Service: `my-app/src/services/client/UserService.js`
- Pages: `my-app/src/pages/client/Dashboard/`

### Company Management

- Model: `BE/models/company.model.js`
- Controller: `BE/controllers/company/company.controller.js`
- Service: `my-app/src/services/company/CompanyService.js`
- Pages: `my-app/src/pages/company/MyCompany/`

### Job Management

- Model: `BE/models/job.model.js`
- Controller: `BE/controllers/company/job.controller.js`
- Service: `my-app/src/services/company/JobService.js`
- Pages: `my-app/src/pages/company/MyJobs/`

### Notification System

- Model: `BE/models/notification.model.js`
- Controller: `BE/controllers/client/notification.controller.js`
- Service: `my-app/src/services/client/NotificationService.js`
- Component: `my-app/src/components/NotificationBell/`
- Socket: `my-app/src/helpers/socket.js`

### Email Service

- Config: `BE/configs/email.js`
- Uses: Resend SMTP with Nodemailer
- Templates: HTML email templates in email.js

## 🔄 Data Flow

### Request Flow

```
Client Component
    ↓
Service Layer (API call)
    ↓
Backend Route
    ↓
Middleware (auth, validation)
    ↓
Controller
    ↓
Model/Database
    ↓
Response back up the chain
```

### State Management

```
Redux Store
    ↓
Actions/Reducers
    ↓
Components (connect/useSelector)
```

## 🎯 Naming Conventions

### Files

- Components: PascalCase (e.g., `MyCompany.jsx`)
- Services: PascalCase with suffix (e.g., `UserService.js`)
- Controllers: camelCase with suffix (e.g., `user.controller.js`)
- Models: camelCase with suffix (e.g., `user.model.js`)
- Routes: camelCase with suffix (e.g., `user.route.js`)

### Folders

- lowercase or camelCase
- Descriptive names (e.g., `components/`, `services/`)

### Variables & Functions

- camelCase for all
- Handlers: `handle` prefix (e.g., `handleSubmit`)
- API calls: descriptive verbs (e.g., `getUserProfile`, `updateJob`)
