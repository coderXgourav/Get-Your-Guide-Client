import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ComponentCard from "../../components/common/ComponentCard";

interface BusLocation {
  id: string;
  busRegNo: string;
  driverName: string;
  startPoint: string;
  currentPoint: string;
  destinyPoint: string;
  status: "Active" | "Inactive" | "Maintenance";
  lastUpdated: string;
  coordinates: {
    start: { lat: number; lng: number };
    current: { lat: number; lng: number };
    destination: { lat: number; lng: number };
  };
}

export default function TrackBus() {
  const [buses] = useState<BusLocation[]>([
    {
      id: "1",
      busRegNo: "BUS-001",
      driverName: "John Smith",
      startPoint: "Downtown Terminal",
      currentPoint: "Main Street & 5th Ave",
      destinyPoint: "Airport Terminal",
      status: "Active",
      lastUpdated: "2 mins ago",
      coordinates: {
        start: { lat: 40.7128, lng: -74.0060 },
        current: { lat: 40.7589, lng: -73.9851 },
        destination: { lat: 40.6413, lng: -73.7781 }
      }
    },
    {
      id: "2",
      busRegNo: "BUS-002",
      driverName: "Sarah Johnson",
      startPoint: "Central Station",
      currentPoint: "Highway 101 Mile 15",
      destinyPoint: "Beach Resort",
      status: "Active",
      lastUpdated: "5 mins ago",
      coordinates: {
        start: { lat: 40.7505, lng: -73.9934 },
        current: { lat: 40.7831, lng: -73.9712 },
        destination: { lat: 40.5795, lng: -74.1502 }
      }
    },
    {
      id: "3",
      busRegNo: "BUS-003",
      driverName: "Mike Wilson",
      startPoint: "City Mall",
      currentPoint: "Service Center",
      destinyPoint: "Mountain View Lodge",
      status: "Maintenance",
      lastUpdated: "1 hour ago",
      coordinates: {
        start: { lat: 40.7282, lng: -73.7949 },
        current: { lat: 40.7282, lng: -73.7949 },
        destination: { lat: 40.8176, lng: -73.9782 }
      }
    }
  ]);

  const [selectedBus, setSelectedBus] = useState<BusLocation | null>(null);
  const [showMap, setShowMap] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      case "Maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const handleViewMap = (bus: BusLocation) => {
    setSelectedBus(bus);
    setShowMap(true);
  };

  const closeMap = () => {
    setShowMap(false);
    setSelectedBus(null);
  };

  return (
    <div>
      <PageMeta
        title="Track Bus | Get Your Guide Admin"
        description="Track real-time location of all buses"
      />
      <PageBreadcrumb pageTitle="Track Bus" />
      
      <ComponentCard title="Bus Location Tracking">
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {buses.filter(bus => bus.status === "Active").length}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">Active Buses</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {buses.filter(bus => bus.status === "Maintenance").length}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">In Maintenance</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">{buses.length}</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Total Buses</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bus Tracking Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Bus Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Start Point
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Current Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {buses.map((bus) => (
                  <tr key={bus.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {bus.busRegNo}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Driver: {bus.driverName}
                        </div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">
                          Updated: {bus.lastUpdated}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {bus.startPoint}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white font-medium">
                        {bus.currentPoint}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-white">
                        {bus.destinyPoint}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(bus.status)}`}>
                        {bus.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        onClick={() => handleViewMap(bus)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                      >
                        View Map
                      </button>
                      <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                        Contact
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Refresh Button */}
          <div className="flex justify-end">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
              Refresh Locations
            </button>
          </div>
        </div>
      </ComponentCard>

      {/* Map Modal */}
      {showMap && selectedBus && (
        <div 
          className="fixed top-0 right-0 bg-black bg-opacity-50 flex items-center justify-center p-4" 
          style={{ 
            zIndex: 1000,
            left: '290px', // Leave space for sidebar
            width: 'calc(100vw - 290px)',
            height: '100vh'
          }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl w-full max-w-5xl h-5/6 flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Bus Route Tracking - {selectedBus.busRegNo}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Driver: {selectedBus.driverName} • Status: {selectedBus.status}
                </p>
              </div>
              <button 
                onClick={closeMap}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                ×
              </button>
            </div>
            
            {/* Map Container */}
            <div className="flex-1 p-6">
              <div className="w-full h-full rounded-lg overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800 relative">
                {/* Static Google Maps View */}
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74844097932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635959313176!5m2!1sen!2sus`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
                
                {/* Bus tracking overlay */}
                <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Bus Location</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Route Info Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-sm font-semibold text-green-800 dark:text-green-300">Start Point</span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400 font-medium">{selectedBus.startPoint}</p>
                  <p className="text-xs text-green-600 dark:text-green-500 mt-1">Journey Origin</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-blue-600 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">Current Location</span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-400 font-medium">{selectedBus.currentPoint}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-500 mt-1">Last updated: {selectedBus.lastUpdated}</p>
                </div>
                
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-sm font-semibold text-red-800 dark:text-red-300">Destination</span>
                  </div>
                  <p className="text-sm text-red-700 dark:text-red-400 font-medium">{selectedBus.destinyPoint}</p>
                  <p className="text-xs text-red-600 dark:text-red-500 mt-1">Final Stop</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}