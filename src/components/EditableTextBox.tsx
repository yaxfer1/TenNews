import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface EditableTextBoxProps {
    // Puedes agregar más propiedades según sea necesario

    showModal: boolean,
    editedText: string,
    setShowModal: (value: boolean) => void,
    onChange:(value: string) => void,
    text: string,
    setText: (value: string) => void,
}

const EditableTextBox = ({showModal, editedText, onChange, setShowModal, text, setText}:EditableTextBoxProps) => {

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    };


    const handleSaveChanges = () => {
        setText(editedText);
        setShowModal(false);
    };

    const handleCancel = () => {
        onChange(text)
        setShowModal(false);
    };

    return (
        <>
            <div
                style={{ border: "1px solid #ccc", padding: "10px", cursor: "pointer", marginTop:"50px", marginBottom:"50px" }}
                onClick={() => setShowModal(true)}
            >
                {"Click here to edit the context"}
            </div>

            <Modal show={showModal} onHide={handleCancel}
                   size={"xl"}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Text</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        as="textarea"
                        rows={27}
                        cols={180}
                        value={editedText}
                        onChange={handleTextChange}
                        style={{resize:"none"}}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditableTextBox;
