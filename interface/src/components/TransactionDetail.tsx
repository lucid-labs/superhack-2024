import { TransactionMetadataDetails } from "@/types/message.types";
import React, { useState } from "react";

const TransactionDetail: React.FC<{ data: TransactionMetadataDetails }> = ({
  data,
}) => {
  // State to handle expanded view for data items
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const handleToggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Action Details</h1>

      <div className="mb-6">
        <div className="mt-2">
          <p>
            <span className="font-medium">Type:</span> {data.type}
          </p>
          <p>
            <span className="font-medium">Protocol:</span> {data.protocol}
          </p>
          <p>
            <span className="font-medium">Asset Symbol:</span>{" "}
            {data.assetSymbol}
          </p>
          <p>
            <span className="font-medium">Amount:</span>{" "}
            {parseFloat(data.amount) / 10 ** data.assetDecimals}{" "}
            {data.assetSymbol}
          </p>
          <p>
            <span className="font-medium">User Address:</span>{" "}
            {data.userAddress}
          </p>
          <p>
            <span className="font-medium">Chain ID:</span> {data.chainId}
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Data Transactions</h2>
        <ul className="list-disc pl-5 mt-2">
          {data.data.map((item, index) => (
            <li key={index} className="py-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.metadata}</span>
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => handleToggleExpand(index)}
                >
                  {expandedIndex === index ? "Collapse" : "Expand"}
                </button>
              </div>
              {expandedIndex === index && (
                <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p>
                    <span className="font-medium">To:</span> {item.to}
                  </p>
                  <p>
                    <span className="font-medium">Data:</span> {item.data}
                  </p>
                  <p>
                    <span className="font-medium">Value:</span>{" "}
                    {parseFloat(item.value) / 10 ** data.assetDecimals}{" "}
                    {data.assetSymbol}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionDetail;
