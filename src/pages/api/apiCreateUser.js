import api from './api'

export default function createUserFunction(values) {

    return new Promise ((resolve, reject) => {
        api.post("users", values)
            .then((response) => resolve(response.data))
            .catch((err) => {
                reject("ops! Error!" + err);
            });
    })
};

