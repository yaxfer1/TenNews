//import { useState } from 'react'
import './App.css'
import TextBox from './components/TextBox';
import ResultBox from './components/ResultBox';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row, Col, Button, Stack} from 'react-bootstrap'
import { ClipboardIcon, SpeakerIcon } from './components/Icons'
import "./assets/react.svg"

import {useStore} from "./hooks/useStore.ts";
import {SectionType} from "./types.d";

import React, {useState} from "react";
import {getContext} from "./services/getContext.ts";
import {setContext} from "./services/setContext.ts";
import ChatBox from "./components/ChatBox.tsx";
import MainHeader from "./components/MainHeader.tsx";
import {postChat} from "./services/postChat.ts";
import EditableTextBox from "./components/EditableTextBox.tsx";


function App () {


    const{
        text1,
        text2,
        text3,
        result,
        loading,
        chat,
        aimessages,
        messages,
        newMessage,
        showModal,
        editedText,
        setResult,
        changeText1,
        changeText2,
        changeText3,
        setLoad,
        setChat,
        setNewMessage,
        setMessages,
        setAIMessage,
        setShowModal,
        setEditedText,
    }=useStore()

    const [showAdditionalContent, setShowAdditionalContent] = useState(false);
    const handleTextChange =  async () => {
        // Aquí puedes realizar peticiones al backend con los textos y obtener el resultado
        // setResult(nuevoResultado);
        //setResult(result)
        // getContext().then(text3=>{changeText3(text3)}).catch(()=>changeText3('error'))
        //await getQuestion().then(result=>{setResult(result)}).catch(()=>setResult('error'))
        setLoad(true)
        await setContext(text1 + '|||' + text2 + '|||' + text3).then(result=>{

            setResult(result)

        }).catch(()=>setResult('error'))
        setLoad(false)
    };

    const handleGetContext = async ()=> {
        setLoad(true)
        await getContext(text3).then(text2=>{
            changeText2(text2)
            setEditedText(text2)
        }
        ).catch(()=>changeText2('error'))
        setShowAdditionalContent(true)
        setLoad(false)

    }
    const handleSetChat = () =>{
        setChat(!chat)
    }

    const handleSendMessage = async () => {
        if (newMessage.trim() !== "") {
            setLoad(true)
            const mensaje = newMessage
            setNewMessage("")
            // Agregar el nuevo mensaje al estado de mensajes

            setMessages([...messages, mensaje])

            const chatr = await postChat(mensaje);
            setAIMessage([...aimessages, chatr])
            // Limpiar el campo de texto después de enviar el mensaje

            setLoad(false)

        }
    };

    const handleClipboard = () => {
        navigator.clipboard.writeText(result).catch(() => {})
    }


    return (
        <Container fluid>
            <Container>
                <MainHeader
                    boton={handleSetChat}
                    chat={chat}
                >

                </MainHeader>
            </Container>

            {chat && <Container className= "containerGen" style={{marginTop: '60px', left: 0, top:50, position:"absolute", display:"flow", height:"10vw"}}>

                <Row style={{
                    width:"99vw",

                    padding: "1.5rem 2.5rem",
                    display: "flex",
                    left: 0,
                }}>
                    <Col style={{float: 'left', marginRight: '20px', height:"100px",}}>
                        <Stack gap={2}>
                            {!showAdditionalContent &&
                                <div style={{marginTop: "125px", marginBottom: "100px"}}><span><h2>Context Retrieval from Database</h2></span>
                                </div>}
                            {showAdditionalContent &&
                                <div style={{marginBottom: "40px"}}><span><h2>Prompt Structure</h2></span></div>}
                            {showAdditionalContent && (<TextBox
                                type={SectionType.Box1}
                                value={text1}
                                onChange={changeText1}
                                showAdditionalContent={showAdditionalContent}

                            />)}

                            {showAdditionalContent && (<EditableTextBox
                                editedText={editedText}
                                setShowModal={setShowModal}
                                onChange={setEditedText}
                                showModal={showModal}
                                text={text2}
                                setText={changeText2}
                            ></EditableTextBox>)
                            }

                            <TextBox
                                type={SectionType.Box3}
                                value={text3}
                                onChange={changeText3}
                                showAdditionalContent={!showAdditionalContent}
                            />

                            {showAdditionalContent && (
                                <Button
                                    style={{marginTop: "10px", height: "50px"}}
                                    onClick={handleTextChange}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="loader-container">
                                            <div className="loader"></div>
                                        </div>
                                    ) : (
                                        "Send"
                                    )}

                                </Button>)}


                        </Stack>
                    </Col>
                    {showAdditionalContent && (<Col style={{float: 'left'}}>
                        <ResultBox result={result} text1={text1} text2={text2} text3={text3}/>
                        <div style={{position: 'absolute', left: 1770, top: 690, display: 'flex'}}>
                            <Button
                                variant='link'
                                onClick={handleClipboard}>
                                <ClipboardIcon/>
                            </Button>
                        </div>
                    </Col>)}

                    {!showAdditionalContent && (
                        <Button
                            style={{marginTop: "400px", height: "50px"}}
                            disabled={loading}
                            onClick={handleGetContext}>
                            {loading ? (
                                <div className="loader-container">
                                    <div className="loader"></div>
                                </div>
                            ) : (
                                "Send"
                            )}
                        </Button>
                    )}
                </Row>
            </Container>}
            {!chat && (<Container className="containerChat">

                            <ChatBox
                                messages={messages}
                                newMessage={newMessage}
                                aimessages={aimessages}
                                onClick={handleSendMessage}
                                onChange={setNewMessage}
                                loading={loading}
                            >
                            </ChatBox>

            </Container>
            )}
        </Container>
    );
}

export default App;


