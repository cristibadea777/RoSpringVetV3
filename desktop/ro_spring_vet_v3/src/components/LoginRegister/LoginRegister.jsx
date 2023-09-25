import { useEffect, useState } from "react"
import "./styles.css"
import { loginUser, registerUser } from "./AccesareAPI"

const LoginRegister = ({setViewLoginRegister, setViewDashboard, setJwtToken}) => {

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
        if(raspuns === "")
            setTextEroare("Credențiale invalide")
        else{
            setViewRegister(false)
            setViewLogin(false)
            setViewLoginRegister(false)
            setViewDashboard(true)
            setJwtToken(raspuns)
        }        
    }

    return(
        <>
        <div className="container-body">
            <div className="containerLinie">
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
            <div className="containerLinie">
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