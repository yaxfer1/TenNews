import React, { createContext, useState, useEffect } from "react";
import getElements from "../services/getElements.js"; // Cambia según tus necesidades
import { Chat, Action, State} from "../types";

const Context = createContext<UserContextProps>({
    jwt: null,
    setJWT: () => {},
    //chats: [],
    //setChats: () => Action.payload,
    currentChatId: BigInt(1n),
    setCurrentChatId: () => {},
});
export default Context;

interface UserContextProps {
    jwt: string | null;
    setJWT: React.Dispatch<React.SetStateAction<string | null>>;
    //chats: Chat[];
    //setChats: Action.payload;
    currentChatId: bigint;
    setCurrentChatId: React.Dispatch<React.SetStateAction<bigint>>;
}

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [jwt, setJWT] = useState(() => window.sessionStorage.getItem("jwt"));
    const [elements, setElements] = useState(['', '']);
    //const [chats, setChats] = useState<Chat[]>([]);
    const [currentChatId, setCurrentChatId] = useState<bigint>(1n);

    // Cargar elementos al iniciar sesión
    useEffect(() => {
        if (!jwt) {
            setElements(['', ""]);
            //setChats();
            return;
        }

        const fetchElements = async () => {
            try {
                const response = await getElements({ jwt });
                setElements(response);
            } catch (error) {
                console.error("Error fetching elements:", error);
            }
        };

        fetchElements();
    }, [jwt]);

    // Función para cargar los chats del backend

    return (
        <Context.Provider
            value={{
                jwt,
                setJWT,
                elements,
                //chats,
                currentChatId,
                setCurrentChatId,

            }}
        >
            {children}
        </Context.Provider>
    );
}
