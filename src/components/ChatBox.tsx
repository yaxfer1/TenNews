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

interface Chat {
    id: string;
    name: string;
    messages: string[];
    aimessages: string[];
}

interface ChatBoxProps {
    messages: string[];
    aimessages: string[];
    newMessage: string;
    onClick: () => void;
    onChange: (value: string) => void;
    loading: boolean;
    chats: Chat[];
    onSelectChat: (id: string) => void;
    onNewChat: () => void;
}

export const ChatBox = ({
                            messages,
                            aimessages,
                            newMessage,
                            onClick,
                            onChange,
                            loading,
                            chats,
                            onSelectChat,
                            onNewChat,
                        }: ChatBoxProps) => {
    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value);
    };

    const handleSelectChat = (chatId: string) => {
        setCurrentChatId(chatId);
    };

    const handleNewChat = () => {
        const newChatId = `${Date.now()}`;
        addChat({ id: newChatId, name: `Chat ${chats.length + 1}`, messages: [], aimessages: [] });
        setCurrentChatId(newChatId);
    };

    const combinedMessages = [
        ...messages.map((text, index) => ({ text, sender: "user", index })),
        ...aimessages.map((text, index) => ({ text, sender: "AI", index })),
    ].sort((a, b) => a.index - b.index);

    return (
        <Container fluid>
            {/* Dropdown para seleccionar chats */}
            <DropdownButton
                id="chat-selector"
                title="Select Chat"
                className="chat-dropdown"
            >
                {chats.map((chat) => (
                    <Dropdown.Item key={chat.id} onClick={() => onSelectChat(chat.id)}>
                        {chat.name}
                    </Dropdown.Item>
                ))}
                <Dropdown.Divider />
                <Dropdown.Item onClick={onNewChat}>New Chat</Dropdown.Item>
            </DropdownButton>

            {/* Lista de mensajes */}
            <div className="messages-container">
                <div className="message ai-message">
                    <span className="message-sender">AI:</span>
                    <span className="message-text">Hi! How can I help you?</span>
                </div>
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
