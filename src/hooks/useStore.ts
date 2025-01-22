import { useReducer} from 'react'
import {type Action, Chat, type State} from '../types'


const initialState: State = {
    text1: 'You are a helpful assistant that create news articles about mainly AI and NLP topic...',
    text2: 'Here is the context',
    text3: 'Explain in an article...',
    loading: false,
    result: '',
    chat: false,
    messages: [],
    aimessages: [],
    newMessage: '',
    showModal: false,
    editedText: '',
    email: '',
    password: '',
    currentChatId: 1n,
    chats: [
        {
            id: BigInt(1),
            name: "Chat inicial", // Nombre del chat inicial
            messages: [],// Ejemplo de mensaje inicial
            aimessages: [] // Respuesta inicial de la IA
        }
    ], // Inicializar la lista de chats como un array vacío

}

function reducer (state: State, action: Action) {

    const { type } = action

    if (type === 'SET_TEXT1'){
        return{
            ...state,
            text1: action.payload
        }
    }
    if (type === 'SET_TEXT2'){
        return{
            ...state,
            text2: action.payload,
            editedText: action.payload
        }
    }
    if (type === 'SET_TEXT3'){
        return{
            ...state,
            text3: action.payload
        }
    }

    if(type === 'GET_RESULT'){


        return{
            ...state,
            result: action.payload
        }

    }

    if(type === 'SET_LOAD'){


        return{
            ...state,
            loading: action.payload
        }

    }

    if(type === 'SET_CHAT'){


        return{
            ...state,
            chat: action.payload
        }

    }

    if(type === 'SET_MESSAGES'){


        return{
            ...state,
            messages: action.payload
        }

    }

    if(type === 'SET_NEWMESSAGE'){


        return{
            ...state,
            newMessage: action.payload
        }

    }

    if(type === 'SET_AIMESSAGES'){


        return{
            ...state,
            aimessages: action.payload
        }

    }

    if(type === 'SET_EDITEDTEXT'){


        return{
            ...state,
            editedText: action.payload,
        }

    }

    if(type === 'SET_SHOWMODAL'){


        return{
            ...state,
            showModal: action.payload
        }

    }
    if (type === 'SET_EMAIL'){
        return{
            ...state,
            email: action.payload
        }
    }   if (type === 'SET_PASSWORD'){
        return{
            ...state,
            password: action.payload
        }
    }
    if (type === 'ADD_CHAT'){
        return {
            ...state,
            chats: [...state.chats, action.payload],
        };
    }
    if (type === 'DELETE_CHAT'){
        return {
            ...state,
            chats: state.chats.filter((chat) => chat.id !== action.payload),
        }
    }
    if (type === 'SET_CURRENTCHATID'){
        return {
            ...state,
            currentChatId: action.payload,
        }
    }

    if (type === 'UPDATE_CHAT_MESSAGES'){
        return {
            ...state,
            chats: state.chats.map((chat) =>
                chat.id === action.payload.currentChatID
                    ? { ...chat, messages: action.payload.messages }
                    : chat
            ),
        }
    }
    if (type === 'UPDATE_CHAT_AIMESSAGES'){
        return {
            ...state,
            chats: state.chats.map((chat) =>
                chat.id === action.payload.currentChatID
                    ? { ...chat, messages: action.payload.aimessages }
                    : chat
            ),
        }
    }
    return state

}

export function useStore () {
    const [{
        text1,
        text2,
        text3,
        result,
        loading,
        chat,
        messages,
        newMessage,
        aimessages,
        editedText,
        showModal,
        email,
        password,
        chats,
        currentChatId,
    }, dispatch] = useReducer(reducer, initialState)
    const setResult = (payload: string) => {
        dispatch({ type: 'GET_RESULT', payload })
    }

    const setLoad = (payload: boolean) => {
        dispatch({ type: 'SET_LOAD', payload })
    }

    const changeText1 = (payload: string) => {
        dispatch({ type: 'SET_TEXT1', payload })
    }
    const changeText2 = (payload: string) => {
        dispatch({ type: 'SET_TEXT2', payload })
    }
    const changeText3 = (payload: string) => {
        dispatch({ type: 'SET_TEXT3', payload })
    }

    const setChat = (payload: boolean) => {
        dispatch({ type: 'SET_CHAT', payload })
    }

    const setMessages = (payload: string[]) => {
        dispatch({ type: 'SET_MESSAGES', payload })
    }

    const setNewMessage = (payload: string) => {
        dispatch({ type: 'SET_NEWMESSAGE', payload })
    }
    const setAIMessage = (payload: string[]) => {
        dispatch({ type: 'SET_AIMESSAGES', payload })
    }
    const setEditedText = (payload: string) => {
        dispatch({ type: 'SET_EDITEDTEXT', payload })
    }

    const setShowModal = (payload: boolean) => {
        dispatch({ type: 'SET_SHOWMODAL', payload })
    }

    const setEmail = (payload: string) => {
        dispatch({ type: 'SET_EMAIL', payload })
    }

    const setPassword = (payload: string) => {
        dispatch({ type: 'SET_PASSWORD', payload })
    }
    const addChat = (payload: Chat) => {
        dispatch({ type: 'ADD_CHAT', payload });
    };

// Eliminar un chat por su ID
    const deleteChat = (payload: bigint) => {
        dispatch({ type: 'DELETE_CHAT', payload });
    };

// Cambiar el chat actual
    const setCurrentChatId = (payload: bigint) => {
        dispatch({ type: 'SET_CURRENTCHATID', payload });
    };

// Actualizar los mensajes del usuario en un chat específico
    const updateChatMessages = (currentChatID: bigint, messages: string[]) => {
        dispatch({ type: 'UPDATE_CHAT_MESSAGES', payload: { currentChatID, messages } });
    };

// Actualizar los mensajes de IA en un chat específico
    const updateChatAIMessages = (currentChatID: bigint, aimessages: string[]) => {
        dispatch({ type: 'UPDATE_CHAT_AIMESSAGES', payload: { currentChatID, aimessages } });
    };

    return{
        text1,
        text2,
        text3,
        result,
        loading,
        chat,
        messages,
        aimessages,
        newMessage,
        editedText,
        showModal,
        email,
        password,
        chats,
        currentChatId,
        addChat,
        deleteChat,
        setResult,
        setCurrentChatId,
        updateChatMessages,
        updateChatAIMessages,
        changeText1,
        changeText2,
        changeText3,
        setLoad,
        setChat,
        setMessages,
        setNewMessage,
        setAIMessage,
        setShowModal,
        setEditedText,
        setEmail,
        setPassword,

    }
}

