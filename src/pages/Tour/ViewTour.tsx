import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import { PencilIcon, TrashBinIcon, CalenderIcon } from "../../icons";

interface Tour {
  id: number;
  title: string;
  category: string;
  locations: string[];
  duration: string;
  price: number;
  status: "Draft" | "Under Review" | "Published" | "Rejected";
  createdDate: string;
  photos: number;
  options: number;
}

// Mock data
const mockTours: Tour[] = [
  {
    id: 1,
    title: "Amazing City Walking Tour",
    category: "Tour",
    locations: ["Downtown", "Historic District", "Central Park"],
    duration: "3 hours",
    price: 45,
    status: "Published",
    createdDate: "2024-01-15",
    photos: 8,
    options: 2
  },
  {
    id: 2,
    title: "Museum Entry Ticket",
    category: "Entry ticket",
    locations: ["Art Museum"],
    duration: "Valid for 1 day",
    price: 25,
    status: "Under Review",
    createdDate: "2024-01-20",
    photos: 5,
    options: 1
  },
  {
    id: 3,
    title: "City Transport Pass",
    category: "City card",
    locations: ["Citywide"],
    duration: "24 hours",
    price: 15,
    status: "Draft",
    createdDate: "2024-01-22",
    photos: 3,
    options: 3
  },
  {
    id: 4,
    title: "Cooking Class Experience",
    category: "Other",
    locations: ["Culinary School"],
    duration: "2 hours",
    price: 75,
    status: "Rejected",
    createdDate: "2024-01-18",
    photos: 6,
    options: 1
  }
];

export default function ViewTour() {
  const [tours, setTours] = useState<Tour[]>(mockTours);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "Draft", label: "Draft" },
    { value: "Under Review", label: "Under Review" },
    { value: "Published", label: "Published" },
    { value: "Rejected", label: "Rejected" }
  ];

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "Tour", label: "Tour" },
    { value: "Entry ticket", label: "Entry ticket" },
    { value: "City card", label: "City card" },
    { value: "Hop-on hop-off", label: "Hop-on hop-off" },
    { value: "Transport", label: "Transport experience" },
    { value: "Rental", label: "Rental experience" },
    { value: "Other", label: "Other" }
  ];

  const filteredTours = tours.filter(tour => {
    const matchesSearch = tour.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tour.locations.some(loc => loc.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "" || tour.status === statusFilter;
    const matchesCategory = categoryFilter === "" || tour.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleEdit = (id: number) => {
    console.log("Edit tour:", id);
    // Navigate to edit page
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this tour?")) {
      setTours(prev => prev.filter(tour => tour.id !== id));
    }
  };

  const handleStatusChange = (id: number, newStatus: "Published" | "Rejected") => {
    setTours(prev => 
      prev.map(tour => 
        tour.id === id ? { ...tour, status: newStatus } : tour
      )
    );
  };

  return (
    <div>
      <PageMeta
        title="View Tours | Tour Management"
        description="View and manage all tours"
      />
      <PageBreadcrumb pageTitle="View Tours" />
      
      <ComponentCard title="Tour List">
        {/* Search and Filter */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="w-full sm:w-64">
              <Input
                type="text"
                placeholder="Search by title or location..."
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
            <div className="w-full sm:w-48">
              <Select
                options={categoryOptions}
                placeholder="Filter by category"
                onChange={setCategoryFilter}
                className="dark:bg-gray-900"
              />
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {filteredTours.length} tour(s) found
          </div>
        </div>

        {/* Tours Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Tour
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Locations
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
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
              {filteredTours.map((tour) => (
                <tr key={tour.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <CalenderIcon className="h-6 w-6 text-gray-400" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {tour.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {tour.photos} photos • {tour.options} options
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {tour.category}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {tour.locations.slice(0, 2).join(", ")}
                      {tour.locations.length > 2 && ` +${tour.locations.length - 2} more`}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {tour.duration}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${tour.price}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-2">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          tour.status === "Published"
                            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                            : tour.status === "Under Review"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                            : tour.status === "Draft"
                            ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                            : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"
                        }`}
                      >
                        {tour.status}
                      </span>
                      {tour.status === "Under Review" && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleStatusChange(tour.id, "Published")}
                            className="px-2 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Publish
                          </button>
                          <button
                            onClick={() => handleStatusChange(tour.id, "Rejected")}
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
                        onClick={() => handleEdit(tour.id)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 p-1 rounded"
                        title="Edit Tour"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(tour.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 p-1 rounded"
                        title="Delete Tour"
                      >
                        <TrashBinIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredTours.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No tours found matching your criteria.
            </div>
          )}
        </div>
      </ComponentCard>
    </div>
  );
}