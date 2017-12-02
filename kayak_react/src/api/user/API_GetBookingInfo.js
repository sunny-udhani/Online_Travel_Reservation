const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001';

const headers = {
    'Accept': 'application/json'
};

export const getbookinginfo_user = (payload) =>
    fetch(`${api}/users/getbookinginfo_user`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(res => {
        alert("succes fetch")
        return res.json();
        console.log(res )
    }).catch(error => {
        alert("err")
        console.log("This is error");
        return error;
    });
