import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { PencilIcon, TrashIcon } from "../../icons";

type Role = {
  id: string;
  type: "driver" | "supplier";
  name: string;
  email: string;
  phone: string;
  permissions: string[];
  createdAt: string;
  status: "active" | "inactive";
};

export default function ViewRole() {
  const [roles] = useState<Role[]>([
    {
      id: "1",
      type: "driver",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      permissions: ["BUS_MANAGE", "TOUR_ALLOCATE"],
      createdAt: "2024-01-15",
      status: "active",
    },
    {
      id: "2",
      type: "supplier",
      name: "ABC Transport Co.",
      email: "contact@abctransport.com",
      phone: "+1 (555) 987-6543",
      permissions: ["TOUR_MANAGE", "FINANCE"],
      createdAt: "2024-01-10",
      status: "active",
    },
    {
      id: "3",
      type: "driver",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+1 (555) 456-7890",
      permissions: ["TOUR_ALLOCATE"],
      createdAt: "2024-01-08",
      status: "inactive",
    },
  ]);

  const [filterRole, setFilterRole] = useState<"all" | "driver" | "supplier">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");

  const filteredRoles = roles.filter(role => {
    const roleMatch = filterRole === "all" || role.type === filterRole;
    const statusMatch = filterStatus === "all" || role.status === filterStatus;
    return roleMatch && statusMatch;
  });

  const getPermissionLabel = (permission: string) => {
    const labels: Record<string, string> = {
      BUS_MANAGE: "Bus Management",
      TOUR_ALLOCATE: "Tour Allocation",
      TOUR_MANAGE: "Tour Management",
      FINANCE: "Finance",
    };
    return labels[permission] || permission;
  };

  const handleEdit = (id: string) => {
    console.log("Edit role:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete role:", id);
  };

  const handleStatusToggle = (id: string) => {
    console.log("Toggle status for role:", id);
  };

  return (
    <div>
      <PageMeta
        title="View Roles | Role Management"
        description="View and manage all roles"
      />
      <PageBreadcrumb pageTitle="View Roles" />
      
      <ComponentCard title="Role Management">
        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Filter by Role
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as "all" | "driver" | "supplier")}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="all">All Roles</option>
              <option value="driver">Driver</option>
              <option value="supplier">Supplier</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "inactive")}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Roles Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Permissions
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredRoles.map((role) => (
                <tr key={role.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {role.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          role.type === "driver" 
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}>
                          {role.type.charAt(0).toUpperCase() + role.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-gray-100">{role.email}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{role.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((permission) => (
                        <span
                          key={permission}
                          className="inline-flex px-2 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        >
                          {getPermissionLabel(permission)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleStatusToggle(role.id)}
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer ${
                        role.status === "active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {role.status.charAt(0).toUpperCase() + role.status.slice(1)}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(role.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(role.id)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        title="Edit Role"
                      >
                        <PencilIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(role.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        title="Delete Role"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRoles.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No roles found matching the selected filters.</p>
          </div>
        )}
      </ComponentCard>
    </div>
  );
}