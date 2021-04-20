import api from './api'

export default function getCurrentRound(values) {

    return new Promise ((resolve, reject) => {
        api.get("rounds/current", values)
            .then((response) => resolve(response.data))
            .catch((err) => {
                reject("ops! Round error!" + err);
            });
    })
};

