import api from './api'

export default function getPlanetStatus(values) {

    return new Promise ((resolve, reject) => {
        api.get("/rounds/current/planet", values)
            .then((response) => resolve(response.data))
            .catch((err) => {
                reject("ops! Planet Status error!" + err);
            });
    })
};

