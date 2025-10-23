import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Input } from 'antd';
import Swal from 'sweetalert2';
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";
import Select from "../../components/form/Select";
import { PencilIcon, TrashBinIcon, BoxIcon } from "../../icons";

interface Bus {
  _id: string;
  busNumber: string;
  manufacturer: string;
  model: string;
  year: number;
  capacity: number;
  fuelType: string;
  status: string;
  image?: string;
}

export default function ViewBuses() {
  const navigate = useNavigate();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" }
  ];

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/bus/all');
      if (response.ok) {
        const data = await response.json();
        setBuses(data);
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to load buses',
        confirmButtonColor: '#3085d6',
        customClass: { container: 'swal-z-index' },
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredBuses = buses.filter(bus => {
    const matchesSearch = bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bus.model.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "" || bus.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBuses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBuses = filteredBuses.slice(startIndex, startIndex + itemsPerPage);

  const handleEdit = (id: string) => {
    navigate(`/admin/bus/edit/${id}`);
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      customClass: { container: 'swal-z-index' },
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/bus/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setBuses(prev => prev.filter(bus => bus._id !== id));
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'Bus has been deleted',
            confirmButtonColor: '#3085d6',
            customClass: { container: 'swal-z-index' },
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete bus',
          confirmButtonColor: '#3085d6',
          customClass: { container: 'swal-z-index' },
        });
      }
    }
  };

  const handleStatusChange = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    const result = await Swal.fire({
      title: 'Change Status?',
      text: `Change bus status to ${newStatus}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!',
      customClass: { container: 'swal-z-index' },
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5000/api/bus/${id}/status`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus }),
        });

        if (response.ok) {
          setBuses(prev => prev.map(bus => 
            bus._id === id ? { ...bus, status: newStatus } : bus
          ));
          Swal.fire({
            icon: 'success',
            title: 'Updated!',
            text: 'Status has been updated',
            confirmButtonColor: '#3085d6',
            customClass: { container: 'swal-z-index' },
          });
        }
      } catch (error) {
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

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div>
      <PageMeta title="View Buses | Get Your Guide Admin" description="View and manage all buses" />
      <PageBreadcrumb pageTitle="View Buses" />
      
      <ComponentCard title="Bus Fleet">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="w-full sm:w-64">
              <Input placeholder="Search by bus number, manufacturer, model..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="w-full sm:w-48">
              <Select options={statusOptions} placeholder="Filter by status" onChange={setStatusFilter} className="dark:bg-gray-900" />
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {filteredBuses.length} bus(es) found
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Bus</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Details</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Capacity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Fuel Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Update Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedBuses.map((bus) => (
                <tr key={bus._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-16">
                        {bus.image ? (
                          <img className="h-12 w-16 rounded object-cover" src={`http://localhost:5000/uploads/${bus.image}`} alt={bus.busNumber} />
                        ) : (
                          <div className="h-12 w-16 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                            <BoxIcon className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{bus.busNumber}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{bus.manufacturer}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{bus.model} ({bus.year})</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{bus.capacity} seats</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{bus.fuelType}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${bus.status === "active" ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100" : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100"}`}>
                      {bus.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <button onClick={() => handleStatusChange(bus._id, bus.status)} className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700">
                      Change Status
                    </button>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-3">
                      <button onClick={() => handleEdit(bus._id)} className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700" title="Edit Bus" style={{color:"white"}}>
                        <PencilIcon className="w-3 h-3 mr-1" />
                        Edit
                      </button>
                      <button onClick={() => handleDelete(bus._id)} className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700" title="Delete Bus" style={{color:"white"}}>
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

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">
              Previous
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">
              Next
            </button>
          </div>
        )}
      </ComponentCard>
    </div>
  );
}
