import {useState, useEffect} from "react";

const localCache = {}

const useBreedList = (animal) => {
    const [breedList, setBreedList] = useState([]);
    const [status, setStatus] = useState("unloaded");

    useEffect(() => {
        if (!animal) {
            setBreedList([]);
        } else if (localCache[animal]) {
            setBreedList(localCache[animal]);
        } else {
            requestBreedList();
        } 

        async function requestBreedList() {
            setBreedList([]);
            setStatus("loading");

            const rest = await fetch(
                `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
            );
            const json = await rest.json();
            localCache[animal] = json.breeds || [];
            setBreedList(localCache[animal]);
            setStatus("loaded");
        }
    }, [animal]);

    return [breedList, status];
};

export default useBreedList;
