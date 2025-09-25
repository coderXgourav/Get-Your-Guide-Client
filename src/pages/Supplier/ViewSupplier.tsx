import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import { PencilIcon, TrashBinIcon, GroupIcon } from "../../icons";

interface Supplier {
  id: number;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  businessType: string;
  serviceType: string;
  status: "Under Review" | "Approved" | "Rejected";
  registrationDate: string;
}

// Mock data
const mockSuppliers: Supplier[] = [
  {
    id: 1,
    companyName: "ABC Tours & Travels",
    contactPerson: "John Smith",
    email: "john@abctours.com",
    phone: "+1 (555) 123-4567",
    city: "New York",
    state: "NY",
    businessType: "Private Limited",
    serviceType: "Transportation",
    status: "Approved",
    registrationDate: "2024-01-15"
  },
  {
    id: 2,
    companyName: "Mountain View Hotels",
    contactPerson: "Sarah Johnson",
    email: "sarah@mountainview.com",
    phone: "+1 (555) 987-6543",
    city: "Denver",
    state: "CO",
    businessType: "Partnership",
    serviceType: "Accommodation",
    status: "Under Review",
    registrationDate: "2024-01-20"
  },
  {
    id: 3,
    companyName: "City Catering Services",
    contactPerson: "Mike Wilson",
    email: "mike@citycatering.com",
    phone: "+1 (555) 456-7890",
    city: "Chicago",
    state: "IL",
    businessType: "Proprietorship",
    serviceType: "Food & Catering",
    status: "Rejected",
    registrationDate: "2024-01-10"
  }
];

export default function ViewSupplier() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "Under Review", label: "Under Review" },
    { value: "Approved", label: "Approved" },
    { value: "Rejected", label: "Rejected" }
  ];

  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = supplier.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "" || supplier.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (id: number) => {
    console.log("Edit supplier:", id);
    // Navigate to edit page or open modal
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      setSuppliers(prev => prev.filter(supplier => supplier.id !== id));
    }
  };

  const handleStatusChange = (id: number, newStatus: "Approved" | "Rejected") => {
    setSuppliers(prev => 
      prev.map(supplier => 
        supplier.id === id ? { ...supplier, status: newStatus } : supplier
      )
    );
  };

  return (
    <div>
      <PageMeta
        title="View Suppliers | Supplier Management"
        description="View and manage all suppliers"
      />
      <PageBreadcrumb pageTitle="View Suppliers" />
      
      <ComponentCard title="Supplier List">
        {/* Search and Filter */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="w-full sm:w-64">
              <Input
                type="text"
                placeholder="Search by company, contact person, email..."
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
            {filteredSuppliers.length} supplier(s) found
          </div>
        </div>

        {/* Suppliers Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Service Type
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
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <GroupIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {supplier.companyName}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {supplier.businessType}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{supplier.contactPerson}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{supplier.email}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{supplier.phone}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{supplier.city}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{supplier.state}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {supplier.serviceType}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          supplier.status === "Approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                            : supplier.status === "Under Review"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                            : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                        }`}
                      >
                        {supplier.status}
                      </span>
                      {supplier.status === "Under Review" && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleStatusChange(supplier.id, "Approved")}
                            className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(supplier.id, "Rejected")}
                            className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(supplier.id)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded"
                        title="Edit Supplier"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(supplier.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded"
                        title="Delete Supplier"
                      >
                        <TrashBinIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredSuppliers.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No suppliers found matching your criteria.
            </div>
          )}
        </div>
      </ComponentCard>
    </div>
  );
}