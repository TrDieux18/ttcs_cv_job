import React from "react";
import { Users, ShoppingCart, DollarSign, Package } from "lucide-react";

const iconMap = {
  users: Users,
  orders: ShoppingCart,
  revenue: DollarSign,
  products: Package,
};

const StatsCard = ({ title, value, icon }) => {
  const Icon = iconMap[icon];
  return (
    <div className="p-6 bg-white rounded-xl shadow-md flex items-center gap-4">
      <div className="p-3 bg-blue-100 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
