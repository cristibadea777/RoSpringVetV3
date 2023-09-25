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
    };

    try {
        const raspuns = await axios.post(apiEndpoint, cerere, customConfig)
        return raspuns.data
    } catch (error) {
        console.log("EROARE LA INREGISTRARE \n" + JSON.stringify(error))
        return null
    }

}
export {registerUser}