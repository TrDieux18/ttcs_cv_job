import { Button, message, Spin, Card } from "antd";
import React, { useEffect, useState } from "react";
import { getAllRoles } from "@services/admin/RoleService";
import { SaveOutlined } from "@ant-design/icons";
import { permissionGroup } from "@constants/enums/PermissionEnum";
import { updateRolePermissions } from "@services/admin/RoleService";

const RolePermission = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [selected, setSelected] = useState({});

  const permissionGroups = permissionGroup;

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      try {
        const response = await getAllRoles();
        if (response.success && response.data) {
          setRoles(response.data);

          const init = {};
          response.data.forEach((role) => {
            init[role._id] = Array.isArray(role.permissions)
              ? role.permissions
              : [];
          });

          setSelected(init);
        } else {
          message.error("Lỗi khi tải vai trò");
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
        message.error("Lỗi khi tải vai trò");
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const hanleSelectAll = (roleId, permissions, checked) => {
    setSelected((prev) => {
      const current = prev[roleId] || [];

      const updated = checked
        ? Array.from(new Set([...current, ...permissions]))
        : current.filter((p) => !permissions.includes(p));

      return {
        ...prev,
        [roleId]: updated,
      };
    });
  };

  const handlePermissionChange = (roleId, permission, checked) => {
    setSelected((prev) => {
      const current = prev[roleId] || [];

      const updated = checked
        ? [...current, permission]
        : current.filter((p) => p !== permission);

      return {
        ...prev,
        [roleId]: updated,
      };
    });
  };

  const hanldeUpdatePermissions = async () => {
    const payload = Object.entries(selected).map(([_id, permissions]) => ({
      _id,
      permissions,
    }));

    setUpdating(true);

    let responses;

    try {
      responses = await updateRolePermissions(payload);
    } catch (error) {
      console.error("Error updating permissions:", error);
      responses = { success: false };
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setUpdating(false);

      if (responses?.success) {
        message.success("Cập nhật quyền thành công");
      } else {
        message.error("Cập nhật quyền thất bại");
      }
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <div className="max-w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Phân quyền vai trò
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Quản lý quyền truy cập cho từng vai trò trong hệ thống
            </p>
          </div>
          <Button
            type="primary"
            size="large"
            icon={<SaveOutlined />}
            onClick={hanldeUpdatePermissions}
            loading={updating}
            disabled={loading || updating}
          >
            Lưu thay đổi
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" />
          </div>
        ) : (
          <Card className="shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 w-1/3">
                      Quyền
                    </th>
                    {roles.length > 0 &&
                      roles.map((role) => (
                        <th
                          key={role._id}
                          className="px-6 py-4 text-center font-semibold text-gray-900"
                        >
                          {role.title}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {permissionGroups.map((group, gi) => (
                    <React.Fragment key={gi}>
                      {/* Spacing between groups */}
                      {gi > 0 && (
                        <tr>
                          <td
                            colSpan={roles.length + 1}
                            className="h-4 bg-gray-50"
                          ></td>
                        </tr>
                      )}

                      {/* Group header with "Select All" */}
                      <tr className="bg-blue-50 border-y border-blue-100">
                        <td className="px-6 py-3 font-semibold text-gray-900">
                          {group.title}
                        </td>
                        {roles.map((role) => {
                          const perms = group.permissions.map((p) => p.name);
                          const allChecked = perms.every((p) =>
                            selected[role._id]?.includes(p)
                          );

                          return (
                            <td
                              key={role._id}
                              className="px-6 py-3 text-center"
                            >
                              <input
                                type="checkbox"
                                className="w-4 h-4 accent-blue-600 cursor-pointer"
                                checked={allChecked}
                                onChange={(e) =>
                                  hanleSelectAll(
                                    role._id,
                                    perms,
                                    e.target.checked
                                  )
                                }
                              />
                            </td>
                          );
                        })}
                      </tr>

                      {/* Individual permissions */}
                      {group.permissions.map((perms, pi) => (
                        <tr
                          key={perms.name}
                          className="border-b border-gray-100 hover:bg-gray-50 transition"
                        >
                          <td className="px-6 py-3 text-gray-700">
                            {perms.label}
                          </td>
                          {roles.map((role) => (
                            <td
                              className="px-6 py-3 text-center"
                              key={role._id}
                            >
                              <input
                                type="checkbox"
                                className="w-4 h-4 accent-blue-600 cursor-pointer"
                                checked={selected[role._id]?.includes(
                                  perms.name
                                )}
                                onChange={(e) =>
                                  handlePermissionChange(
                                    role._id,
                                    perms.name,
                                    e.target.checked
                                  )
                                }
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RolePermission;
