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

const getAllStapani =  ({jwtToken}) => {
    console.log(jwtToken)
    const apiEndpoint = 'http://localhost:8000/stapani/angajat/getAllStapani'
    const config = {
        headers: {
            'Authorization' : `Bearer ${jwtToken}`,
            'Content-Type'  : 'application/json'
        }
    }
    axios.get(apiEndpoint, config).then(response => {
        console.log(response.data)
    }).catch(error => { console.log(error) })
}

const getStapanConectat = async ({jwtToken}) => {
    const apiEndpoint = 'http://localhost:8000/stapani/stapan/getStapanConectat'
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

const getPozaDefaultStapan = async ({jwtToken}) => {
    const apiEndpoint = 'http://localhost:8000/resources/poze_stapani/stapan_default.png'
    const config = {
        headers: {
            'Authorization' : `Bearer ${jwtToken}`,
        }, 
        responseType  : 'blob'
    }
    try {
        const response = await axios.get(apiEndpoint, config);
        const blob = response.data; // Binary data
    
        // Convert the blob to base64
        const reader = new FileReader();
        reader.readAsDataURL(blob);
    
        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                const base64 = reader.result;
                resolve(base64);
            };
    
            reader.onerror = (error) => {
                reject(error);
            };
        });
    } catch (error) {
        console.log(error);
    }
}



export {registerUser, loginUser, getAllStapani, getStapanConectat, getPozaDefaultStapan}