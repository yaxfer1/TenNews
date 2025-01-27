import { useCallback, useEffect, useState } from "react";
import { Chat } from "../types"; // Ajusta la ruta según tu estructura
import loginService from "../services/login.js";
import addChatService from "../services/addChat.ts";
import { useStore } from "./useStore.tsx"; // Asegúrate de importar el useStore actualizado

export default function useUser() {
    // Usa el useStore para acceder al estado y las acciones
    const {
        jwt,
        chats,
        addChat,
        setChats,
        currentChatId,
        setCurrentChatId,
        setJWT,
    } = useStore();

    const [state, setState] = useState({ loading: false, error: false });

    // Login
    const login = useCallback(
        async ({ username, password }: { username: string; password: string }) => {
            setState({ loading: true, error: false });

            try {
                const token = await loginService({ username, password });
                window.sessionStorage.setItem("jwt", token);
                setJWT(token); // Usa setJWT del useStore
                setState({ loading: false, error: false });
            } catch (err) {
                console.error(err);
                window.sessionStorage.removeItem("jwt");
                setState({ loading: false, error: true });
            }
        },
        [setJWT] // Dependencia de setJWT
    );

    // Logout
    const logout = useCallback(() => {
        window.sessionStorage.removeItem("jwt");
        setJWT(null); // Usa setJWT del useStore
    }, [setJWT]);

    // Load chats from the server
    const loadChats = useCallback(async () => {
        console.log("JWT:", jwt);
        if (!jwt) return;

        try {
            const response = await fetch("http://127.0.0.1:5000/api/get_chats", {
                method: "POST",
                headers: {
                    Authorization: jwt,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ jwt }),
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch chats: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);

            // Verificar que data es del formato esperado
            if (Array.isArray(data) && data.length === 2 && Array.isArray(data[0]) && Array.isArray(data[1])) {
                const ids = data[0]; // Primer array: IDs
                const names = data[1]; // Segundo array: Nombres

                // Crear la lista de chats
                const formattedChats: Chat[] = ids.map((id: bigint, index: number) => ({
                    id: id,
                    name: names[index], // Tomar el nombre correspondiente por índice
                    messages: [], // Lista vacía de mensajes del usuario
                    aimessages: [], // Lista vacía de mensajes de la IA
                }));

                console.log(formattedChats);
                if (formattedChats.length > 0) {
                    setCurrentChatId(formattedChats[0].id); // Selecciona el primer chat si hay disponibles
                } else {
                    console.log("No chats available");
                }
                setChats(formattedChats); // Establecer el estado
            } else {
                console.error("Chats data is not in the expected format:", data);
            }

            return data;
        } catch (error) {
            console.error("Error loading chats:", error);
        }
    }, [jwt, setChats, setCurrentChatId]);

    // Cargar chats cuando el JWT cambie
    useEffect(() => {
        loadChats();
    }, [jwt, loadChats]);

    // Add a chat
    const addChatUser = useCallback(
        async (chat_name: string) => {
            console.log(chat_name);
            if (!jwt) return;

            try {
                console.log(chat_name);
                const response = await addChatService(jwt, chat_name);
                console.log("response addChatService");
                console.log(response);
                const newChat = await response.json();
                console.log(newChat);
                addChat(newChat); // Usa addChat del useStore
            } catch (error) {
                console.error("Error adding chat:", error);
            }
        },
        [jwt, addChat]
    );

    // Delete a chat
    const deleteChat = useCallback(
        async (chatId: bigint) => {
            if (!jwt) return;

            try {
                await fetch(`/api/chats/${chatId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                });

                //setChats((prevChats) => prevChats.filter((chat) => chat.id !== chatId)); // Usa setChats del useStore
            } catch (error) {
                console.error("Error deleting chat:", error);
            }
        },
        [jwt, setChats]
    );

    // Update messages in a specific chat
    const updateChatMessages = useCallback(
        (chatId: bigint, messages: string[]) => {
            setChats((prevChats) =>
                prevChats.map((chat) =>
                    chat.id === chatId ? { ...chat, messages } : chat
                )
            );
        },
        [setChats]
    );

    // Update AI messages in a specific chat
    const updateChatAIMessages = useCallback(
        (chatId: bigint, aimessages: string[]) => {
            setChats((prevChats) =>
                prevChats.map((chat) =>
                    chat.id === chatId ? { ...chat, aimessages } : chat
                )
            );
        },
        [setChats]
    );

    return {
        jwt,
        login,
        logout,
        isLogged: Boolean(jwt),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        currentChatId,
        addChatUser,
        deleteChat,
        updateChatMessages,
        updateChatAIMessages,
    };
}