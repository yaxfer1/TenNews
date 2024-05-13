const ENDPOINT = 'http://127.0.0.1:5000/api';

export default function addElement({ jwt, element, type }) {
    console.log("element: ", element, "type: ", type)
    return fetch(`${ENDPOINT}/add_element`, {
        method: 'POST',
        headers: {
            "Authorization": jwt,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ jwt, element, type })// Pasar el id en el cuerpo de la solicitud
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
