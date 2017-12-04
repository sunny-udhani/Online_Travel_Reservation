const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';

const headers = {
    'Accept': 'application/json'
};

export const editProfile = (payload) =>
    fetch(`${api}/users/editprofileofuser`, {
        method: 'POST',
        headers: {
            ...headers,
        },
        body: payload,
        credentials: 'include'

    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        return error;
    });
