"use client";

import { useLucidity } from "@/context/LucidityContext";
import { useWallet } from "@/context/ThirdwebContext";
import { MessageResponse } from "@/types/message.types";
import { ConnectWallet } from "@thirdweb-dev/react";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import Markdown from "react-markdown";
import ProtocolDataSummary from "./ProtocolDataSummary";
import RecommendationDataSummary from "./RecommendationDataSummary";
import TransactionDetail from "./TransactionDetail";
import UserDataSummaryTable from "./UserDataSummary";
import Loader from "./primitives/Loader";

interface MessageProps extends Partial<MessageResponse> {
  user: "user" | "bot";
}
const examplePrompts = [
  "Find the Ethereum's borrow rate on Aave V2.",
  "Can you fetch compound v3 usdc protocol details on ethereum mainnet ?",
  "Can you get my aave v3 positions on base network?",
  "I would like to supply 0.01 eth on aave v3 on simulation network",
  "I want to supply USDC on base what do you recommend ?"
];
const Chatbot: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [isChatbox, setIsChatbox] = useState<boolean>(false);
  const [isBotLoading, setIsBotLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const { address, chain, sendTransaction } = useWallet();
  const { sendMessage } = useLucidity();
  const { tokens } = useLucidity();

  useEffect(() => {
    if (!address) {
      setIsChatbox(false);
    } else {
      setIsChatbox(true);
    }
  }, [address, chain?.chainId]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (trimmedInput && sendMessage) {
      setMessages([...messages, { message: input, user: "user" }]);
      setInput("");
      setIsBotLoading(true);
      const res = await sendMessage(trimmedInput);
      console.log(res, "message");
      if (res) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...res, user: "bot" },
        ]);
      }
      setIsBotLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSendTxn = async () => {
    const x = sendTransaction && (await sendTransaction({}));
    const msgIndex = messages
      .reverse()
      .findIndex((res) => typeof x === "string" && res.user === "bot");
    if (msgIndex > -1) {
      const msgs = [...messages];
      setMessages(msgs);
    }
  };
  const twTokens = useMemo(() => {
    const tokenList: Record<string, any[]> = {};
    for (const [key, value] of Object.entries(tokens)) {
      if (key !== "name") {
        // TODO: ipfs list contains 'name' key  => do not store in state
        tokenList[key] = value.map((token) => {
          return { ...token, icon: token.logo };
        });
        // TODO: hide native token details (currently manually filtering eth)
        tokenList[key] = tokenList[key].filter(
          (token) => token.symbol !== "ETH"
        );
      }
    }
    return tokenList;
  }, [tokens]);
  useEffect(() => {
    if (messages.length === 0 && address) {
      const msg = `You are connected to ${chain?.name} with ${address}`;

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: msg,
          user: "user",
          interactive: (
            <button
              className={
                "px-2 ml-1 bg-green-500 text-stone-100 rounded-md shadow-sm"
              }
              onClick={onSendTxn}
            >
              {false ? <MdDone /> : "Confirm"}
            </button>
          ),
        },
      ]);
      const firstResponse = async () => {
        const res = sendMessage && (await sendMessage(msg));
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...res, user: "bot" },
        ]);
      };
      firstResponse();
    }
  }, [address, messages, chain]);

  // useEffect(() => {
  //   const lastMsg = messages.pop()
  //   if(lastMsg?.user === "user") {

  //   }

  // }, [messages])

  const suggestedReplies = [
    "Give me the supported protocols",
    "I want to borrow USDC on Ethereum Mainnet. Can you help me discover the opportunities?",
    "Show me my positions on Aave V3",
  ];

  return (
    <motion.div
      className={`max-w-4xl mt-12 p-6 bg-gray-100 text-gray-900 rounded-lg shadow-md text-center ${
        isChatbox ? "max-w-full" : ""
      } sm:h-full`}
      initial={{ height: "80vh", width: "100%", maxWidth: "100%" }}
      animate={{
        // height: isChatbox ? "80vh" : "50vh",
        maxWidth: "100%",
        width: "100%",
      }}
      transition={{ duration: 1.5 }}
    >
      {!isChatbox && (
        <div className="px:[5%] md:px-[20%] py-[5%]">
          <h1 className="text-3xl font-bold mb-2">Welcome to LuciBot AI</h1>
          <p className="text-xl">
            You are just one step away from using our De-Fi chatbot
          </p>
          <p className="text-md mb-6 pt-0 mt-0 text-yellow-600">
            please connect your wallet first
          </p>

          <div className="flex justify-center items-center mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What do you want to know?"
              className="flex-1 p-4 border rounded-l-lg text-lg text-gray-900"
            />
            <ConnectWallet
              style={{ height: "61px", borderRadius: "0px 8px 8px 0px" }}
              theme={"light"}
              supportedTokens={twTokens}
              btnTitle="Connect & Ask!"
            />
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">Example Prompts</h2>
            <ul className="space-y-2">
              {examplePrompts.map((prompt, index) => (
                <li
                  key={index}
                  className="p-2 border rounded-lg hover:bg-gray-200 cursor-pointer shadow-sm"
                  onClick={() => setInput(prompt)}
                >
                  {prompt}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {isChatbox && (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-scroll mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`my-2 p-2 rounded shadow-sm 
                ${
                  message.user === "user"
                    ? "bg-gray-200 text-gray-900 text-right w-auto"
                    : "bg-gray-300 text-left"
                }`}
              >
                {![
                  "user data",
                  "protocol data",
                  "possible opportunities",
                  "transaction metadata",
                ].includes(message.message?.toLowerCase()) && (
                  <Markdown>{message.message}</Markdown>
                )}
                {message?.recommendation && (
                  <RecommendationDataSummary data={message.recommendation} />
                )}
                {message?.protocolAction && (
                  <TransactionDetail data={message.protocolAction} />
                )}
                {message?.protocolData && (
                  <ProtocolDataSummary data={message.protocolData} />
                )}
                {message?.userData && (
                  <UserDataSummaryTable data={message.userData} />
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex mb-4 space-x-2">
            {messages.length < 3 &&
              address &&
              suggestedReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => setInput(reply)}
                  className="p-2 bg-[#f9f9f9] text-gray-900 rounded-lg shadow-sm border border-solid border-[#e6e1e1] text-left"
                >
                  {reply}
                </button>
              ))}
          </div>

          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              disabled={isBotLoading}
              className="flex-1 p-2 border rounded-l text-gray-900"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSend}
              className="p-2 bg-gray-600 text-white rounded-r flex items-center shadow-sm"
              disabled={isBotLoading}
            >
              {isBotLoading ? (
                <Loader className="small" />
              ) : (
                <AiOutlineSend className="mx-6" />
              )}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Chatbot;
