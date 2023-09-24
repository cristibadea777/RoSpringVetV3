const LoginRegister = () => {
    return(
        <>
        <div className="titlu">
            <p className="titlu-text">Bun venit la RoSpringVet !</p>
        </div>

        <div className="container-body">
            <div className="login-register">
                <div className="rowLoginRegister">
                    <div className="elementRowLoginRegister">
                        <p className="textLoginRegister">Email</p>
                    </div>
                    <div className="elementRowLoginRegister">
                        <input className="inputLoginRegister"
                        />
                    </div>
                </div>
                <div className="rowLoginRegister">
                    <div className="elementRowLoginRegister">
                        <p className="textLoginRegister">Parolă</p>
                    </div>
                    <div className="elementRowLoginRegister">
                        <input className="inputLoginRegister"
                        type="password"
                        />
                    </div>
                </div>
                <div className="rowLoginRegister">
                    <div className="containerButonLoginRegister">
                        <button className="butonLoginRegister">
                        Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default LoginRegister