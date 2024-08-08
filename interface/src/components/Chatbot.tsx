"use client";

import { useWallet } from "@/context/ThirdwebContext";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import { MdDone } from "react-icons/md";

const examplePrompts = [
  "Find the Ethereum's borrow rate for last 7 days on Aave V2.",
  "How much Liquidty does Compound have for ETH-USDC Pair ?",
];
const Chatbot: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [isChatbox, setIsChatbox] = useState<boolean>(false);
  const [messages, setMessages] = useState<
    {
      text: string;
      user: "user" | "bot";
      interactive?: React.ReactElement;
      alreadyInteracted?: boolean;
    }[]
  >([]);
  const { address, chain, sendTransaction } = useWallet();
  useEffect(() => {
    if (!address) {
      setIsChatbox(false);
    }
  }, [address]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: "user" }]);
      setInput("");

      // Simulate bot response
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "This is a bot response.", user: "bot" },
        ]);
      }, 1000);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSendTxn = async () => {
    const x = sendTransaction && (await sendTransaction({}));
    const msgIndex = messages.reverse().findIndex((res) => typeof x === "string" && res.user === "bot" );
    if (msgIndex > -1) {
     const msgs = [...messages]
     msgs[msgIndex].alreadyInteracted = true
      setMessages(msgs);
    }
  };

  useEffect(() => {
    if (messages.length === 0 && address) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: `You are connected to ${chain?.name} with ${address}`,
          user: "bot",
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
    }
  }, [address, messages, chain]);

  const suggestedReplies = [
    "Tell me more.",
    "Can you explain that?",
    "What do you mean?",
  ];

  return (
    <motion.div
      className={`max-w-4xl mx-auto mt-12 p-6 bg-gray-100 text-gray-900 rounded-lg shadow-md text-center ${
        isChatbox ? "max-w-full" : ""
      }`}
      initial={{ height: "50vh", width: "800px", maxWidth: "100%" }}
      animate={{ height: isChatbox ? "80vh" : "50vh", maxWidth: "100%" }}
      transition={{ duration: 1.5 }}
    >
      {!isChatbox && (
        <>
          <h1 className="text-3xl font-bold mb-2">Lucidity AI</h1>
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
              Find Out <BsSend className="ml-2 size-6" />
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
        </>
      )}

      {isChatbox && (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-scroll mb-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`my-2 p-2 rounded shadow-sm ${
                  message.interactive && "inline-flex w-full justify-between"
                }
                ${
                  message.user === "user"
                    ? "bg-gray-200 text-gray-900 text-right w-auto"
                    : "bg-gray-300 text-left"
                }`}
              >
                {message.text}
                {message.interactive}
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
