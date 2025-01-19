//import { useState } from 'react'
import './Home.css'
import TextBox from '../components/TextBox.tsx';
import ResultBox from '../components/ResultBox.tsx';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Container, Row, Col, Button, Stack} from 'react-bootstrap'
import { ClipboardIcon} from '../components/Icons.tsx'
import "../assets/react.svg"

import {useStore} from "../hooks/useStore.ts";
import {SectionType} from "../types.d";

import {useState} from "react";
import {getContext} from "../services/getContext.ts";
import {setContext} from "../services/setContext.ts";
import ChatBox from "../components/ChatBox.tsx";
import MainHeader from "../components/MainHeader.tsx";
import {postChat} from "../services/postChat.ts";
import EditableTextBox from "../components/EditableTextBox.tsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import DropdownMenu from '../components/DropdownMenu.jsx';
import DragAndDrop from '../components/DragAndDrop.jsx';
import UrlInput from '../components/UrlInput.jsx';



function HomePage () {


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
        chats,
        currentChatId,
        addChat,
        setResult,
        changeText1,
        changeText2,
        changeText3,
        setLoad,
        setChat,
        setNewMessage,
        //setMessages,
        //setAIMessage,
        setShowModal,
        setEditedText,
        updateChatMessages,
        updateChatAIMessages,
    }=useStore()
    const [hovering, setHovering] = useState(true);
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

            updateChatMessages(currentChatId,[...messages, mensaje])


            const chatr = await postChat(mensaje);
            updateChatAIMessages(currentChatId,[...aimessages, chatr])
            // Limpiar el campo de texto después de enviar el mensaje

            setLoad(false)

        }
    };

    const handleClipboard = () => {
        navigator.clipboard.writeText(result).catch(() => {})
    }

    const handleMouseHover = () =>{
      setHovering(true);
    };
    const handleMouseLeave = () =>{
        setHovering(false);
    };

    return (

        <Container style={{margin: '0' , padding:'0', width:'100vw', height:'100vh', overflow:'hidden'}}>

            <Container onMouseOver={handleMouseHover} onMouseOut={handleMouseLeave}  style={{
                position: "absolute",
                height: "5vw",
                top: "0px",
                left: "0px",
                maxWidth:"none",
                width: "100vw", // Fondo para identificar la zona
                zIndex: "10000",
            }}>
                {hovering && (<MainHeader
                    // @ts-ignore
                    boton={handleSetChat}
                    chat={chat}
                >
                </MainHeader>)}
            </Container>

            {chat && <Container className= "containerGen" style={{marginTop: '30px', left: 0, top:50, position:"absolute", display:"flow", height:"10vw"}}>

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
                                <div style={{marginBottom: "20px"}}><span><h2>Prompt Structure</h2></span></div>}
                            {showAdditionalContent && (<TextBox
                                type={SectionType.Box1}
                                value={text1}
                                onChange={changeText1}
                                showAdditionalContent={showAdditionalContent}

                            >
                                <DropdownMenu
                                    onElementClick={changeText1}
                                    type={"type1"}
                                ></DropdownMenu>

                            </TextBox>
                            )}
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
                            >
                                {showAdditionalContent && (<DropdownMenu
                                    onElementClick={changeText3}
                                    type={"type2"}
                                ></DropdownMenu>)}
                            </TextBox>

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

            {!chat && (<Container className="containerChat" style={{marginTop:'0px', width: '100vw', height: '100vh', overflow: 'hidden'}}>

                            <ChatBox
                                messages={messages}
                                newMessage={newMessage}
                                aimessages={aimessages}
                                onClick={handleSendMessage}
                                onChange={setNewMessage}
                                loading={loading}
                                chats={chats}
                                onSelectChat={currentChatId}
                                onNewChat={addChat}
                                updateChatMessages={updateChatMessages}
                                updateChatAIMessages={updateChatAIMessages}
                            >
                            </ChatBox>

                    <Col
                        style={{
                            position: "absolute",
                            right: "20px",
                            top: "10vh",
                            width: "18vw",
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            overflowY: "auto",
                            zIndex: "0",
                        }}
                    >
                        <div
                            style={{
                                flex: "1", // Para que ocupe proporcionalmente el espacio disponible
                                overflowY: "auto", // Para manejar contenido desbordado
                                borderBottom: "1px solid #ccc", // Línea divisoria opcional
                            }}
                        >
                            <DragAndDrop />
                        </div>

                        <div
                            style={{
                                flex: "1", // Ocupará el mismo espacio que el anterior
                                overflowY: "auto", // También manejamos contenido desbordado
                            }}
                        >
                            {/* Agrega aquí cualquier otro componente o contenido */}
                            <UrlInput />
                        </div>
                    </Col>

                    <Col style={{
                        position: "absolute",
                        left: "20px",
                        top: "10vh",
                        width: "18vw",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        overflowY: "auto",
                        zIndex: "0",
                    }}>

                    </Col>
            </Container>
            )}
        </Container>
    );
}

export default HomePage;


