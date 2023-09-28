import { useEffect, useState } from "react"
import "./styles.css"
import { getAllObiecte, getPoza, getUserConectat, loginUser, registerUser } from "./AccesareAPI"

const LoginRegister = ({ setViewLoginRegister, setViewDashboard, setJwtToken, setUsername, setAuthority, setUserConectat, setPozaProfil,
                         api, setAnimale, setStapani, setAngajati, setVizite, setProgramari, setTratamente, 
                         setAnimaleUser, setViziteUser, setProgramariUser, setTratamenteUser
                      }) => {

    const [viewLogin,       setViewLogin]       = useState(true)
    const [viewRegister,    setViewRegister]    = useState(false)

    const [textNume,        setTextNume]        = useState('')
    const [textTelefon,     setTextTelefon]     = useState('')
    const [textEmail,       setTextEmail]       = useState('')
    const [textParola,      setTextParola]      = useState('')

    const [textEroare,      setTextEroare]      = useState('')

    const handleSchimbaAutentificare = () => {
        setViewRegister(false)
        setViewLogin(true)
    }
    const handleSchimbaInregistrare = () => {
        setViewLogin(false)
        setViewRegister(true)
    }


    const setareListeStapan = async ({jwtToken}) => {
        setAnimaleUser   (await getAllObiecte({jwtToken, apiEndpoint: `${api}/animale/stapan/getAllAnimaleStapan`}))
        setViziteUser    (await getAllObiecte({jwtToken, apiEndpoint: `${api}/tratamente/stapan/getAllTratamenteStapan`}))
        setTratamenteUser(await getAllObiecte({jwtToken, apiEndpoint: `${api}/tratamente/stapan/getAllTratamenteStapan`}))
        setProgramariUser(await getAllObiecte({jwtToken, apiEndpoint: `${api}/programari/stapan/getAllProgramariStapan`}))
    }

    const setareListeAngajat = async ({jwtToken}) => {
        setAngajati  (await getAllObiecte({jwtToken, apiEndpoint: `${api}/angajati/getAllAngajati`}))
        setStapani   (await getAllObiecte({jwtToken, apiEndpoint: `${api}/stapani/angajat/getAllStapani`}))
        setAnimale   (await getAllObiecte({jwtToken, apiEndpoint: `${api}/animale/angajat/getAllAnimale`}))
        setVizite    (await getAllObiecte({jwtToken, apiEndpoint: `${api}/vizite/angajat/getAllVizite`}))
        setTratamente(await getAllObiecte({jwtToken, apiEndpoint: `${api}/tratamente/angajat/getAllTratamente`}))
        setProgramari(await getAllObiecte({jwtToken, apiEndpoint: `${api}/programari/angajat/getAllProgramari`}))
    }

    const handleInregistrare = async () => {
        const raspuns = await registerUser({textNume, textTelefon, textEmail, textParola})
        setTextEroare(raspuns)
        if(raspuns === "Registered succesfully"){
            setViewRegister(false)
            setViewLogin(true)
        }
    }

    const handleAutentificare = async () => {
        const raspuns = await loginUser({textEmail, textParola})
        if(raspuns.user === null || raspuns.jwt === null)
            setTextEroare("Credențiale invalide")
        else{

            setViewRegister(false)
            setViewLogin(false)
            setViewLoginRegister(false)
            setViewDashboard(true)

            const jwtToken = raspuns.jwt
            const username = raspuns.user.username
            const authority = raspuns.user.authorities[0].authority
            setJwtToken(jwtToken)
            setUsername(username)
            setAuthority(authority)            
            
            if(authority === 'USER'){
                const apiEndpoint = `${api}/stapani/stapan/getStapanConectat`
                const stapan = await getUserConectat({jwtToken, apiEndpoint})
                setUserConectat(stapan)
                if(stapan.imagine === null){
                    setPozaProfil(await getPoza({jwtToken, apiEndpoint: `${api}/resources/poze_stapani/stapan_default.png`}))
                }else{
                    setPozaProfil(await getPoza({jwtToken, apiEndpoint: `${stapan.imagine}`}))
                }
                setareListeStapan({jwtToken})
            }
            if(authority === 'ADMIN'){
                const apiEndpoint = `${api}/angajati/getAngajatConectat`
                const admin = await getUserConectat({jwtToken, apiEndpoint})
                setUserConectat(admin)
                if(admin.imagine === null){
                    setPozaProfil(await getPoza({jwtToken, apiEndpoint: `${api}/resources/poze_angajati/angajat_default.png`}))
                }else{
                    setPozaProfil(await getPoza({jwtToken, apiEndpoint: `${admin.imagine}`}))
                }
                setareListeAngajat({jwtToken})
            } 
        }        
    }

    return(
        <>
        <div className="container-body">
            <div className="containerLinieLogin">
                <div className="containerSchimbaLoginRegister">
                    <button className="butonSchimba" onClick={handleSchimbaAutentificare}>
                        Autentificare
                    </button>
                    <button className="butonSchimba" onClick={handleSchimbaInregistrare}>
                        Înregistrare
                    </button>
                </div>
            </div>
            <div className="login-register">
                {viewRegister && (
                    <>
                    <div className="rowLoginRegister">
                        <div className="elementTextRowLoginRegister">
                            <p className="textLoginRegister">Nume</p>
                        </div>
                        <div className="elementInputRowLoginRegister">
                            <input className="inputLoginRegister"
                                value={textNume}
                                onChange={(evt) => {setTextNume(evt.target.value)}}
                            />
                        </div>
                    </div>
                    <div className="rowLoginRegister">
                        <div className="elementTextRowLoginRegister">
                            <p className="textLoginRegister">Telefon</p>
                        </div>
                        <div className="elementInputRowLoginRegister">
                            <input className="inputLoginRegister"
                                value={textTelefon}
                                onChange={(evt) => {setTextTelefon(evt.target.value)}}
                            />
                        </div>
                    </div>
                    </>
                )}
                <div className="rowLoginRegister">
                    <div className="elementTextRowLoginRegister">
                        <p className="textLoginRegister">Email</p>
                    </div>
                    <div className="elementInputRowLoginRegister">
                        <input className="inputLoginRegister"
                            value={textEmail}
                            onChange={(evt) => {setTextEmail(evt.target.value)}}
                        />
                    </div>
                </div>
                <div className="rowLoginRegister">
                    <div className="elementTextRowLoginRegister">
                        <p className="textLoginRegister">Parolă</p>
                    </div>
                    <div className="elementInputRowLoginRegister">
                        <input className="inputLoginRegister"
                            type="password"
                            value={textParola}
                            onChange={(evt) => {setTextParola(evt.target.value)}}
                        />
                    </div>
                </div>

                {viewLogin ? (
                <div className="rowLoginRegister">
                    <div className="containerButonLoginRegister">
                        <button className="butonLoginRegister" onClick={handleAutentificare}>
                            Autentificare
                        </button>
                    </div>
                </div>
                ) : (
                <div className="rowLoginRegister">
                    <div className="containerButonLoginRegister">
                        <button className="butonLoginRegister" onClick={handleInregistrare}>
                            Înregistrare
                        </button>
                    </div>
                </div>
                )}

            </div>
            <div className="containerLinieLogin">
                <div className="containerElementEroare">
                    <div className="elementEroare">
                        <p className="textEroare">{textEroare}</p>
                    </div>
                </div>
            </div>            
        </div>
        </>
    )
}
export default LoginRegister