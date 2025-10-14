import { useState, useEffect } from "react";
import { useNavigate } from 'react-router';
import { Input } from 'antd';
import Swal from 'sweetalert2';
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import { PencilIcon, TrashIcon } from "../../icons";

type Role = {
  _id: string;
  role: string;
  name?: string;
  companyName?: string;
  email: string;
  phone: string;
  permissions: string[];
  status: string;
  createdAt: string;
  image?: string;
};

export default function ViewRole() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRole, setFilterRole] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/role/all');
      if (response.ok) {
        const data = await response.json();
        setRoles(data);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Load',
          text: 'Unable to fetch roles from server',
          confirmButtonColor: '#3085d6',
          customClass: { container: 'swal-z-index' },
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Connection Error',
        text: 'Cannot connect to server. Please ensure the server is running',
        confirmButtonColor: '#3085d6',
        customClass: { container: 'swal-z-index' },
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredRoles = roles.filter(role => {
    const matchesRole = filterRole === "all" || role.role === filterRole;
    const matchesSearch = searchTerm === "" || 
      (role.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (role.companyName?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      role.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.phone.includes(searchTerm);
    return matchesRole && matchesSearch;
  });

  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRoles = filteredRoles.slice(startIndex, startIndex + itemsPerPage);

  const getPermissionLabel = (permission: string) => {
    const labels: Record<string, string> = {
      BUS_MANAGE: "Bus Management",
      TOUR_ALLOCATE: "Tour Allocation",
      TOUR_MANAGE: "Tour Management",
      FINANCE: "Finance",
      ROLE_MANAGE: "Role Management",
    };
    return labels[permission] || permission;
  };

  const handleEdit = (id: string) => {
    navigate(`/role/edit/${id}`);
  };

  const handleStatusChange = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const result = await Swal.fire({
      title: 'Change Status?',
      text: `Are you sure you want to change status to ${newStatus}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'Cancel',
      customClass: { container: 'swal-z-index' },
    });

    if (result.isConfirmed) {
      try {
        console.log('Updating status for ID:', id, 'to:', newStatus);
        const response = await fetch(`http://localhost:5000/api/role/${id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        });
        
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);
        
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Status Updated!',
            text: `Status changed to ${newStatus}`,
            confirmButtonColor: '#3085d6',
            customClass: { container: 'swal-z-index' },
          });
          fetchRoles();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: data.message || 'Unable to update status',
            confirmButtonColor: '#3085d6',
            customClass: { container: 'swal-z-index' },
          });
        }
      } catch (error) {
        console.error('Status update error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update status',
          confirmButtonColor: '#3085d6',
          customClass: { container: 'swal-z-index' },
        });
      }
    }
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass: { container: 'swal-z-index' },
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/role/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Role has been removed from the system',
            confirmButtonColor: '#3085d6',
            customClass: { container: 'swal-z-index' },
          });
          fetchRoles();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Delete Failed',
            text: 'Unable to delete role',
            confirmButtonColor: '#3085d6',
            customClass: { container: 'swal-z-index' },
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete role',
          confirmButtonColor: '#3085d6',
          customClass: { container: 'swal-z-index' },
        });
      }
    }
  };

  return (
    <div>
      <PageMeta
        title="View Roles | Role Management"
        description="View and manage all roles"
      />
      <PageBreadcrumb pageTitle="View Roles" />
      
      <ComponentCard title="Role Management">
        <div className="mb-6 flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[250px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Search
            </label>
            <Input
              placeholder="Search by name, email, or phone"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              allowClear
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Filter by Role
            </label>
            <select
              value={filterRole}
              onChange={(e) => { setFilterRole(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="all">All Roles</option>
              <option value="driver">Driver</option>
              <option value="supplier">Supplier</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="guide">Guide</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">Loading roles...</p>
          </div>
        ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Profile
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
                  Update Status
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
              {paginatedRoles.map((role) => {
                const displayName = role.companyName || role.name || 'N/A';
                const imageUrl = role.image ? `http://localhost:5000/uploads/${role.image}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=3B82F6&color=fff`;
                return (
                <tr key={role._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <img
                          className="h-12 w-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                          src={imageUrl}
                          alt={displayName}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {displayName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            {role.role.charAt(0).toUpperCase() + role.role.slice(1)}
                          </span>
                        </div>
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
                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      role.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {role.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleStatusChange(role._id, role.status)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-light bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition-colors duration-200" style={{color:"white"}}
                    >
                      Change Status
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(role.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(role._id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        title="Edit Role"
                     style={{color:"white"}}   >
                        <PencilIcon className="w-3 h-3 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(role._id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                        title="Delete Role" style={{color:"white"}}
                      >
                        <TrashIcon className="w-3 h-3 mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
        )}

        {!loading && filteredRoles.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No roles found matching the selected filters.</p>
          </div>
        )}

        {!loading && filteredRoles.length > 0 && (
          <div className="mt-6 flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredRoles.length)} of {filteredRoles.length} results
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </ComponentCard>
    </div>
  );
}