import React from "react";
import {
    Container,
    InputGroup,
    FormControl,
    Button,
    Dropdown,
    DropdownButton,
} from "react-bootstrap";
import "./styles.css";
import {Chat} from "../types";


interface ChatBoxProps {
    messages: string[];
    aimessages: string[];
    newMessage: string;
    onClick: () => void;
    setnewMessage: (value: string) => void;
    loading: boolean;
    chats: Chat[];
    setCurrentChatID: (value: bigint) => void;
    currentChatID: bigint;
    onNewChat: (value: Chat) => void;
}

export const ChatBox = ({
                            newMessage,
                            onClick,
                            setnewMessage,
                            loading,
                            chats,
                            setCurrentChatID,
                            onNewChat,
                            currentChatID,
                        }: ChatBoxProps) => {
    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setnewMessage(event.target.value);
    };

    const handleSelectChat = (chatId: bigint) => {
        console.log(chatId)
        setCurrentChatID(chatId);
    };

    const mappedMessages = chats
        .filter(chat => chat.id === currentChatID) // Filtrar solo el chat seleccionado
        .flatMap(chat =>
            chat.messages.map((text, index) => ({
                text,
                sender: "user",
                chatId: chat.id,
                index,
            }))
        );

    const mappedAImessages = chats
        .filter(chat => chat.id === currentChatID) // Filtrar solo el chat seleccionado
        .flatMap(chat =>
            chat.aimessages.map((text, index) => ({
                text,
                sender: "AI",
                chatId: chat.id,
                index,
            }))
        );

    const combinedMessages = [
        ...mappedMessages,
        ...mappedAImessages,
    ].sort((a, b) => a.index - b.index);

    return (
        <Container fluid>
            {/* Lista de chats */}

            {/* Lista de mensajes */}
            <div className="messages-container">
                {combinedMessages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${
                            message.sender === "user" ? "user-message" : "ai-message"
                        }`}
                    >
            <span className="message-sender">
              {message.sender === "user" ? "User:" : "AI:"}
            </span>
                        <span className="message-text">{message.text}</span>
                    </div>
                ))}
            </div>

            {/* Input para nuevos mensajes */}
            <InputGroup className="message-input-group">
                <FormControl
                    placeholder="Write your message here..."
                    value={newMessage}
                    onChange={handleTextChange}
                    disabled={loading}
                />
                <Button
                    variant="primary"
                    onClick={onClick}
                    disabled={loading}
                    className="send-button"
                >
                    {loading ? <div className="loader" /> : "Send"}
                </Button>
            </InputGroup>
        </Container>
    );

};

export default ChatBox;

/* styles.css */
