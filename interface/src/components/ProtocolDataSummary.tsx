import { ProtocolData } from "@/types/message.types";

interface ProtocolDataSummaryProps {
  data: ProtocolData;
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

const ProtocolDataSummary: React.FC<ProtocolDataSummaryProps> = ({ data }) => {
  return (
    <div className="container mx-auto my-8 p-4 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Market Overview for {data.protocol}
      </h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left text-gray-600 font-semibold">
              Asset
            </th>
            <th className="py-2 px-4 text-right text-gray-600 font-semibold">
              Supply Liquidity
            </th>
            <th className="py-2 px-4 text-right text-gray-600 font-semibold">
              Borrow Liquidity
            </th>
            <th className="py-2 px-4 text-left text-gray-600 font-semibold">
              LTV
            </th>
            <th className="py-2 px-4 text-left text-gray-600 font-semibold">
              Supply APY
            </th>
            <th className="py-2 px-4 text-left text-gray-600 font-semibold">
              Borrow APY
            </th>
          </tr>
        </thead>
        <tbody>
          {data.markets.map((market, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="py-2 px-4 text-gray-700">
                <div className="flex items-center">
                  <span className="font-medium">{market.asset.symbol}</span>
                </div>
              </td>
              <td className="py-2 px-4 text-gray-700 text-right">
                {formatNumber(market.supplyLiquidityInBaseAsset)}
              </td>
              <td className="py-2 px-4 text-gray-700 text-right">
                {formatNumber(market.borrowLiquidityInBaseAsset)}
              </td>
              <td className="py-2 px-4 text-gray-700">
                {market.liquidationThreeshold || market.collateralFactor}
              </td>
              <td className="py-2 px-4 text-gray-700">
                {parseFloat(market.supplyApy).toFixed(2)}%
              </td>
              <td className="py-2 px-4 text-gray-700">
                {parseFloat(market.borrowApy).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProtocolDataSummary;
