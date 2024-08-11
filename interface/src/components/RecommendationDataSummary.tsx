import { RecommendationData } from "@/types/message.types";
import React, { useState } from "react";

interface RecommendationDataSummaryProps {
  data: RecommendationData[];
}

const formatNumber = (number: string | number) => {
  const num = parseFloat(number.toString());
  if (isNaN(num)) return number;
  if (num >= 1_000_000_000) {
    return (
      (num / 1_000_000_000).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      }) + "B"
    );
  } else if (num >= 1_000_000) {
    return (
      (num / 1_000_000).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      }) + "M"
    );
  } else if (num >= 1_000) {
    return (
      (num / 1_000).toLocaleString(undefined, { maximumFractionDigits: 2 }) +
      "K"
    );
  }
  return num.toLocaleString();
};

const RecommendationDataSummary: React.FC<RecommendationDataSummaryProps> = ({
  data,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof RecommendationData;
    direction: "ascending" | "descending";
  } | null>(null);

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (typeof aValue === "number" && typeof bValue === "number") {
          if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
          if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key: keyof RecommendationData) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortArrow = (key: keyof RecommendationData) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === "ascending" ? "▲" : "▼";
    }
    return "";
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold">
              Chain
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold">
              Protocol
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold">
              Supply Asset
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold">
              Borrow Asset
            </th>
            <th
              className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold text-right cursor-pointer"
              onClick={() => requestSort("supplyLiquidity")}
            >
              Supply Liquidity {getSortArrow("supplyLiquidity")}
            </th>
            <th
              className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold text-right cursor-pointer"
              onClick={() => requestSort("supplyApy")}
            >
              Supply APY {getSortArrow("supplyApy")}
            </th>
            <th
              className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold text-right cursor-pointer"
              onClick={() => requestSort("borrowApy")}
            >
              Borrow APY {getSortArrow("borrowApy")}
            </th>
            <th
              className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold text-right cursor-pointer"
              onClick={() => requestSort("netApy")}
            >
              Net APY {getSortArrow("netApy")}
            </th>
            <th
              className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold text-right cursor-pointer"
              onClick={() => requestSort("score")}
            >
              Score {getSortArrow("score")}
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-200">{item.chain}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.project}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.supplyAsset}</td>
              <td className="py-2 px-4 border-b border-gray-200">{item.borrowAsset}</td>
              <td className="py-2 px-4 border-b border-gray-200 text-right">
                ${formatNumber(item.supplyLiquidity).toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-right">
                {item.supplyApy.toFixed(2)}%
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-right">
                {item.borrowApy.toFixed(2)}%
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-right">
                {item.netApy.toFixed(2)}%
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-right">
                {item.score.toFixed(2)}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                <a
                  href={item.additionalInfo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecommendationDataSummary;
