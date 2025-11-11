import { Button, message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { getAllRoles } from "@services/admin/RoleService";

import { permissionGroup } from "@constants/enums/PermissionEnum";
import { updateRolePermissions } from "@services/admin/RoleService";

const styleButton = {
  border: "none",
  padding: "8px 10px",
  backgroundColor: "#3875F6",
  color: "#fff",
  fontSize: "15px",
};
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
    <div className="overflow-x-auto space-y-4 p-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Phân quyền vai trò</h2>
        <Button
          style={styleButton}
          onClick={hanldeUpdatePermissions}
          loading={updating}
          disabled={loading || updating}
        >
          Cập nhật
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center  py-10">
          <Spin className="w-full h-full"></Spin>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <table className="w-full text-sm text-gray-900">
            <thead className=" bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-5 py-3 text-left font-semibold w-1/3">
                  Vai trò
                </th>
                {roles.length > 0 &&
                  roles.map((role) => (
                    <th
                      key={role._id}
                      className="px-5 py-3 text-left font-semibold"
                    >
                      <div className="flex justify-center items-center">
                        <span>{role.title}</span>
                      </div>
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {permissionGroups.map((group, gi) => (
                <React.Fragment key={gi}>
                  {gi > 0 && (
                    <tr>
                      <td colSpan={roles.length + 1} className="h-8"></td>
                    </tr>
                  )}

                  <tr className="bg-gray-100 font-semibold">
                    <td className="px-5 py-2">{group.title}</td>
                    {roles.map((role) => {
                      const perms = group.permissions.map((p) => p.name);
                      const allChecked = perms.every((p) =>
                        selected[role._id]?.includes(p)
                      );

                      return (
                        <td key={role._id} className="px-5 py-2 text-center">
                          <input
                            type="checkbox"
                            className="w-4 h-4 accent-blue-500"
                            checked={allChecked}
                            onChange={(e) =>
                              hanleSelectAll(role._id, perms, e.target.checked)
                            }
                          />
                        </td>
                      );
                    })}
                  </tr>

                  {group.permissions.map((perms, pi) => (
                    <tr
                      key={perms.name}
                      className={`border-b border-gray-200 hover:bg-gray-50 ${
                        pi % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-5 py-2">{perms.label}</td>
                      {roles.map((role) => (
                        <td className="px-5 py-2 text-center" key={role._id}>
                          <input
                            type="checkbox"
                            className="w-4 h-4 accent-blue-500"
                            checked={selected[role._id]?.includes(perms.name)}
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
      )}
    </div>
  );
};

export default RolePermission;
