const BASE_URL = 'http://192.168.1.174:3001'

// api call from the client to the backend

export const fetchMenu = async () => {
    console.log('fetchMenu called');
    const response = await fetch(`${BASE_URL}/api/menu`)
    console.log('menu res : ', response);

    if (!response.ok) throw new Error('Failed to fetch menu');
    return response.json();

}

export const sendChat = async (message, cart, history = [], reservations = []) => {
    const response = await fetch(`${BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, cart, history, reservations })
    })
    if (!response.ok) throw new Error('Failed to send chat');
    return response.json();
}

export const placeorder = async(cart) => {
    const response = await fetch(`${BASE_URL}/api/order`, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify({cart})
    })
    if (!response.ok) throw new Error('Failed to send chat');
    return response.json();
}

// few points about try-catch vs throw:
/*
- throw propogates the error
- catch handels the error then and there
- can throw inside the try block and will be catched inside catch
- can throw inside the catch block also, to log at that specific level and throw it up as well
- catch handles the error elegantly and does not crash the program
 */