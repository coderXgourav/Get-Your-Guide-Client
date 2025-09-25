import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { CalenderIcon, UserCircleIcon, BoxIcon, GroupIcon, DollarLineIcon, ArrowUpIcon, ArrowDownIcon } from "../../icons";

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ReactNode;
  color: string;
}

interface RecentActivity {
  id: number;
  type: 'tour' | 'booking' | 'driver' | 'supplier';
  title: string;
  time: string;
  status: string;
}

export default function Home() {
  const stats: StatCard[] = [
    {
      title: "Total Tours",
      value: "156",
      change: "+12%",
      changeType: "increase",
      icon: <CalenderIcon className="w-6 h-6" />,
      color: "bg-blue-500"
    },
    {
      title: "Active Drivers",
      value: "89",
      change: "+5%",
      changeType: "increase",
      icon: <UserCircleIcon className="w-6 h-6" />,
      color: "bg-green-500"
    },
    {
      title: "Fleet Buses",
      value: "34",
      change: "+2%",
      changeType: "increase",
      icon: <BoxIcon className="w-6 h-6" />,
      color: "bg-purple-500"
    },
    {
      title: "Suppliers",
      value: "67",
      change: "-3%",
      changeType: "decrease",
      icon: <GroupIcon className="w-6 h-6" />,
      color: "bg-orange-500"
    },
    {
      title: "Monthly Revenue",
      value: "$45,280",
      change: "+18%",
      changeType: "increase",
      icon: <DollarLineIcon className="w-6 h-6" />,
      color: "bg-emerald-500"
    },
    {
      title: "Total Bookings",
      value: "1,234",
      change: "+25%",
      changeType: "increase",
      icon: <CalenderIcon className="w-6 h-6" />,
      color: "bg-indigo-500"
    }
  ];

  const recentActivities: RecentActivity[] = [
    { id: 1, type: 'tour', title: 'New tour "City Walking Experience" created', time: '2 hours ago', status: 'Draft' },
    { id: 2, type: 'booking', title: 'Booking #1234 confirmed for Museum Tour', time: '3 hours ago', status: 'Confirmed' },
    { id: 3, type: 'driver', title: 'Driver John Smith completed tour assignment', time: '5 hours ago', status: 'Completed' },
    { id: 4, type: 'supplier', title: 'Supplier "ABC Hotels" submitted new proposal', time: '1 day ago', status: 'Under Review' },
    { id: 5, type: 'tour', title: 'Tour "Historic District Walk" published', time: '1 day ago', status: 'Published' }
  ];

  const toursByStatus = [
    { status: 'Published', count: 89, color: 'bg-green-500' },
    { status: 'Under Review', count: 23, color: 'bg-yellow-500' },
    { status: 'Draft', count: 31, color: 'bg-gray-500' },
    { status: 'Rejected', count: 13, color: 'bg-red-500' }
  ];

  const monthlyBookings = [
    { month: 'Jan', bookings: 145 },
    { month: 'Feb', bookings: 189 },
    { month: 'Mar', bookings: 234 },
    { month: 'Apr', bookings: 198 },
    { month: 'May', bookings: 267 },
    { month: 'Jun', bookings: 312 }
  ];

  return (
    <div className="space-y-6">
      <PageMeta
        title="Dashboard | Get Your Guide Admin"
        description="Admin dashboard for Get Your Guide tour management system"
      />
      <PageBreadcrumb pageTitle="Dashboard" />
      
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome to Tour Management Dashboard</h1>
        <p className="text-blue-100">Monitor your tours, manage bookings, and track performance all in one place.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.changeType === 'increase' ? (
                    <ArrowUpIcon className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownIcon className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tours by Status */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tours by Status</h3>
          <div className="space-y-4">
            {toursByStatus.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${item.color} mr-3`}></div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.status}</span>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{item.count}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total: <span className="font-semibold text-gray-900 dark:text-white">156 Tours</span>
            </div>
          </div>
        </div>

        {/* Monthly Bookings Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Bookings</h3>
          <div className="space-y-3">
            {monthlyBookings.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-8 text-sm font-medium text-gray-600 dark:text-gray-400">{item.month}</div>
                <div className="flex-1 mx-3">
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(item.bookings / 312) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-sm font-semibold text-gray-900 dark:text-white text-right">{item.bookings}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'tour' ? 'bg-blue-500' :
                  activity.type === 'booking' ? 'bg-green-500' :
                  activity.type === 'driver' ? 'bg-purple-500' : 'bg-orange-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      activity.status === 'Published' || activity.status === 'Confirmed' || activity.status === 'Completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                        : activity.status === 'Under Review' || activity.status === 'Draft'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center">
                <CalenderIcon className="w-5 h-5 text-blue-500 mr-3" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Add New Tour</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center">
                <UserCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Register Driver</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center">
                <BoxIcon className="w-5 h-5 text-purple-500 mr-3" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Add New Bus</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center">
                <GroupIcon className="w-5 h-5 text-orange-500 mr-3" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Add Supplier</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}