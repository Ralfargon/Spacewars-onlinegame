import api from './api'

export default function getMe(values) {

    return new Promise ((resolve, reject) => {
        api.get("/users/me", values)
            .then((response) => resolve(response.data))
            .catch((err) => {
                reject("ops! Planet Status error!" + err);
            });
    })
};

