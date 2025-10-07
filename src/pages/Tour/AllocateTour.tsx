import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import { UserCircleIcon, CalenderIcon } from "../../icons";

interface Driver {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  status: "Active" | "Inactive";
  image?: string;
}

interface Tour {
  id: number;
  title: string;
  category: string;
  status: string;
}

const mockDrivers: Driver[] = [
  { id: 1, name: "John Smith", email: "john.smith@example.com", phone: "+1 (555) 123-4567", status: "Active", image: "/images/user/user-01.png" },
  { id: 2, name: "Sarah Johnson", email: "sarah.johnson@example.com", phone: "+1 (555) 987-6543", status: "Active" },
  { id: 3, name: "Mike Wilson", email: "mike.wilson@example.com", phone: "+1 (555) 456-7890", status: "Inactive" }
];

const mockTours: Tour[] = [
  { id: 101, title: "Amazing City Walking Tour", category: "Tour", status: "Published" },
  { id: 102, title: "Museum Entry Ticket", category: "Entry ticket", status: "Published" },
  { id: 103, title: "City Transport Pass", category: "City card", status: "Draft" },
  { id: 104, title: "Cooking Class Experience", category: "Other", status: "Published" }
];

export default function AllocateTour() {
  const [drivers] = useState<Driver[]>(mockDrivers);
  const [tours] = useState<Tour[]>(mockTours);

  const [searchDriver, setSearchDriver] = useState("");

  const [searchTour, setSearchTour] = useState("");
  const [tourCategory, setTourCategory] = useState("");

  // Single driver selection (only one driver can be assigned)
  const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
  const [selectedTours, setSelectedTours] = useState<number[]>([]);

  const tourCategoryOptions = [
    { value: "", label: "All Categories" },
    { value: "Tour", label: "Tour" },
    { value: "Entry ticket", label: "Entry ticket" },
    { value: "City card", label: "City card" },
    { value: "Other", label: "Other" }
  ];

  // Only show active drivers (per requirement)
  const filteredDrivers = drivers.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchDriver.toLowerCase());
    return matchesSearch && d.status === "Active";
  });

  // Only show published tours
  const filteredTours = tours.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTour.toLowerCase());
    const matchesCategory = tourCategory === "" || t.category === tourCategory;
    return matchesSearch && matchesCategory && t.status === "Published";
  });

  const toggleDriver = (id: number) => {
    // Single selection - select or deselect
    setSelectedDriver(prev => (prev === id ? null : id));
  };

  const toggleTour = (id: number) => {
    setSelectedTours(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleAllocate = () => {
    if (!selectedDriver) {
      alert("Please select one driver to allocate the selected tour(s) to.");
      return;
    }
    if (selectedTours.length === 0) {
      alert("Please select at least one tour to allocate.");
      return;
    }

    const driverName = drivers.find(d => d.id === selectedDriver)?.name ?? "(unknown)";
    const tourTitles = tours.filter(t => selectedTours.includes(t.id)).map(t => t.title).join(", ");
    if (window.confirm(`Allocate ${tourTitles} to ${driverName}?`)) {
      // Simulate allocation
      alert("Allocation successful (dummy)");
      setSelectedDriver(null);
      setSelectedTours([]);
    }
  };

  return (
    <div>
      <PageMeta title="Allocate Tours | Tour Allocation" description="Allocate tours to drivers" />
      <PageBreadcrumb pageTitle="Allocate Tours" />

      <ComponentCard title="Tour Allocation">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tours list (show first) */}
          <div>
            <h3 className="text-md font-medium mb-3">Tours</h3>
            <div className="mb-4 flex gap-3 items-center">
              <div className="w-full sm:w-64">
                <Input
                  type="text"
                  placeholder="Search tours by title..."
                  value={searchTour}
                  onChange={(e) => setSearchTour(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-48">
                <Select options={tourCategoryOptions} placeholder="Filter category" onChange={setTourCategory} className="dark:bg-gray-900" />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Select</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Tour</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredTours.map(tour => (
                    <tr key={tour.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <input id={`tour-${tour.id}`} type="checkbox" checked={selectedTours.includes(tour.id)} onChange={() => toggleTour(tour.id)} />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        <label htmlFor={`tour-${tour.id}`} className="flex items-center cursor-pointer">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <CalenderIcon className="h-6 w-6 text-gray-400" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">{tour.title}</div>
                          </div>
                        </label>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{tour.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Drivers list (choose single active driver after tours selected) */}
          <div>
            <h3 className="text-md font-medium mb-3">Drivers (select one)</h3>
            <div className="mb-4 flex gap-3 items-center">
              <div className="w-full sm:w-64">
                <Input
                  type="text"
                  placeholder="Search drivers by name..."
                  value={searchDriver}
                  onChange={(e) => setSearchDriver(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-800">
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Select</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Driver</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Contact</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredDrivers.map(driver => (
                    <tr key={driver.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <input id={`driver-${driver.id}`} type="radio" name="selectedDriver" checked={selectedDriver === driver.id} onChange={() => toggleDriver(driver.id)} />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <label htmlFor={`driver-${driver.id}`} className="flex items-center cursor-pointer">
                          <div className="flex-shrink-0 h-10 w-10">
                            {driver.image ? (
                              <img className="h-10 w-10 rounded-full object-cover" src={driver.image} alt={driver.name} />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <UserCircleIcon className="h-6 w-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{driver.name}</div>
                          </div>
                        </label>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        <div>{driver.email}</div>
                        <div className="text-sm text-gray-500">{driver.phone}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={() => { setSelectedDriver(null); setSelectedTours([]); }} className="px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded">Clear</button>
          <button onClick={handleAllocate} className="px-4 py-2 bg-blue-600 text-white rounded">Allocate Selected to Driver</button>
        </div>
      </ComponentCard>
    </div>
  );
}
