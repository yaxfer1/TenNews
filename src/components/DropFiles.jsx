import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import DragAndDrop from "./DragAndDrop.jsx";
const AI_CHAT_FILES = 'http://127.0.0.1:5000/api/upload_files';



const DropFiles = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const onDrop = (acceptedFiles) => {
        const pdfFiles = acceptedFiles.filter((file) => file.type === "application/pdf");
        setFiles((prev) => [...prev, ...pdfFiles]);
    };

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {"application/pdf": []},
    });
    const uploadFiles = async () => {
        if (files.length === 0) {
            alert("No hay archivos para enviar.");
            return;
        }

        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });

        try {
            setUploading(true);

            const res = await fetch(AI_CHAT_FILES, {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                throw new Error(`Error al enviar los archivos. Código: ${res.status}`);
            }

            const data = await res.json();
            console.log("Respuesta del servidor:", data);
            alert("Archivos enviados correctamente.");
        } catch (error) {
            console.error("Error al enviar los archivos:", error.message);
        } finally {
            setUploading(false);
        }
    };
    return (
        <div
            {...getRootProps()}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: isDragActive ? "rgba(128, 128, 128, 0.5)" : "transparent",
                zIndex: isDragActive ? 999 : -1, // Visible solo cuando está activo
                transition: "background-color 0.3s ease",
            }}
        >
            <input {...getInputProps()} />
        </div>
    );
};
export default DropFiles;