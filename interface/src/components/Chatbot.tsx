"use client";

import { useLucidity } from "@/context/LucidityContext";
import { useWallet } from "@/context/ThirdwebContext";
import { MessageResponse } from "@/types/message.types";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import { MdDone } from "react-icons/md";
import Markdown from "react-markdown";
import ProtocolDataSummary from "./ProtocolDataSummary";
import RecommendationDataSummary from "./RecommendationDataSummary";
import TransactionDetail from "./TransactionDetail";
import UserDataSummaryTable from "./UserDataSummary";

interface MessageProps extends Partial<MessageResponse> {
  user: "user" | "bot";
}
const examplePrompts = [
  "Find the Ethereum's borrow rate for last 7 days on Aave V2.",
  "How much Liquidty does Compound have for ETH-USDC Pair ?",
];
const Chatbot: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [isChatbox, setIsChatbox] = useState<boolean>(false);
  const [isBotLoading, setIsBotLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const { address, chain, sendTransaction } = useWallet();
  const { sendMessage } = useLucidity();
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
    "Tell me more.",
    "Can you explain that?",
    "What do you mean?",
  ];

  return (
    <motion.div
      className={`max-w-4xl mt-12 p-6 bg-gray-100 text-gray-900 rounded-lg shadow-md text-center ${
        isChatbox ? "max-w-full" : ""
      } sm:h-full`}
      initial={{ height: "50vh", width: "100%", maxWidth: "100%" }}
      animate={{ height: isChatbox ? "80vh" : "50vh", maxWidth: "100%" , width: "100%", 
        
      }}
      transition={{ duration: 1.5 }}
    >
      {!isChatbox && (
        <div className="px:[5%] md:px-[20%] py-[5%]">
          <h1 className="text-3xl font-bold mb-2">LuciBot AI</h1>
          <p className="text-xl mb-6">Ask De-Fi related questions.</p>

          <div className="flex justify-center items-center mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What do you want to know?"
              className="flex-1 p-4 border rounded-l-lg text-lg text-gray-900"
            />
            <button
              disabled={!address}
              onClick={() => {
                handleSend();
                setIsChatbox(true);
              }}
              className={`p-4  text-white text-lg rounded-r-lg flex items-center ${
                !address ? "bg-gray-300 cursor-not-allowed" : "bg-gray-600"
              }`}
            >
             <span className="size-7"> Ask!</span>&nbsp; <BsSend className="ml-2 size-4 md:size-6" />
            </button>
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
                {!["user data", "protocol data", "possible opportunities", "transaction metadata" ].includes(message.message?.toLowerCase()) && <Markdown>{message.message}</Markdown>}
                {message?.recommendation && <RecommendationDataSummary data={message.recommendation}/>}
                {message?.protocolAction && <TransactionDetail data={message.protocolAction}/>}
                {message?.protocolData && <ProtocolDataSummary data={message.protocolData}/>}
                {message?.userData && <UserDataSummaryTable data={message.userData}/>}
              
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex mb-4 space-x-2">
            {suggestedReplies.map((reply, index) => (
              <button
                key={index}
                onClick={() => setInput(reply)}
                className="p-2 bg-gray-200 text-gray-900 rounded-lg shadow-sm"
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
            >
              <AiOutlineSend className="mx-6" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Chatbot;
