"use client";
import React, { useState } from "react";
import { Image } from "rebass";
import TokenBalances from "./TokenBalances";

type Props = {};

function Sidebar({}: Props) {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* {open === false ? (
        <div
          onClick={() => toggleSidebar()}
          className="flex mt-4 ml-auto w-auto py-1 px-2 max-w-fit fixed sm:ml-2 bg-[#fcfdfd] sm:justify-center items-center hover:bg-[#fcfdfd] bg-sm:mx-6 sm:my-4 border-gray-500 border rounded-lg cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#000"
            className="w-7 h-7 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <div className="absolute top-4 left-4 bg-gray-100 text-gray-900 rounded-full shadow-sm">
            <Image src="/lucidity.png" height={60} width={60} alt="logo" />
          </div>
        </div>
      ) : ( */}
      <div
        className={`p-2 flex flex-col h-screen pl-4 bg-[#fcfdfd] ${
          open
            ? "w-72 transition-w ease-in duration-2000 overflow-hidden"
            : "w-0 transition-w ease-in duration-2000"
        }`}
      >
        <div className="flex-1 overflow-y-scroll">
          {/* <div
              onClick={() => toggleSidebar()}
              className="flex mt-4 ml-auto w-auto py-1 px-2 max-w-fit justify-end items-center border-gray-500 border rounded-lg cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#000"
                className="w-7 h-7 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div> */}
          {/* <NewChat session={session} toggleSidebar={toggleSidebar} /> */}
          {/* <p className="text-gray-400 mt-4 ml-4 pb-0 text-sm">
              Previous Chats
            </p> */}
          <div className="flex flex-col space-y-2 my-2">
            <TokenBalances />
          </div>
        </div>
        {/* {session && ( */}
        <div className="border-t border-gray-400 py-3">
          {/* <div className="chatRow items-center justify-start gap-5">
                <img
                  src={session?.user?.image!}
                  alt={session?.user?.name!}
                  className="h-8 w-8 rounded-sm cursor-pointer hover:opacity-50"
                />
                <p>{session?.user?.name}</p>
              </div> */}
          <div
            className="flex chatRow items-center justify-start gap-5"
            onClick={() => {}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
            <p>Log out</p>
          </div>
        </div>
        {/* )} */}
      </div>
      {/* )} */}
    </>
  );
}

export default Sidebar;
