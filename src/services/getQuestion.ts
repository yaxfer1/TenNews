const GET_QUESTION = 'http://127.0.0.1:5000/api/get_result';

export const getQuestion = async () => {
    try {
        const res = await fetch(GET_QUESTION);

        if (!res.ok) {
            throw new Error(`Error al obtener la pregunta. Código: ${res.status}`);
        }

        const data = await res.json();

        return data;
    } catch (error) {

        // @ts-ignore
        console.error('Error durante la solicitud:', error.message);
        throw error; // Puedes lanzar o manejar el error según tus necesidades
    }
};

