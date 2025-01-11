import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
const AI_CHAT_FILES = 'http://127.0.0.1:5000/api/upload_files';

const DragAndDrop = () => {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);

    const onDrop = (acceptedFiles) => {
        const pdfFiles = acceptedFiles.filter((file) => file.type === "application/pdf");
        setFiles((prev) => [...prev, ...pdfFiles]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "application/pdf": [] },
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            {/* Drag-and-Drop Area */}
            <div
                {...getRootProps()}
                style={{
                    border: "2px dashed #cccccc",
                    padding: "5px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: isDragActive ? "#f0f8ff" : "white",
                    width: "100%",
                    height: "100%",
                    marginBottom: "1px",

                }}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Suelta tus archivos aquí...</p>
                ) : (
                    <p>Arrastra y suelta tus archivos PDF aquí, o haz clic para seleccionar</p>
                )}
            </div>

            {/* List of Uploaded Files */}
            <div style={{ width: "100%" }}>

                <ul>
                    {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                </ul>
            </div>

            {/* Upload Button */}
            <button
                onClick={uploadFiles}
                disabled={uploading}
                style={{
                    marginTop: "0px",
                    padding: "2px 5px",
                    backgroundColor: uploading ? "#ccc" : "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: uploading ? "not-allowed" : "pointer",
                }}
            >
                {uploading ? "Subiendo..." : "Enviar"}
            </button>
        </div>
    );
};
export default DragAndDrop;
