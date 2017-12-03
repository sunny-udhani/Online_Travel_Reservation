const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';

const headers = {
    'Accept': 'application/json'
};

export const getFlightDetails = (payload) =>
    fetch(`${api}/users/getFlightDetails`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials: 'include'
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const getHotelDetails = (payload) =>
    fetch(`${api}/users/getHotelDetails`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials: 'include'
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

export const getCarDetails = (payload) =>
    fetch(`${api}/users/getCarDetails`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
        credentials: 'include'
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        return error;
    });