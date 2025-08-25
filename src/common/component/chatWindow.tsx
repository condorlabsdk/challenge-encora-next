"use client";
import React from "react";
import { ChatType, MessageType } from "@/types/chat";

type Props = {
  activeChat: boolean;
  chatSelected: ChatType | null;
  inputSearch: string;
  inputConversation: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConversationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onConversationKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const ChatWindow: React.FC<Props> = ({
  activeChat,
  chatSelected,
  inputSearch,
  inputConversation,
  onSearchChange,
  onConversationChange,
  onSearchKeyDown,
  onConversationKeyDown,
}) => {
  return (
    <section className="right p-4">
      <div className="chat text-center">
        {!activeChat ? (
          <>
            <h1 className="text-xl">¿Qué tienes en mente hoy?</h1>
            <div className="buscador mb-20 ">
              <input 
                className="flex justify-center items-center border rounded-xl mt-4 w-100 p-2"
                placeholder="Escribe algo"
                type="text"
                onKeyDown={onSearchKeyDown}
                onChange={onSearchChange}
                value={inputSearch}
              />
            </div>
          </>
        ) : (
          <>
            <p className="mb-15">{chatSelected?.name}</p>
            <ul id="chatSelected" className="text-left chat-selected">
              {chatSelected?.messages?.map((men: MessageType, index: number) => (
                <li key={index} className="mb-5">
                  {men.content}
                </li>
              ))}
            </ul>
            <div className="buscador mb-20 fixed bottom-0">
              <input 
                className="flex justify-center items-center border rounded-xl mt-4 w-100 p-2"
                placeholder="Escribe algo"
                type="text"
                onKeyDown={onConversationKeyDown}
                onChange={onConversationChange}
                value={inputConversation}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ChatWindow;