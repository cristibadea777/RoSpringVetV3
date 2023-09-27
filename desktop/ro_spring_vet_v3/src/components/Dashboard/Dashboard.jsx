import { useEffect } from "react"
import { getAllStapani, getStapanConectat } from "../LoginRegister/AccesareAPI"
import "./styles.css"

const Dashboard = ( {jwtToken, username, authority, stapanConectat, stapanImgDefault} ) => {

    return(
        <div className="containerDashboard">
            <div className="containerInfo">
                <div className="containerPoza">
                    <div className="poza">
                        <img src={stapanImgDefault} />
                    </div>
                </div>
                <div className="containerTextInfo">
                    <div className="containerLinie">
                        <div className="containerLinieStanga">
                            <p className="text">Utilizator</p>
                        </div>
                        <div className="containerLinieDreapta">
                            <p className="text">{stapanConectat.nume}</p>
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
                    <div className="containerLinie">
                        <div className="containerLinieStanga">
                            <p className="text">Rol</p>
                        </div>
                        <div className="containerLinieDreapta">
                            <p className="text">{authority}</p>
                        </div>
                    </div>
                    <div className="containerLinie">
                        <div className="containerLinieStanga">
                        </div>
                        <div className="containerLinieDreapta">
                            <button className="buton">Setări</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="containerSecundar">
                <div className="containerSecundarStanga">
                    <div className="containerLinie">
                        <div className="containerLinieStanga">
                            <p className="text">Programări neconfirmate</p>
                        </div>
                        <div className="containerLinieDreapta">
                            <button className="buton">Nr</button>
                        </div>
                    </div>
                    <div className="containerLinie">
                        <div className="containerLinieStanga">
                            <p className="text">Programări azi</p>
                        </div>
                        <div className="containerLinieDreapta">
                            <button className="buton">Nr</button>
                        </div>
                    </div>
                    <div className="containerLinie">
                        <div className="containerLinieStanga">
                            <p className="text">Programări mâine</p>
                        </div>
                        <div className="containerLinieDreapta">
                            <button className="buton">Nr</button>
                        </div>
                    </div>
                    <div className="containerLinie">
                        <div className="containerLinieStanga">
                            <p className="text">Tratamente azi</p>
                        </div>
                        <div className="containerLinieDreapta">
                            <button className="buton">Nr</button>
                        </div>
                    </div>
                    <div className="containerLinie">
                        <div className="containerLinieStanga">
                            <p className="text">Tratamente mâine</p>
                        </div>
                        <div className="containerLinieDreapta">
                            <button className="buton">Nr</button>
                        </div>
                    </div>                    
                </div>
                <div className="cotainerSecundarDreapta">
                    <div className="linieContainerSecundarDreapta">
                        <div className="containerLinieStanga">
                            <p className="text">Vizite efectuate</p>
                        </div>
                        <div className="containerLinieDreapta">
                            <p className="text">Total</p>
                        </div>
                    </div>
                    <div className="linieContainerSecundarDreapta">
                        <div className="containerLinieStanga">
                            <p className="text">Total animale</p>
                        </div>
                        <div className="containerLinieDreapta">
                            <p className="text">Total</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container"></div>
        </div>    
    )

}
export default Dashboard