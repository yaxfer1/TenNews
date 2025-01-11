import React from "react";
import { ListGroup, Button } from "react-bootstrap";

interface Chat {
    id: string;
    name: string; // Nombre del chat
    messages: string[]; // Mensajes del chat
}

interface ChatListProps {
    chats: Chat[];
    onSelectChat: (id: string) => void;
    onDeleteChat: (id: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({ chats, onSelectChat, onDeleteChat }) => {
    return (
        <div style={{ height: "100%", overflowY: "auto", padding: "1rem", border: "1px solid #ccc" }}>
            <h4>Chats Guardados</h4>
            <ListGroup>
                {chats.map((chat) => (
                    <ListGroup.Item key={chat.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span onClick={() => onSelectChat(chat.id)} style={{ cursor: "pointer" }}>
              {chat.name}
            </span>
                        <Button variant="danger" size="sm" onClick={() => onDeleteChat(chat.id)}>
                            Eliminar
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default ChatList;
