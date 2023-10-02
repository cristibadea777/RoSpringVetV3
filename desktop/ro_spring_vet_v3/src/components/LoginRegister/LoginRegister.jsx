import { useState } from "react"
import "./LoginRegister.css"
import { getPoza, getUserConectat, loginUser, registerUser } from "./AccesareAPI"

const LoginRegister = ({ setViewLoginRegister, setViewDashboard, setJwtToken, setUsername, setAuthority, setUserConectat, setPozaProfil, api }) => {

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
            } 
        }        
    }

    const RowLoginRegister = ({label, functie}) => {

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