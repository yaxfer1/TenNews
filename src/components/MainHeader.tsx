import React from "react";
import "./styles.css";
import {Button} from "react-bootstrap"; // Importa tu archivo CSS
import logoupv from "../assets/react.svg"
interface MainHeaderProps{
    boton: boolean
    chat: boolean
}
export const MainHeader = ({boton, chat}: MainHeaderProps) => {


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
                            borderBottom: chat === false ? "3px solid blue" : "none",
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
                            borderBottom: chat === true ? "3px solid blue" : "none",
                            paddingBottom: "2px", // Espaciado opcional
                            transition: 'opacity 0.5s ease-in-out',
                        }}
                    >Generador</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default MainHeader;