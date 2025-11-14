export const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffHours < 24) return `Đăng ${diffHours} giờ trước`;
  if (diffDays < 7) return `Đăng ${diffDays} ngày trước`;
  return `Đăng ${Math.floor(diffDays / 7)} tuần trước`;
};
