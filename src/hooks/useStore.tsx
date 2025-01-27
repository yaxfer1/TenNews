import { createContext, useContext, useReducer, useMemo, ReactNode } from 'react';
import { Chat, State, Action } from '../types'; // Asegúrate de importar tus tipos

// Estado inicial
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
    chats: [], // Lista de chats
    jwt: "", // JWT para autenticación
};

// Reducer
function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_TEXT1':
            return { ...state, text1: action.payload };
        case 'SET_TEXT2':
            return { ...state, text2: action.payload, editedText: action.payload };
        case 'SET_TEXT3':
            return { ...state, text3: action.payload };
        case 'GET_RESULT':
            return { ...state, result: action.payload };
        case 'SET_LOAD':
            return { ...state, loading: action.payload };
        case 'SET_CHAT':
            return { ...state, chat: action.payload };
        case 'SET_AIMESSAGES':
            return { ...state, aimessages: action.payload };
        case 'SET_EDITEDTEXT':
            return { ...state, editedText: action.payload };
        case 'SET_SHOWMODAL':
            return { ...state, showModal: action.payload };
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_PASSWORD':
            return { ...state, password: action.payload };
        case 'SET_NEWMESSAGE':
            return { ...state, newMessage: action.payload };
        case 'ADD_CHAT':
            return { ...state, chats: [...state.chats, action.payload] };
        case 'SET_CHATS':
            return { ...state, chats: action.payload };
        case 'DELETE_CHAT':
            return { ...state, chats: state.chats.filter((chat) => chat.id !== action.payload) };
        case 'SET_CURRENTCHATID':
            return { ...state, currentChatId: action.payload };
        case 'UPDATE_CHAT_MESSAGES':
            return {
                ...state,
                chats: state.chats.map((chat) =>
                    chat.id === action.payload.currentChatID
                        ? { ...chat, messages: action.payload.messages }
                        : chat
                ),
            };
        case 'UPDATE_CHAT_AIMESSAGES':
            return {
                ...state,
                chats: state.chats.map((chat) =>
                    chat.id === action.payload.currentChatID
                        ? { ...chat, aimessages: action.payload.aimessages }
                        : chat
                ),
            };
        case 'SET_JWT':
            return { ...state, jwt: action.payload };
        default:
            return state;
    }
}

// Crear el contexto
const StoreContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
} | null>(null);

// Proveedor del contexto
export function StoreProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Memorizar el valor del contexto para optimizar rendimiento
    const value = useMemo(() => ({ state, dispatch }), [state]);

    return (
        <StoreContext.Provider value={value}>
           {children}
        </StoreContext.Provider>
    );
}

// Hook para consumir el contexto
export function useStore() {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore debe usarse dentro de un StoreProvider');
    }
    const { state, dispatch } = context;

    // Acciones
    const setResult = (payload: string) => dispatch({ type: 'GET_RESULT', payload });
    const setLoad = (payload: boolean) => dispatch({ type: 'SET_LOAD', payload });
    const changeText1 = (payload: string) => dispatch({ type: 'SET_TEXT1', payload });
    const changeText2 = (payload: string) => dispatch({ type: 'SET_TEXT2', payload });
    const changeText3 = (payload: string) => dispatch({ type: 'SET_TEXT3', payload });
    const setChat = (payload: boolean) => dispatch({ type: 'SET_CHAT', payload });
    const setMessages = (payload: string[]) => dispatch({ type: 'SET_MESSAGES', payload });
    const setNewMessage = (payload: string) => dispatch({ type: 'SET_NEWMESSAGE', payload });
    const setAIMessage = (payload: string[]) => dispatch({ type: 'SET_AIMESSAGES', payload });
    const setEditedText = (payload: string) => dispatch({ type: 'SET_EDITEDTEXT', payload });
    const setShowModal = (payload: boolean) => dispatch({ type: 'SET_SHOWMODAL', payload });
    const setEmail = (payload: string) => dispatch({ type: 'SET_EMAIL', payload });
    const setPassword = (payload: string) => dispatch({ type: 'SET_PASSWORD', payload });
    const addChat = (payload: Chat) => dispatch({ type: 'ADD_CHAT', payload });
    const deleteChat = (payload: bigint) => dispatch({ type: 'DELETE_CHAT', payload });
    const setCurrentChatId = (payload: bigint) => dispatch({ type: 'SET_CURRENTCHATID', payload });
    const setChats = (payload: Chat[]) => dispatch({ type: 'SET_CHATS', payload });
    const updateChatMessages = (currentChatID: bigint, messages: string[]) =>
        dispatch({ type: 'UPDATE_CHAT_MESSAGES', payload: { currentChatID, messages } });
    const updateChatAIMessages = (currentChatID: bigint, aimessages: string[]) =>
        dispatch({ type: 'UPDATE_CHAT_AIMESSAGES', payload: { currentChatID, aimessages } });
    const setJWT = (payload: string | null) => dispatch({ type: 'SET_JWT', payload });

    return {
        ...state,
        setResult,
        setLoad,
        changeText1,
        changeText2,
        changeText3,
        setChat,
        setMessages,
        setNewMessage,
        setAIMessage,
        setEditedText,
        setShowModal,
        setEmail,
        setPassword,
        addChat,
        deleteChat,
        setCurrentChatId,
        setChats,
        updateChatMessages,
        updateChatAIMessages,
        setJWT,
    };
}