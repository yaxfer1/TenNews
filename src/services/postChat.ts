const AI_CHAT = 'http://127.0.0.1:5000/api/ai_chat';

export const postChat = async (chat: string) => {
    try {
        const res = await fetch(AI_CHAT, {
            method: 'POST',  // Puedes cambiar el método según tus necesidades
            headers: {
                'Content-Type': 'application/json',
            },
            // Puedes incluir un cuerpo (body) si es necesario
            // body: JSON.stringify({ contexto }),
            body: JSON.stringify( chat ),
        });

        if (!res.ok) {
            throw new Error(`Error al establecer el contexto. Código: ${res.status}`);
        }

        const data = await res.json();

        return data.toString();
    } catch (error) {
        // @ts-ignore
        console.error('Error durante la solicitud:', error.message);
        throw error;
    }
};
