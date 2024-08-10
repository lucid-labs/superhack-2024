import { RecommendationData } from "@/types/message.types";

interface RecommendationDataSummaryProps {
  data: RecommendationData[];
}
const formatNumber = (number) => {
  const num = parseFloat(number);
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
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold">
              Chain
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold">
              Project
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold">
              Supply Asset
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold text-right">
              Supply Liquidity
            </th>

            <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold text-right">
              Supply APY
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold text-right">
              Borrow APY
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold text-right">
              Net APY
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold text-right">
              Score
            </th>
            <th className="py-2 px-4 bg-gray-200 text-gray-800 font-semibold">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-200">
                {item.chain}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {item.project}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">
                {item.supplyAsset}
              </td>
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
