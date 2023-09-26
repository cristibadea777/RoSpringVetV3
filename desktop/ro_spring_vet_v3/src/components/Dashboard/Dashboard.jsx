import "./styles.css"

const Dashboard = ( {jwtToken, username, authority} ) => {
    
    return(
        <div className="containerDashboard">
            <div className="containerInfo">
                <div className="containerPoza">
                    <div className="poza">
                        <img src=""></img>
                    </div>
                </div>
                <div className="containerTextInfo">
                    <div className="containerLinie">
                        <div className="containerLinieStanga">
                            <p className="text">Utilizator</p>
                        </div>
                        <div className="containerLinieDreapta">
                            <p className="text">Utilizator</p>
                        </div>
                    </div>
                    <div className="containerLinie">
                        <div className="containerLinieStanga">
                            <p className="text">Telefon</p>
                        </div>
                        <div className="containerLinieDreapta">
                            <p className="text">Telefon</p>
                        </div>
                    </div>
                    <div className="containerLinie">
                        <div className="containerLinieStanga">
                            <p className="text">Email</p>
                        </div>
                        <div className="containerLinieDreapta">
                            <p className="text">{username}</p>
                        </div>
                    </div>
                </div>
                <div className="containerButoane">
                    <div className="butoane">
                        <button className="buton">Setări</button>
                    </div>
                </div>
            </div>
            <div className="container"></div>
        </div>    
    )

}
export default Dashboard