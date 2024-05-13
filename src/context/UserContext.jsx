import React, {useState} from 'react'
import { useEffect } from 'react'
import getElements from "../services/getElements.js";

const Context = React.createContext({})

export function UserContextProvider ({children}) {
    const [elements, setElements] = useState(['', ''])
    const [jwt, setJWT] = useState(
        () => window.sessionStorage.getItem('jwt')
    )

    useEffect(() => {
        if (!jwt) return setElements(['', ""])
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