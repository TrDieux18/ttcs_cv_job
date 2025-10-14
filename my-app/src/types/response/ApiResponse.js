
export class ApiResponse {
  constructor(success, data = null, errors = [], message = "") {
    this.success = success;
    this.data = data;
    this.errors = errors;
    this.message = message;
  }
}


export class BulkUpdateResponse {
  constructor(
    acknowledged,
    matchedCount = 0,
    modifiedCount = 0,
    deletedCount = 0
  ) {
    this.acknowledged = acknowledged;
    this.matchedCount = matchedCount;
    this.modifiedCount = modifiedCount;
    this.deletedCount = deletedCount;
  }
}
