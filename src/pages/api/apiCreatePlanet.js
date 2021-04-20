import api from './api'

export default function createPlanetFunction(roundid, values) {

    return new Promise ((resolve, reject) => {
        api.post(`/rounds/${roundid}/planets`, values)
            .then((response) => resolve(response.data))
            .catch((err) => {
                reject("ops! Error!" + err);
            });
    })
};

