"use client"
import { useEffect, useState } from "react";

type UserType = {
  name: string;
  work: string;
  email: string;
  telephone: string;
  location: string;
  image: string;
}

type ChatType = {
  id: string;
  name: string;
  messages: Array<[]>;
}

export default function Home() {
  const [user, setUser] = useState<UserType | null>(null);
  const [chats, setChats] = useState<any | null>(null);
  const [activeChat, setActiveChat] = useState<Boolean | null>(false);
  const [chatSelected, setChatSelected] = useState<any | null>(null);
  const [inputSearch, setInputSearch] = useState<any | null>(null);
  const [inputConversation, setInputConversation] = useState<any | null>(null);

  const handleInputSearch = (event: any) => {
    setInputSearch(event.target.value)
  }

  const handleInputConversation = (event: any) => {
    setInputConversation(event.target.value)
  }

  const createUser = async()=>{
    const data = {
      id: `conv-00` + (chats?.length + 1),
      name: inputSearch,
      messages: [
        {
          role: "user", content: "How to learn Blockchain"
        },
        {
          role: "encoraChat", content: "I have a routemap with 3 weeks for your lean Blockchain from zero.",
        }
      ]
    }
    const response = await fetch("/chats", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : null,
    })
    const result = await response.json();
    setChats([...chats, data])
    setActiveChat(true)
    setChatSelected(data)

    console.log('user created', data, result)
  }

  const updateUser = async()=> {
    setInputConversation('')
    console.log(chatSelected, inputConversation)

    const newMessage = [
      { role: 'user', content: inputConversation },
      { role: 'encoraChat', content: 'This is a simulated response from EncoraChat.' }
    ];
    
    chatSelected.messages = [...chatSelected.messages, ...newMessage];
  }

  const getData = async()=>{
    const res = await fetch("/api/whoami");
    const data = await res.json();
    setUser(data.data);
  }

  const getDataList = async()=>{
    const res = await fetch("/chats");
    const data = await res.json();
    setChats(data.data);
    console.log(data.data);
  }

  useEffect(()=>{
    getData();
    getDataList();  
  }, [])

  const changeChat = (chat: ChatType) => {
    console.log(chats, chat)
    setChatSelected(chat)
    setActiveChat(true);
  }

  const deleteChat = (chat: ChatType) => {
    const filteredChats = chats?.filter((c: ChatType) => c.id !== chat.id);
    setChats(filteredChats);
    if (chatSelected?.id === chat.id) {
      setActiveChat(false);
      setChatSelected(null);
    }
  }

  const newChat = () => {
    setActiveChat(false)
    setInputSearch('')
  }

  const handleSearch = (e: any) => {
    if (e.key == 'Enter') {
      createUser();
    }
  }

  const handleConversation = (e: any) => {
    if (e.key == 'Enter') {
      updateUser();
      let history = document.getElementById('chatSelected')
      let interval: any = null;   
      interval = setInterval(function() {
        history.scrollTop = history.scrollHeight
        clearInterval(interval)
      }, 1)
      
    }
  }

  const handleInputSearchHistory = (e: any) => {
    console.log(chats)
    if (e.target.value === '') {
      setChats(chats)
    } else {
      const searchTerm = e.target.value.toLowerCase();
      const newChats: [] = chats;
      const filteredChats = newChats.filter((chat: ChatType) =>
        chat.name.toLowerCase().includes(searchTerm)
      );
      setChats(filteredChats);
    }
  }

  return (
    <div className="font-sans flex justify-items-center h-screen">
      <section className="left p-4">
        <div className="logo">
          <h2 className="pb-30">EncoraChat</h2>

          <h3 
            className="pb-10 cursor-pointer"
            onClick={newChat}
          >
            Nuevo Chat
          </h3>

          <p className="pb-5">Chats</p>
          <ul>
            {chats?.map((chat: ChatType, index: number) => (
              <li key={index} className="flex justify-between">
                <a onClick={() => changeChat(chat)} className="cursor-pointer">
                  {chat.name}
                </a>
                <div onClick={() => deleteChat(chat)}>x</div>
              </li>
            ))}
          </ul>

          <input 
            type="text" 
            placeholder="Buscar en historial" 
            className="rounded-xl mt-20 w-80 p-2 border"
            onChange={handleInputSearchHistory}
          />
        </div>
      </section>

      <section className="right p-4">
        <div className="chat text-center">
          {
            !activeChat ? (
              <>
                <h1 className="text-xl">¿Qué tienes en mente hoy?</h1>
                <div className="buscador mb-20 ">
                  <input 
                    className="flex justify-center items-center border rounded-xl mt-4 w-100 p-2"
                    placeholder="Escribe algo"
                    type="text"
                    onKeyDown={handleSearch}
                    onChange={handleInputSearch}
                    value={inputSearch}
                  />
                </div>
              </>
            ) : (
              <>
                <p className="mb-15">{chatSelected?.name}</p>
                <ul id="chatSelected" className="text-left chat-selected">
                  {chatSelected?.messages?.map((men: any, index: number) => (
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
                    onKeyDown={handleConversation}
                    onChange={handleInputConversation}
                    value={inputConversation}
                  />
                </div>
              </>
            )
          }
        </div>
      </section>
    </div>
  );
}
