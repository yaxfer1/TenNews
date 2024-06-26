import React from "react";
import "./styles.css";
import {Button} from "react-bootstrap"; // Importa tu archivo CSS
import logoupv from "../assets/react.svg"
import {useRoute, Link} from 'wouter'
import useUser from "../hooks/useUser.jsx"
import {navigate} from "wouter/use-hash-location";
interface MainHeaderProps{
    boton: boolean
    chat: boolean
}
export const MainHeader = ({boton, chat}: MainHeaderProps) => {


    const {isLogged, logout} = useUser()
    const [match] = useRoute("/");

    const handleClick = e => {
        //e.preventDefault()
        logout()
    }
    const renderLoginButtons = ({isLogged}) => {
        return isLogged
            ? <Link style={{
                display: 'inline-block', // Para que el enlace se comporte como un bloque
                backgroundColor: '#0d6efd', // Color de fondo del botón
                color: 'white', // Color del texto
                textDecoration: 'none', // Para eliminar el subrayado del texto del enlace
                padding: '6px 14px', // Espacio alrededor del texto
                borderRadius: '6px', // Bordes redondeados
                border: 'none', // Sin borde
                cursor: 'pointer',
                fontSize: '14px',
                // Cambia el cursor al pasar sobre el botón
            }}  onClick={handleClick} to='/'>
                Logout
            </Link>
            : <>
                <Link to='/'>
                    Login
                </Link>
            </>
    }
    const content = match
        ? null
        : renderLoginButtons({isLogged})



    return (
        <header id="mainheader" style={{height:"5vw"}}>
            <div>
                <img src={logoupv} alt={"Logo UPV"}></img>
            </div>
            <nav className="flex w-full justify-center">
            <ul className="flex text-b">
                    <li></li>
                    <li></li>
                </ul>
            </nav>
            <nav>
                <ul className="flex text-b">
                    <li><a
                        onClick={boton}
                        href="#"
                        style={{
                            color: chat === true ? "black" : "gray",
                            pointerEvents: chat === true ? "auto" : "none",
                            borderBottom: chat === false ? "3px solid #0d6efd" : "none",
                            paddingBottom: "2px", // Espaciado opcional
                            transition: 'opacity 0.5s ease-in-out',
                        }}
                    >Chat</a></li>
                    <li><a
                        onClick={boton}
                        href="#"
                        style={{
                            color: chat === false ? "black" : "gray",
                            pointerEvents: chat === false ? "auto" : "none",
                            borderBottom: chat === true ? "3px solid #0d6efd" : "none",
                            paddingBottom: "2px", // Espaciado opcional
                            transition: 'opacity 0.5s ease-in-out',
                        }}
                    >Generator</a></li>
                </ul>

            </nav>
            {content}
        </header>
    );
};

export default MainHeader;