import React, { useState, useEffect } from "react";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import {postChat} from "../services/postChat.ts";

import './styles.css'

//(e) => setNewMessage(e.target.value)
interface ChatBoxProps {
    // Puedes agregar más propiedades según sea necesario

    messages: string[],
    aimessages: string[],
    newMessage: string,
    onClick:any,
    onChange: (value: string) => void
    loading: boolean,
}

export const ChatBox = ({messages, aimessages, newMessage, onClick, onChange, loading}: ChatBoxProps) => {
    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    };

    const combinedMessages = messages.map((message, index) => ({ text: message, sender: "user", index }))
        .concat(aimessages.map((message, index) => ({ text: message, sender: "AI", index })))
        .sort((a, b) => a.index - b.index); // Ordena los mensajes por el índice

    return (
        <Container fluid>
            <div style={{height: "700px", width:"1000px", overflowY: "scroll", border: "0px solid #ccc", marginBottom: "10px", marginTop:"60px"}}>
                <div style={{
                    textAlign: "left",
                    marginBottom: "5px",
                    padding: "8px",
                    borderRadius: "8px",
                    backgroundColor: "#F0F0F0"
                }}>
                        <span style={{fontWeight: "bold", fontSize: "1.2em"}}>
                            AI:
                        </span>
                        <span style={{fontSize: "1.2em", marginRight: "10px", marginLeft: "10px"}}>Hi! How can I help you?</span>
                </div>
                {combinedMessages.map((message, index) => (
                    <div key={index} style={{
                        textAlign: message.sender === "user" ? "right" : "left",
                        marginBottom: "5px",
                        padding: "8px",
                        borderRadius: "8px",
                        backgroundColor: message.sender === "user" ? "#D9EAF8" : "#F0F0F0"
                    }}>
                        <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
                            {message.sender === "user" ? "User:" : "AI:"}
                        </span>
                        <span style={{ fontSize: "1.2em", marginRight: "10px", marginLeft: "10px" }}>{message.text}</span>
                    </div>
                ))}

            </div>
            <InputGroup className="mb-3" >
                <FormControl
                    placeholder="Write your message here..."
                    aria-label="Write your message here..."
                    aria-describedby="basic-addon2"
                    value={newMessage}
                    onChange={handleTextChange}
                    disabled={loading}
                />
                <Button variant="primary" id="button-addon2" onClick={onClick} disabled={loading} style={{width:"100px"}}>
                    {loading ? (
                        <div className="loader-container">
                            <div className="loader"></div>
                        </div>
                    ) : (
                        "Send"
                    )}
                </Button>
            </InputGroup>
        </Container>
    );
};

export default ChatBox;

