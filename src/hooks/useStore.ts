import { useReducer} from 'react'
import { type Action, type State } from '../types'


const initialState: State = {
    text1: 'You are a helpful assistant that create news articles about mainly AI and NLP topic. You are fed into a database of AI and NLP papers, so please, use the context passed to generate the news article. If you have' +
        ' not enough context to generate a reliable news article say "I don\'t know"',
    text2: 'Here is the context',
    text3: 'Explain in an article using a language that all the people understands how does the Transformers Architecture works.',
    loading: false,
    result: '',
    chat: false,
    messages: [],
    aimessages: [],
    newMessage: '',
    showModal: false,
    editedText: '',
    email: '',
    password: ''

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
        setResult,
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

