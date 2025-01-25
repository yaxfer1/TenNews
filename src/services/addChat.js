const ENDPOINT = 'http://127.0.0.1:5000/api';

export default function addChatService({ jwt, chat_name }) {
    console.log("chat_name: ", chat_name)
    return fetch(`${ENDPOINT}/add_chat`, {
        method: 'POST',
        headers: {
            "Authorization": jwt,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ jwt, chat_name })// Pasar el id en el cuerpo de la solicitud
    })
        .then(res => {
            if (!res.ok) throw new Error('Response is NOT ok');
            return res.json();
        })
        .then(res => {
            const elements = res;
            console.log("objeto recibido: ")
            console.log("elemento recibido: ", elements)
            return elements;
        });
}
