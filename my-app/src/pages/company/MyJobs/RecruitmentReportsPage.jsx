import { useEffect, useState, useMemo } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { Card, Button, Select, message } from "antd";
import { ReloadOutlined, FilterOutlined } from "@ant-design/icons";
import { getRecruitmentReport } from "@services/company/ApplicantService";

const { Option } = Select;

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  BarElement
);

const SmallStat = ({ title, value, color = "green" }) => (
  <Card className="text-center shadow-md border-0 hover:shadow-lg transition-shadow">
    <div className="text-sm text-gray-500 mb-2">{title}</div>
    <div className={`text-3xl font-bold text-${color}-600`}>{value}</div>
  </Card>
);

export default function RecruitmentReportsPage() {
  const [items, setItems] = useState([]);
  const [summary, setSummary] = useState({
    totalJobs: 0,
    totalCVs: 0,
    pending: 0,
    accepted: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filterJob, setFilterJob] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const fetch = async () => {
    setLoading(true);
    try {
      const params = {};

      if (dateFrom) {
        params.dateFrom = dateFrom;
      }
      if (dateTo) {
        params.dateTo = dateTo;
      }

      const res = await getRecruitmentReport(params);

      if (res.success) {
        const { summary: summaryData, jobStats } = res.data || {};

        setItems(jobStats || []);
        setSummary({
          totalJobs: (jobStats || []).length,
          totalCVs: summaryData?.totalCVs || 0,
          pending: summaryData?.pending || 0,
          accepted: summaryData?.accepted || 0,
          rejected: summaryData?.rejected || 0,
        });
      } else {
        messageApi.error(res.message || "Không thể lấy báo cáo");
        setItems([]);
        setSummary({
          totalJobs: 0,
          totalCVs: 0,
          pending: 0,
          accepted: 0,
          rejected: 0,
        });
      }
    } catch (e) {
      console.error(e);
      messageApi.error("Lỗi khi tải báo cáo");
      setItems([]);
      setSummary({
        totalJobs: 0,
        totalCVs: 0,
        pending: 0,
        accepted: 0,
        rejected: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const filteredItems = useMemo(() => {
    let list = items.slice();
    if (filterJob) {
      list = list.filter((it) => it.jobId === filterJob);
    }
    return list;
  }, [items, filterJob]);

  const pieData = useMemo(() => {
    const labels = filteredItems.map((i) => i.jobTitle);
    const data = filteredItems.map((i) => i.totalCVs ?? 0);
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            "#60A5FA",
            "#34D399",
            "#FBBF24",
            "#A78BFA",
            "#F87171",
            "#06B6D4",
            "#EC4899",
            "#8B5CF6",
          ],
          hoverOffset: 6,
        },
      ],
    };
  }, [filteredItems]);

  const pieOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: { boxWidth: 12, padding: 8, usePointStyle: true },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const label = ctx.label ?? "";
              const value = ctx.parsed ?? 0;
              return `${label}: ${value} CV`;
            },
          },
        },
        title: {
          display: false,
        },
      },
    }),
    []
  );

  const resetFilters = () => {
    setDateFrom("");
    setDateTo("");
    setFilterJob("");
    fetch();
  };

  return (
    <div className="min-h-screen bg-white">
      {contextHolder}

      <div className="mx-auto max-w-7xl px-8 py-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Báo cáo tuyển dụng
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Thống kê và phân tích hiệu quả tuyển dụng
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="text-gray-400">-</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            <Select
              value={filterJob}
              onChange={(value) => setFilterJob(value)}
              placeholder="Tất cả tin"
              className="w-48 !rounded-lg"
            >
              <Option value="">Tất cả tin</Option>
              {items.map((it) => (
                <Option key={it.jobId} value={it.jobId}>
                  {it.jobTitle}
                </Option>
              ))}
            </Select>

            <Button
              onClick={fetch}
              type="default"
              icon={<FilterOutlined />}
              className="!rounded-lg"
              loading={loading}
            >
              Lọc
            </Button>

            <Button
              onClick={resetFilters}
              icon={<ReloadOutlined />}
              className="!rounded-lg"
            >
              Đặt lại
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <SmallStat
            title="Tổng tin tuyển dụng"
            value={summary.totalJobs}
            color="blue"
          />
          <SmallStat title="Tổng CV" value={summary.totalCVs} color="green" />
          <SmallStat title="Chờ xử lý" value={summary.pending} color="yellow" />
          <SmallStat
            title="Đã chấp nhận"
            value={summary.accepted}
            color="purple"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 shadow-sm border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Chi tiết tuyển dụng
            </h3>
            {loading ? (
              <div className="py-10 text-center text-gray-500">Đang tải...</div>
            ) : filteredItems.length === 0 ? (
              <div className="py-10 text-center text-gray-500">
                Không có báo cáo
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-xs text-gray-500 border-b bg-gray-50">
                      <th className="py-3 px-4 text-left font-semibold">
                        Tin tuyển dụng
                      </th>
                      <th className="py-3 px-4 text-center font-semibold w-24">
                        Tổng CV
                      </th>
                      <th className="py-3 px-4 text-center font-semibold w-24">
                        Chờ xử lý
                      </th>
                      <th className="py-3 px-4 text-center font-semibold w-24">
                        Đã chấp nhận
                      </th>
                      <th className="py-3 px-4 text-center font-semibold w-24">
                        Từ chối
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((it, index) => (
                      <tr
                        key={it.jobId}
                        className={`hover:bg-gray-50 transition-colors ${
                          index !== filteredItems.length - 1 ? "border-b" : ""
                        }`}
                      >
                        <td className="py-3 px-4 font-medium text-gray-800">
                          {it.jobTitle}
                        </td>
                        <td className="py-3 px-4 text-center text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {it.totalCVs}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {it.pending}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {it.accepted}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {it.rejected}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          <Card className="shadow-sm border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Phân bố CV theo tin
            </h3>
            <div style={{ minHeight: 280 }}>
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-gray-500">
                  Không có dữ liệu cho biểu đồ
                </div>
              ) : (
                <Pie data={pieData} options={pieOptions} />
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
