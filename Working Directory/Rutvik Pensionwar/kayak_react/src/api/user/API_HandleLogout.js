const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';

const headers = {
    'Accept': 'application/json'
};

export const doLogout = () =>
    fetch(`${api}/users/logout`, {
        method: 'POST',
        headers: {
            ...headers
        },
        credentials: 'include'
    }).then(res => {
        return res.status;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });