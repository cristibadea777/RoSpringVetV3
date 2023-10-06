import axios from "axios"

const registerUser = async ({textNume, textTelefon, textEmail, textParola}) => {
    const apiEndpoint = 'http://localhost:8000/auth/register'
    const cerere = {        
        "nume"        :   textNume,
        "telefon"     :   textTelefon,
        "username"    :   textEmail,
        "password"    :   textParola
    }
    const customConfig = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const raspuns = await axios.post(apiEndpoint, cerere, customConfig)
        return raspuns.data
    } catch (error) {
        console.log("EROARE LA INREGISTRARE \n" + JSON.stringify(error))
        return null
    }
}

const loginUser = async ({textEmail, textParola}) => {
    const apiEndpoint = 'http://localhost:8000/auth/login'
    const cerere = {        
        "username"    :   textEmail,
        "password"    :   textParola
    }
    const customConfig = {
        headers: {
        'Content-Type': 'application/json'
        }
    }
    try {
        const raspuns = await axios.post(apiEndpoint, cerere, customConfig)
        return raspuns.data
    } catch (error) {
        console.log("EROARE LA AUTENTIFICARE \n" + JSON.stringify(error))
        return null
    }
}

const getUserConectat = async ({jwtToken, apiEndpoint}) => {
    const config = {
        headers: {
            'Authorization' : `Bearer ${jwtToken}`,
            'Content-Type'  : 'application/json'
        }
    }
    try {
        const raspuns = await axios.get(apiEndpoint, config)
        return raspuns.data
    } catch (error) { error => {console.log(error)} }
}

const getPoza = async ({jwtToken, apiEndpoint}) => {
    const config = {
        headers: {
            'Authorization' : `Bearer ${jwtToken}`,
        }, 
        responseType  : 'blob'
    }
    try {
        const response = await axios.get(apiEndpoint, config);
        const blob = response.data; //binary data
        const reader = new FileReader()
        reader.readAsDataURL(blob);//blob in base64
        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                const base64 = reader.result;
                resolve(base64)
            }
            reader.onerror = (error) => {
                reject(error)
            }
        })
    } catch (error) { console.log(error) }
}

const salvarePoza = async ({api, poza, folder, idEntitate, jwtToken}) => {
    const apiEndpoint = `${api}/poze/salvarePoza`
    const customConfig = {
        headers: {
            'Authorization' : `Bearer ${jwtToken}`,
            'Content-Type'  : 'application/json',
        },
    }
    const cerere = {
        "base64String"      :   poza,
        "folder"            :   folder,
        "numePoza"          :   idEntitate,
    }
    try {
        const raspuns = await axios.post(apiEndpoint, cerere, customConfig)
        return raspuns.data
    } catch (error) {
        console.log("EROARE LA SALVARE POZA \n" + JSON.stringify(error))
        return "EROARE LA SALVARE POZA"
    }
}

const logout = async ({jwtToken, setJwtToken, api}) => {
    const apiEndpoint = `${api}/auth/logout`
    const config = {
        headers: {
            'Authorization' : `Bearer ${jwtToken}`,
            'Content-Type'  : 'application/json'
        }
    }
    try {
        await axios.get(apiEndpoint, config)
    } catch (error) { (error) => { console.log(error ) } }
    setJwtToken('')
}

const getAllObiecte = async ({jwtToken, apiEndpoint}) => {
    const config = {
        headers: {
            'Authorization' : `Bearer ${jwtToken}`,
            'Content-Type'  : 'application/json'
        }
    }
    try {
        const response = await axios.get(apiEndpoint, config)
        console.log(response.data)
        return response.data
    } catch (error) { console.log(error) }
}

const editAnimal = async ({jwtToken, apiEndpoint, idAnimalCurent, numeAnimalCurent, specieAnimalCurent, rasaAnimalCurent}) => {
    const cerere = {
        "animalId"    :   idAnimalCurent,        
        "nume"        :   numeAnimalCurent,
        "specie"      :   specieAnimalCurent,
        "rasa"        :   rasaAnimalCurent,
    }
    const customConfig = {
        headers: {
            'Authorization' : `Bearer ${jwtToken}`,
            'Content-Type': 'application/json'
        }
    }
    try {
        const raspuns = await axios.post(apiEndpoint, cerere, customConfig)
        return raspuns.data
    } catch (error) {
        console.log("EROARE LA EDITARE ANIMAL \n" + JSON.stringify(error))
        return "EROARE LA EDITARE ANIMAL"
    }
}

export { registerUser, loginUser, getUserConectat, getPoza, logout, getAllObiecte, editAnimal, salvarePoza }