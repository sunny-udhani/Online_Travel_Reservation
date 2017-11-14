const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';

export const getProfile = () =>
    fetch(`${api}/user/getProfile`)
        .then(res => res.json())
        .catch(error => {
            console.log("This is error.");
            return error;
        });
