export const sendUrlScrap = async (text) => {
    if (!text.trim()) {
        alert("El texto está vacío. Por favor, introduce un texto válido.");
        return;
    }

    const formData = new FormData();
    formData.append("text", text); // Adjuntamos el texto como un campo de formulario

    try {
        // Indicar que estamos en proceso de enviar
        setUploading(true);

        // Enviar al backend
        const res = await fetch('/api/scrap_url', {
            method: 'POST',
            body: formData,
        });

        if (!res.ok) {
            throw new Error(`Error al enviar el texto. Código: ${res.status}`);
        }

        const data = await res.json();
        console.log("Respuesta del servidor:", data);
        alert("Texto enviado correctamente.");
    } catch (error) {
        console.error("Error al enviar el texto:", error.message);
        alert("Hubo un error al enviar el texto.");
    } finally {
        // Indicar que finalizó el envío
        setUploading(false);
    }
};
