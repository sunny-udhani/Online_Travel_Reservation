const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';

const headers = {
    'Accept': 'application/json'
};

export const addUserCard = (payload) =>
    fetch(`${api}/users/addusercard`, {
        method: 'POST',
        headers: {
            ...headers,
        },
        body: payload,
        credentials: 'include'
    }).then(res => {
        return res.status;
    }).catch(error => {
        console.log("This is error");
        return error;
    });
