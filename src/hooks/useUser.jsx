import { useCallback, useContext, useState } from 'react';
import Context from '../context/UserContext.tsx';
import loginService from '../services/login';
import addElementService from "../services/addElement.js";
import addChatService from "../services/addChat.js";
import rmElementService from "../services/rmElement.js";

export default function useUser() {
    const { jwt, setJWT , elements, setElements, chatlist, setChatlist} = useContext(Context);
    const [state, setState] = useState({ loading: false, error: false });

    const login = useCallback(({ username, password }) => {
        setState({ loading: true, error: false });
        loginService({ username, password })
            .then(jwt => {
                window.sessionStorage.setItem('jwt', jwt);
                setState({ loading: false, error: false });
                setJWT(jwt);
            })
            .catch(err => {
                window.sessionStorage.removeItem('jwt');
                setState({ loading: false, error: true });
                console.error(err);
            });
    }, [setJWT]);

    const addElement = useCallback((element, type) => {
        addElementService({ jwt, element, type })
            .then(newElement => {
                setElements(elements => [[...elements[0], newElement[0]],[...elements[1], newElement[1]]]);
           })
            .catch(err => {
                console.log("error setting elements");
                console.error(err);
            });
    }, [jwt, setElements]);

    const addChat = useCallback((chat_name) => {
        addElementService({ jwt, element, type })
            .then(newElement => {
                setChatlist(chatlist => [[...chatlist[0], newElement[0]],[...elements[1], newElement[1]]]);
            })
            .catch(err => {
                console.log("error setting elements");
                console.error(err);
            });
    }, [jwt, setChatlist]);

    const rmElement = useCallback((element, type) => {
        rmElementService({ jwt, element, type })
            .then(() => {
                const index = elements[0].indexOf(element);
                if (index !== -1) {
                    setElements(prevElements => [
                        [...prevElements[0].slice(0, index), ...prevElements[0].slice(index + 1)],
                        [...prevElements[1].slice(0, index), ...prevElements[1].slice(index + 1)]
                    ]);
                }
            })
            .catch(err => {
                console.log("error deleting elements");
                console.error(err);
            });
    }, [jwt, elements, setElements]);

    const logout = useCallback(() => {
        window.sessionStorage.removeItem('jwt');
        setJWT(null);
    }, [setJWT]);

    return {
        rmElement,
        addElement,
        elements,
        isLogged: Boolean(jwt),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        login,
        logout
    };
}
