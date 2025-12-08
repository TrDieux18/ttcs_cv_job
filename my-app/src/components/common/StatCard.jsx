import { Card, Statistic } from "antd";

const StatCard = ({
  title,
  value,
  prefix,
  suffix,
  icon,
  iconColor = "#1890ff",
  valueStyle,
  className = "",
  trend,
  ...props
}) => {
  return (
    <Card
      className={`shadow-sm border border-gray-200 rounded-lg hover:shadow-md transition-shadow ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between">
        <Statistic
          title={title}
          value={value}
          prefix={prefix}
          suffix={suffix}
          valueStyle={valueStyle}
        />
        {icon && (
          <div
            className="text-4xl p-3 rounded-full bg-opacity-10"
            style={{ color: iconColor, backgroundColor: `${iconColor}20` }}
          >
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-2 text-sm">
          <span
            className={trend.isPositive ? "text-green-600" : "text-red-600"}
          >
            {trend.isPositive ? "↑" : "↓"} {trend.value}
          </span>
          <span className="text-gray-500 ml-2">{trend.label}</span>
        </div>
      )}
    </Card>
  );
};

export default StatCard;
