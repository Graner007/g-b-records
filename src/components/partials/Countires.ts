import axios from "axios";

type Result = {
    name: string;
    alpha3Code: string;
}

export type Country = {
    value: string;
    label: string;
}

export const countries = async () => {
    let result: Country[] = [];
    await axios.get("https://restcountries.eu/rest/v2/all")
        .then(res => {
            const data: Result[] = res.data;
            data.map(d => result.push({ value: d.alpha3Code, label: d.name }));

        })
        .catch(err => console.error(err));
    return result;
}