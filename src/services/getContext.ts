const GET_CONTEXT = 'http://127.0.0.1:5000/api/get_context';

export const getContext = async (context: string) => {
    try {
        const res = await fetch(GET_CONTEXT, {
            method: 'POST',  // Puedes cambiar el método según tus necesidades
            headers: {
                'Content-Type': 'application/json',
            },
            // Puedes incluir un cuerpo (body) si es necesario
            // body: JSON.stringify({ contexto }),
            body: JSON.stringify( context ),
        });

        if (!res.ok) {
            throw new Error(`Error al establecer el contexto. Código: ${res.status}`);
        }

        const data = await res.json();

        return data.toString();
    } catch (error) {
        console.error('Error durante la solicitud:', error.message);
        throw error;
    }
};

