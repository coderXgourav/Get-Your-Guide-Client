import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import { PencilIcon, TrashBinIcon, UserCircleIcon } from "../../icons";

interface Driver {
  id: number;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  experience: number;
  bloodGroup: string;
  status: "Active" | "Inactive";
  image?: string;
}

// Mock data
const mockDrivers: Driver[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    licenseNumber: "DL123456789",
    experience: 5,
    bloodGroup: "O+",
    status: "Active",
    image: "/images/user/user-01.png"
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 987-6543",
    licenseNumber: "DL987654321",
    experience: 8,
    bloodGroup: "A+",
    status: "Active"
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike.wilson@example.com",
    phone: "+1 (555) 456-7890",
    licenseNumber: "DL456789123",
    experience: 3,
    bloodGroup: "B+",
    status: "Inactive"
  }
];

export default function ViewDriver() {
  const [drivers, setDrivers] = useState<Driver[]>(mockDrivers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" }
  ];

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "" || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (id: number) => {
    console.log("Edit driver:", id);
    // Navigate to edit page or open modal
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this driver?")) {
      setDrivers(prev => prev.filter(driver => driver.id !== id));
    }
  };

  return (
    <div>
      <PageMeta
        title="View Drivers | Driver Management"
        description="View and manage all drivers"
      />
      <PageBreadcrumb pageTitle="View Drivers" />
      
      <ComponentCard title="Driver List">
        {/* Search and Filter */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="w-full sm:w-64">
              <Input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                options={statusOptions}
                placeholder="Filter by status"
                onChange={setStatusFilter}
                className="dark:bg-gray-900"
              />
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {filteredDrivers.length} driver(s) found
          </div>
        </div>

        {/* Drivers Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Driver
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  License
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Blood Group
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredDrivers.map((driver) => (
                <tr key={driver.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {driver.image ? (
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={driver.image}
                            alt={driver.name}
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <UserCircleIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {driver.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{driver.email}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{driver.phone}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {driver.licenseNumber}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {driver.experience} years
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {driver.bloodGroup}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        driver.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                          : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                      }`}
                    >
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(driver.id)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded"
                        title="Edit Driver"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(driver.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded"
                        title="Delete Driver"
                      >
                        <TrashBinIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredDrivers.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No drivers found matching your criteria.
            </div>
          )}
        </div>
      </ComponentCard>
    </div>
  );
}