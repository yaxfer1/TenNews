//import React from "react";
import {useEffect} from "react";
import {
    Button,
} from "react-bootstrap";
import "./styles.css";
import {Chat} from "../types";
//import ChatBox from "./ChatBox.tsx";
import {useStore} from "../hooks/useStore.ts"


interface ChatListProps {
    chats: Chat[];
    setCurrentChatID: (value: bigint) => void;
    onNewChat: () => void;
}

export const ChatList = ({
    chats,
    setCurrentChatID,
    onNewChat,

}: ChatListProps) => {
    //const { chats } = useStore();
    useEffect(() => {
        console.log("Chats in the component:", chats);
    }, [chats]);
    const handleSelectChat = (chatId: bigint) => {
        console.log(chatId)
        setCurrentChatID(chatId);
    };
return (
    <div className="chat-list">
        {chats
            .slice()
            .reverse() // Invertir el orden para que el más reciente esté arriba
            .map((chat) => (
                <div
                    key={chat.id.toString()}
                    className="chat-item"
                    onClick={() => handleSelectChat(chat.id)}
                >
                    {chat.name}
                </div>
            ))}
        <Button onClick={onNewChat} className="new-chat-button">
            New Chat
        </Button>
    </div>
);
};
export default ChatList;