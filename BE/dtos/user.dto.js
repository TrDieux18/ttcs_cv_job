export default class UserDTO {
  constructor(user) {
    this._id = user._id.toString();
    this.fullName = user.fullName;
    this.username = user.username;
    this.email = user.email;
    this.avatar = user.avatar;
    this.isActive = user.isActive;
    this.role = user.role_id
      ? {
          _id: user.role_id._id,
          title: user.role_id.title,
          permissions: user.role_id.permissions,
        }
      : "";
  }
}

export class UserDetailDTO extends UserDTO {
  constructor(user) {
    super(user);
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deleted = user.deleted;
    this.token = user.token;
    this.password = user.password;
  }
}

export class UserProfileDTO extends UserDTO {
  constructor(user) {
    super(user);
    this.avatar = user.avatar;
    this.phoneNumber = user.phoneNumber;
    this.address = user.address;
    this.role = user.role_id;
  }
}
