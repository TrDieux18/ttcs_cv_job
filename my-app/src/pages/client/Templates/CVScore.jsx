import { useState } from "react";
import { Progress, Button, Card, message, Spin } from "antd";
import {
  LuSparkles,
  LuTrendingUp,
  LuInfo,
  LuRefreshCw,
} from "react-icons/lu";
import { scoreCv } from "@services/client/CvService";

const CVScore = ({ cvData }) => {
  const [loading, setLoading] = useState(false);
  const [scoreData, setScoreData] = useState(cvData?.[0]?.aiScore || null);
  const [showDetails, setShowDetails] = useState(false);

  const handleScoreCV = async () => {
    if (!cvData || cvData.length === 0) {
      message.warning("Vui lòng tạo CV trước khi chấm điểm!");
      return;
    }

    try {
      setLoading(true);
      const cvId = cvData[0]._id;
      const response = await scoreCv(cvId);

      if (response.success) {
        setScoreData(response.data.aiScore);
        message.success("Chấm điểm CV thành công!");
        setShowDetails(true);
      } else {
        message.error(response.errors?.[0] || "Chấm điểm thất bại!");
      }
    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra khi chấm điểm CV!");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "#52c41a";
    if (score >= 60) return "#faad14";
    return "#ff4d4f";
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return "Xuất sắc";
    if (score >= 60) return "Tốt";
    if (score >= 40) return "Trung bình";
    return "Cần cải thiện";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-200 bg-white rounded-lg shadow-sm p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <LuSparkles className="text-3xl text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800">
            Đánh Giá CV bằng AI
          </h2>
        </div>
        <Button
          type="primary"
          icon={<LuRefreshCw />}
          onClick={handleScoreCV}
          loading={loading}
          className="bg-purple-600 hover:bg-purple-700"
        >
          {scoreData ? "Chấm lại" : "Chấm điểm CV"}
        </Button>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <Spin size="large" tip="AI đang phân tích CV của bạn..." />
        </div>
      )}

      {!loading && !scoreData && (
        <div className="text-center py-12">
          <LuSparkles className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">
            Chưa có đánh giá cho CV của bạn
          </p>
          <p className="text-sm text-gray-400">
            Nhấn nút "Chấm điểm CV" để AI phân tích và đưa ra đánh giá chi tiết
          </p>
        </div>
      )}

      {!loading && scoreData && (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className="text-center bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6">
            <div className="text-6xl font-bold mb-2">
              <span style={{ color: getScoreColor(scoreData.overallScore) }}>
                {scoreData.overallScore}
              </span>
              <span className="text-3xl text-gray-400">/100</span>
            </div>
            <div className="text-xl font-semibold text-gray-700 mb-2">
              {getScoreLabel(scoreData.overallScore)}
            </div>
            {scoreData.lastScored && (
              <div className="text-sm text-gray-500">
                Đánh giá lần cuối: {formatDate(scoreData.lastScored)}
              </div>
            )}
          </div>

          {/* Detailed Scores */}
          <div className="grid grid-cols-1 gap-4">
            <ScoreItem
              label="Độ đầy đủ thông tin"
              score={scoreData.scores?.completeness || 0}
            />
            <ScoreItem
              label="Chất lượng kỹ năng"
              score={scoreData.scores?.skillsQuality || 0}
            />
            <ScoreItem
              label="Chất lượng kinh nghiệm"
              score={scoreData.scores?.experienceQuality || 0}
            />
            <ScoreItem
              label="Chất lượng học vấn"
              score={scoreData.scores?.educationQuality || 0}
            />
            <ScoreItem
              label="Cách trình bày"
              score={scoreData.scores?.presentation || 0}
            />
          </div>

          {/* Analysis */}
          {scoreData.analysis && (
            <Card
              title={
                <span className="flex items-center gap-2">
                  <LuInfo className="text-blue-600" />
                  Phân tích tổng quan
                </span>
              }
              className="bg-blue-50/50"
            >
              <p className="text-gray-700">{scoreData.analysis}</p>
            </Card>
          )}

          {/* Strengths and Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scoreData.strengths && scoreData.strengths.length > 0 && (
              <Card
                title={
                  <span className="flex items-center gap-2 text-green-700">
                    <span className="text-xl">✓</span>
                    Điểm mạnh
                  </span>
                }
                className="bg-green-50/50"
              >
                <ul className="space-y-2">
                  {scoreData.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-600 mt-1">✓</span>
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {scoreData.weaknesses && scoreData.weaknesses.length > 0 && (
              <Card
                title={
                  <span className="flex items-center gap-2 text-orange-700">
                    <LuTrendingUp />
                    Cần cải thiện
                  </span>
                }
                className="bg-orange-50/50"
              >
                <ul className="space-y-2">
                  {scoreData.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-orange-600 mt-1">!</span>
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
          </div>

          {/* Suggestions */}
          {scoreData.suggestions && scoreData.suggestions.length > 0 && (
            <Card
              title={
                <span className="flex items-center gap-2 text-purple-700">
                  <LuSparkles />
                  Gợi ý cải thiện
                </span>
              }
              className="bg-purple-50/50"
            >
              <ul className="space-y-3">
                {scoreData.suggestions.map((suggestion, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-white rounded-lg"
                  >
                    <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

const ScoreItem = ({ label, score }) => {
  const getColor = (score) => {
    if (score >= 80) return "#52c41a";
    if (score >= 60) return "#faad14";
    return "#ff4d4f";
  };

  return (
    <div className="flex items-center gap-4">
      <div className="w-40 text-sm font-medium text-gray-700">{label}</div>
      <div className="flex-1">
        <Progress
          percent={score}
          strokeColor={getColor(score)}
          size="small"
          format={(percent) => `${percent}`}
        />
      </div>
    </div>
  );
};

export default CVScore;
