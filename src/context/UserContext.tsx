import React, {useState} from 'react'
import { useEffect } from 'react'
import getElements from "../services/getElements.js";
import {type Chat} from '../types'
const Context = React.createContext({})


export function UserContextProvider ({children}) {
    const [elements, setElements] = useState(['', ''])
    const [jwt, setJWT] = useState(
        () => window.sessionStorage.getItem('jwt')
    )
    const [chats,setChats] = useState<Chat[]>([])
    const [currentChatId, setCurrentChatId] = useState<bigint>(1n);
    useEffect(() => {
        if (!jwt) {
            setElements(['', ""])
            setChats([]);
            return;
        }
        console.log(getElements({jwt}).then(setElements))


    }, [jwt])

    return <Context.Provider value={{
        elements,
        jwt,
        setElements,
        setJWT
    }}>
        {children}
    </Context.Provider>
}

export default Context