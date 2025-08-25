"use client";
import React from "react";
import { ChatType } from "@/types/chat";

type Props = {
  chats: ChatType[];
  onChatSelect: (chat: ChatType) => void;
  onChatDelete: (chat: ChatType) => void;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNewChat: () => void;
};

const ChatList: React.FC<Props> = ({ chats, onChatSelect, onChatDelete, onSearch, onNewChat }) => {
  return (
    <section className="left p-4">
      <div className="logo">
        <h2 className="pb-30">EncoraChat</h2>

        <h3 
          className="pb-10 cursor-pointer"
          onClick={onNewChat}
        >
          Nuevo Chat
        </h3>

        <p className="pb-5">Chats</p>
        <ul>
          {chats?.map((chat, index) => (
            <li key={index} className="flex justify-between">
              <a onClick={() => onChatSelect(chat)} className="cursor-pointer">
                {chat.name}
              </a>
              <div onClick={() => onChatDelete(chat)}>x</div>
            </li>
          ))}
        </ul>

        <input 
          type="text" 
          placeholder="Buscar en historial" 
          className="rounded-xl mt-20 w-80 p-2 border"
          onChange={onSearch}
        />
      </div>
    </section>
  );
};

export default ChatList;