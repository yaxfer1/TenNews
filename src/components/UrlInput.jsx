import React, { useState } from "react";
const URL_SCRAPING = 'http://127.0.0.1:5000/api/scrap_url';

const TextUploader = () => {
    const [text, setText] = useState("");
    const [uploading, setUploading] = useState(false);
    const [submittedUrls, setSubmittedUrls] = useState([]); // Estado para las URLs enviadas

    const handleSubmit = (e) => {
        e.preventDefault();
        sendTextToBackend(text);
    };

    const sendTextToBackend = async (text) => {
        if (!text.trim()) {
            alert("El texto está vacío. Por favor, introduce un texto válido.");
            return;
        }

        try {
            setUploading(true);

            const res = await fetch(URL_SCRAPING, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(text),
            });

            if (!res.ok) {
                throw new Error(`Error al enviar el texto. Código: ${res.status}`);
            }

            const data = await res.json();
            console.log("Respuesta del servidor:", data);

            // Añadir la URL enviada a la lista
            setSubmittedUrls((prevUrls) => [...prevUrls, text]);

            alert("Texto enviado correctamente.");
            setText("");
        } catch (error) {
            console.error("Error al enviar el texto:", error.message);
            alert("Hubo un error al enviar el texto.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Introduce la URL aquí"
                    rows={1}
                    style={{
                        width: "100%",
                        padding: "10px",
                        borderRadius: "4px",
                        border: "1px solid #ccc",
                        resize: "none",
                    }}
                ></textarea>
                <button
                    type="submit"
                    style={{
                        marginTop: "10px",
                        padding: "10px 20px",
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                    disabled={uploading}
                >
                    {uploading ? "Enviando..." : "Enviar"}
                </button>
            </form>

            {/* Mostrar la lista de URLs enviadas */}
            <div style={{ marginTop: "20px" }}>
                <ul>
                    {submittedUrls.map((url, index) => (
                        <li key={index} style={{ wordWrap: "break-word" }}>
                            {url}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TextUploader;
