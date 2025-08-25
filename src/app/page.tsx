"use client";
import ChatList from "@/common/component/chatList";
import ChatWindow from "@/common/component/chatWindow";
import { ChatType } from "@/common/types/chat";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<UserType | null>(null);
  const [chats, setChats] = useState<ChatType[]>([]);
  const [activeChat, setActiveChat] = useState<boolean>(false);
  const [chatSelected, setChatSelected] = useState<ChatType | null>(null);
  const [inputSearch, setInputSearch] = useState<string>("");
  const [inputConversation, setInputConversation] = useState<string>("");

  const getData = async () => {
    const res = await fetch("/api/whoami");
    const data = await res.json();
    setUser(data.data);
  };

  const getDataList = async () => {
    const res = await fetch("/chats");
    const data = await res.json();
    setChats(data.data);
  };

  useEffect(() => {
    getData();
    getDataList();  
  }, []);

  const createUser = async () => {
    const data: ChatType = {
      id: `conv-00${chats.length + 1}`,
      name: inputSearch,
      messages: [
        { role: "user", content: "How to learn Blockchain" },
        { role: "encoraChat", content: "I have a routemap with 3 weeks for your learn Blockchain from zero." }
      ]
    };

    const response = await fetch("/chats", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    await response.json();
    setChats([...chats, data]);
    setActiveChat(true);
    setChatSelected(data);
  };

  const updateUser = () => {
    if (!chatSelected) return;

    const newMessage = [
      { role: 'user', content: inputConversation },
      { role: 'encoraChat', content: 'This is a simulated response from EncoraChat.' }
    ];

    setChatSelected({
      ...chatSelected,
      messages: [...chatSelected.messages, ...newMessage],
    });
    setInputConversation("");
  };

  const changeChat = (chat: ChatType) => {
    setChatSelected(chat);
    setActiveChat(true);
  };

  const deleteChat = (chat: ChatType) => {
    const filteredChats = chats.filter((c) => c.id !== chat.id);
    setChats(filteredChats);
    if (chatSelected?.id === chat.id) {
      setActiveChat(false);
      setChatSelected(null);
    }
  };

  const newChat = () => {
    setActiveChat(false);
    setInputSearch("");
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') createUser();
  };

  const handleConversation = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') updateUser();
  };

  const handleInputSearchHistory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    if (!value) {
      getDataList();
    } else {
      setChats(chats.filter((chat) => chat.name.toLowerCase().includes(value)));
    }
  };

  return (
    <div className="font-sans flex justify-items-center h-screen">
      <ChatList 
        chats={chats}
        onChatSelect={changeChat}
        onChatDelete={deleteChat}
        onSearch={handleInputSearchHistory}
        onNewChat={newChat}
      />
      <ChatWindow 
        activeChat={activeChat}
        chatSelected={chatSelected}
        inputSearch={inputSearch}
        inputConversation={inputConversation}
        onSearchChange={(e: Event) => setInputSearch(e.target.value)}
        onConversationChange={(e: Event) => setInputConversation(e.target.value)}
        onSearchKeyDown={handleSearch}
        onConversationKeyDown={handleConversation}
      />
    </div>
  );
}