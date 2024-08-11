import { UserData } from "@/types/message.types";
import BigNumber from "bignumber.js";
import { ethers } from "ethers";

const formatNumber = (input: string, isHf: boolean = false) => {
  const num = new BigNumber(input);
  if (num.isNaN()) return input;
  if (isHf) {
    if (num.isGreaterThanOrEqualTo(1_000_000_000_000)) {
      return num.toFixed(2);
    }
    if (num.isGreaterThanOrEqualTo(1_000_000_000)) {
      return (
        num.div(1_000_000_000).toNumber().toLocaleString(undefined, {
          maximumFractionDigits: 2,
        }) + "B"
      );
    } else if (num.isGreaterThanOrEqualTo(1_000_000)) {
      return (
        num.div(1_000_000).toNumber().toLocaleString(undefined, {
          maximumFractionDigits: 2,
        }) + "M"
      );
    } else if (num.isGreaterThanOrEqualTo(1_000)) {
      return (
        num.div(1_000).toNumber().toLocaleString(undefined, {
          maximumFractionDigits: 2,
        }) + "k"
      );
    }
  }
  return num.toFixed(2);
};

interface UserDataSummaryTableProps {
  data: UserData;
}
const UserDataSummaryTable: React.FC<UserDataSummaryTableProps> = ({
  data,
}) => {
  return (
    <div className="p-6 rounded-md">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Summary for {data.protocol.toUpperCase()}
      </h2>
      <div className="mb-6">
        <p className="text-gray-700">
          <strong>User Address:</strong> {data.userAddress}
        </p>
        <p className="text-gray-700">
          <strong>Total Borrowed:</strong>{" "}
          {Number(data.totalBorrowed).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <p className="text-gray-700">
          <strong>Total Supplied:</strong>{" "}
          {Number(data.totalSupplied).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Asset</th>
              <th className="py-3 px-6 text-right">Supplied</th>
              <th className="py-3 px-6 text-right">Borrowed</th>
              <th className="py-3 px-6 text-right">Supply APY</th>
              <th className="py-3 px-6 text-right">Borrow APY</th>
              <th className="py-3 px-6 text-right">LTV</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {data.markets
              .sort(
                (x, y) =>
                  Number(y.amountSupplied) - Number(x.amountSupplied) ||
                  Number(y.amountBorrowed) - Number(x.amountBorrowed)
              )
              .map((market, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{market.asset.symbol}</td>
                  <td className="py-3 px-6 text-right">
                    {new BigNumber(
                      ethers.utils.formatUnits(
                        market.amountSupplied,
                        market.asset.decimals
                      )
                    )
                      .decimalPlaces(7)
                      .toString()}
                  </td>
                  <td className="py-3 px-7 text-right">
                    {new BigNumber(
                      ethers.utils.formatUnits(
                        market.amountBorrowed,
                        market.asset.decimals
                      )
                    )
                      .decimalPlaces(7)
                      .toString()}
                  </td>

                  <td className="py-3 px-6 text-right">
                    {formatNumber(market.supplyApy)}
                  </td>
                  <td className="py-3 px-6 text-right">
                    {formatNumber(market.borrowApy)}
                  </td>
                  <td className="py-3 px-6 text-right">
                    {formatNumber(
                      market.liquidationThreeshold || market.collateralFactor
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDataSummaryTable;
