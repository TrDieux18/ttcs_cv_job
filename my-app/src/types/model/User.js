export class User {
  constructor({
    _id,
    fullName,
    email,
    username,
    token,
    avatar,
    role,
    isActive,
    createdAt,
    updatedAt,
  }) {
    this._id = _id;
    this.fullName = fullName;
    this.email = email;
    this.username = username;
    this.token = token;
    this.avatar = avatar;
    this.role = role;
    this.isActive = isActive;
    this.createdAt = createdAt ? new Date(createdAt) : null;
    this.updatedAt = updatedAt ? new Date(updatedAt) : null;
  }

  // 🧠 Ví dụ: kiểm tra quyền
  hasPermission(permission) {
    return this.role?.permissions?.includes(permission) || false;
  }
}
