import React, { useState } from 'react';
import { Dropdown, Button, Form, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import useUser from "../hooks/useUser.jsx";
import Login from "./Login/index.jsx";


function DropdownMenu({ onElementClick, type }) {
    const { isLogged, addElement, elements, rmElement } = useUser();
    const [showModal2, setShowModal2] = useState(false);

    // Estado para almacenar la lista de elementos
    // const [elements, setElements] = useState([]);
    // Estado para almacenar el valor del nuevo elemento a añadir
    const [newElement, setNewElement] = useState('');
    // Estado para controlar la visibilidad del modal
    const [showModal, setShowModal] = useState(false);


    const handleClose = () => {
        setShowModal(false);
    };

    const handleLogin = () => {
        setShowModal(false);
    };
    // Función para abrir el modal
    const openModal = () => {
        setShowModal(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setShowModal(false);
    };

    // Función para añadir un nuevo elemento a la lista
    const addElementModal = () => {
        if (newElement.trim() !== '') {
            addElement( newElement , type);
            closeModal();
            if (!isLogged) return setShowModal2(true);


            //setElements([...elements, newElement]);
            //setNewElement(''); // Limpiar el campo después de añadir el elemento
             // Cerrar el modal después de añadir el elemento
        }
    };

    // Función para eliminar un elemento de la lista
    const removeElement = (element) => {
        console.log("elemento eliminado")
        rmElement(element, type);
        console.log("elemento eliminado")
        //const updatedElements = elements.filter((el) => el !== element);

    };

    const handleElementClick = (element) => {
        // Llamar a la función proporcionada por la prop onElementClick
        onElementClick(element);
    };

    return (
        <>
            <Dropdown>
                <Dropdown.Toggle variant="outline-dark" id="dropdown-basic">
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {/* Iterar sobre la lista de elementos y mostrar cada uno */}
                    {console.log(elements, "elemento map")}
                    {elements[0].map((element, index) => (
                        elements[1][index] === type ? (
                            <OverlayTrigger
                                key={index}
                                placement="auto"
                                overlay={<Tooltip id={`tooltip-${index}`}>{element}</Tooltip>}
                            >
                                <Dropdown.ItemText>
                                    <div style={{ width: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {element}
                                    </div>
                                    <Button variant="light" onClick={() => handleElementClick(element)}>
                                        Select
                                    </Button>
                                    <Button variant="light" onClick={() => removeElement(element)}>
                                        Eliminar
                                    </Button>
                                </Dropdown.ItemText>
                            </OverlayTrigger>
                        ): null
                    ))}
                    {/* Botón para abrir el modal */}
                    <Dropdown.ItemText>
                        <Button variant="primary" onClick={openModal}>
                            Add
                        </Button>
                    </Dropdown.ItemText>
                </Dropdown.Menu>
            </Dropdown>

            {/* Modal para añadir un nuevo elemento */}
            <Modal show={showModal} onHide={closeModal} size={"xl"} >
                <Modal.Header closeButton>
                    <Modal.Title>Prompt Element</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Form.Control
                        as={"textarea"}
                        rows={10}
                        cols={120}
                        style={{resize:"none"}}
                        type="text"
                        value={newElement}
                        onChange={(e) => setNewElement(e.target.value)}
                        placeholder="Nuevo elemento"

                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={addElementModal}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            {showModal2 && (
                <Modal onClose={handleClose}>
                    <Login onLogin={handleLogin} />
                </Modal>
            )}
        </>
    );
}

export default DropdownMenu;
