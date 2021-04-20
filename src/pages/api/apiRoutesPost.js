import api from './api'

export default function postFunction(values) {

    return new Promise ((resolve, reject) => {
        api.post("users/signin", values)
            .then((response) => resolve(response.data))
            .catch((err) => {
                reject("ops! Error!" + err);
            });
    })
};

