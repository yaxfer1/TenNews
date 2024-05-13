const ENDPOINT = 'http://127.0.0.1:5000/api';

export default function login ({ username, password }) {
    return fetch(`${ENDPOINT}/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    }).then(res => {
        if (!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    }).then(res => {
        const { jwt } = res
        return jwt
    })
}