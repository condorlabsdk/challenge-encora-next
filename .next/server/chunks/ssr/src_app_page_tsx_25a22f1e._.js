module.exports = {

"[project]/src/app/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s({
    "default": ()=>Home
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function Home() {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [chats, setChats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeChat, setActiveChat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [chatSelected, setChatSelected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [inputSearch, setInputSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [inputConversation, setInputConversation] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const getData = async ()=>{
        const res = await fetch("/api/whoami");
        const data = await res.json();
        setUser(data.data);
    };
    const getDataList = async ()=>{
        const res = await fetch("/chats");
        const data = await res.json();
        setChats(data.data);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        getData();
        getDataList();
    }, []);
    const createUser = async ()=>{
        const data = {
            id: `conv-00${chats.length + 1}`,
            name: inputSearch,
            messages: [
                {
                    role: "user",
                    content: "How to learn Blockchain"
                },
                {
                    role: "encoraChat",
                    content: "I have a routemap with 3 weeks for your learn Blockchain from zero."
                }
            ]
        };
        const response = await fetch("/chats", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        await response.json();
        setChats([
            ...chats,
            data
        ]);
        setActiveChat(true);
        setChatSelected(data);
    };
    const updateUser = ()=>{
        if (!chatSelected) return;
        const newMessage = [
            {
                role: 'user',
                content: inputConversation
            },
            {
                role: 'encoraChat',
                content: 'This is a simulated response from EncoraChat.'
            }
        ];
        setChatSelected({
            ...chatSelected,
            messages: [
                ...chatSelected.messages,
                ...newMessage
            ]
        });
        setInputConversation("");
    };
    const changeChat = (chat)=>{
        setChatSelected(chat);
        setActiveChat(true);
    };
    const deleteChat = (chat)=>{
        const filteredChats = chats.filter((c)=>c.id !== chat.id);
        setChats(filteredChats);
        if (chatSelected?.id === chat.id) {
            setActiveChat(false);
            setChatSelected(null);
        }
    };
    const newChat = ()=>{
        setActiveChat(false);
        setInputSearch("");
    };
    const handleSearch = (e)=>{
        if (e.key === 'Enter') createUser();
    };
    const handleConversation = (e)=>{
        if (e.key === 'Enter') updateUser();
    };
    const handleInputSearchHistory = (e)=>{
        const value = e.target.value.toLowerCase();
        if (!value) {
            getDataList();
        } else {
            setChats(chats.filter((chat)=>chat.name.toLowerCase().includes(value)));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "font-sans flex justify-items-center h-screen",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatList, {
                chats: chats,
                onChatSelect: changeChat,
                onChatDelete: deleteChat,
                onSearch: handleInputSearchHistory,
                onNewChat: newChat
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatWindow, {
                activeChat: activeChat,
                chatSelected: chatSelected,
                inputSearch: inputSearch,
                inputConversation: inputConversation,
                onSearchChange: (e)=>setInputSearch(e.target.value),
                onConversationChange: (e)=>setInputConversation(e.target.value),
                onSearchKeyDown: handleSearch,
                onConversationKeyDown: handleConversation
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 104,
        columnNumber: 5
    }, this);
}
}),

};

//# sourceMappingURL=src_app_page_tsx_25a22f1e._.js.map