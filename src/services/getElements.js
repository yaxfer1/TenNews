const ENDPOINT = 'http://127.0.0.1:5000/api';

export default function getElements({ jwt }) {
    return fetch(`${ENDPOINT}/get_elements`, {
        method: 'POST',
        headers: {
            "Authorization": jwt,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ jwt })
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok');
        return res.json();
    }).then(res => {
        const elements = res;
        console.log(elements, "elementos obtenidos")
        return elements;
    });
}