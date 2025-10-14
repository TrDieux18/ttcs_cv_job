import StatsCard from "./components/StatsCard";
import SalesChart from "./components/SalesChart";
import RecentOrders from "./components/RecentOrders";

const Dashboard = () => {
  return (
    <>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard title="Total Users" value="1,200" icon="users" />
          <StatsCard title="Orders" value="320" icon="orders" />
          <StatsCard title="Revenue" value="$12,450" icon="revenue" />
          <StatsCard title="Products" value="85" icon="products" />
        </div>

        {/* Chart + Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <div>
            <RecentOrders />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
