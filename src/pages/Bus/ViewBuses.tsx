import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import { PencilIcon, TrashBinIcon, BoxIcon } from "../../icons";

interface Bus {
  id: number;
  busNumber: string;
  manufacturer: string;
  model: string;
  year: number;
  capacity: number;
  fuelType: string;
  status: "Active" | "Maintenance" | "Inactive";
  image?: string;
}

// Mock data
const mockBuses: Bus[] = [
  {
    id: 1,
    busNumber: "BUS-001",
    manufacturer: "Tata Motors",
    model: "Starbus Ultra",
    year: 2023,
    capacity: 45,
    fuelType: "Diesel",
    status: "Active",
    image: "/images/product/product-01.png"
  },
  {
    id: 2,
    busNumber: "BUS-002",
    manufacturer: "Ashok Leyland",
    model: "Viking",
    year: 2022,
    capacity: 52,
    fuelType: "CNG",
    status: "Active"
  },
  {
    id: 3,
    busNumber: "BUS-003",
    manufacturer: "Mahindra",
    model: "Tourister",
    year: 2021,
    capacity: 35,
    fuelType: "Diesel",
    status: "Maintenance"
  }
];

export default function ViewBuses() {
  const [buses, setBuses] = useState<Bus[]>(mockBuses);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "Active", label: "Active" },
    { value: "Maintenance", label: "Maintenance" },
    { value: "Inactive", label: "Inactive" }
  ];

  const filteredBuses = buses.filter(bus => {
    const matchesSearch = bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "" || bus.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (id: number) => {
    console.log("Edit bus:", id);
    // Navigate to edit page or open modal
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      setBuses(prev => prev.filter(bus => bus.id !== id));
    }
  };

  return (
    <div>
      <PageMeta
        title="View Buses | Get Your Guide Admin"
        description="View and manage all buses"
      />
      <PageBreadcrumb pageTitle="View Buses" />
      
      <ComponentCard title="Bus Fleet">
        {/* Search and Filter */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="w-full sm:w-64">
              <Input
                type="text"
                placeholder="Search by bus number, manufacturer, model..."
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
            {filteredBuses.length} bus(es) found
          </div>
        </div>

        {/* Buses Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Bus
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Fuel Type
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
              {filteredBuses.map((bus) => (
                <tr key={bus.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-16">
                        {bus.image ? (
                          <img
                            className="h-12 w-16 rounded object-cover"
                            src={bus.image}
                            alt={bus.busNumber}
                          />
                        ) : (
                          <div className="h-12 w-16 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <BoxIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {bus.busNumber}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{bus.manufacturer}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{bus.model} ({bus.year})</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {bus.capacity} seats
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {bus.fuelType}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        bus.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                          : bus.status === "Maintenance"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                          : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                      }`}
                    >
                      {bus.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(bus.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        title="Edit Bus"
                      >
                        <PencilIcon className="w-3 h-3 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(bus.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                        title="Delete Bus"
                      >
                        <TrashBinIcon className="w-3 h-3 mr-1" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredBuses.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No buses found matching your criteria.
            </div>
          )}
        </div>
      </ComponentCard>
    </div>
  );
}