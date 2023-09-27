import { useEffect } from "react"
import { getAllStapani, getStapanConectat } from "../LoginRegister/AccesareAPI"
import "./styles.css"

const Dashboard = ( {jwtToken, username, authority, stapanConectat, stapanImgDefault} ) => {

    const RowInfo = ({nume, valoare}) => (
        <div className="containerLinie">
            <div className="containerLinieStanga">
                <p className="text">{nume}</p>
            </div>
            <div className="containerLinieDreapta">
                <p className="text">{valoare}</p>
            </div>
        </div>
    )

    return(
        <div className="containerDashboard">
            <div className="containerInfo">
                <div className="containerPoza">
                    <div className="poza">
                        <img src={stapanImgDefault} />
                    </div>
                </div>
                <div className="containerTextInfo">
                    <RowInfo nume={"Utilizator"} valoare={stapanConectat.nume} />
                    <RowInfo nume={"Telefon"}    valoare={stapanConectat.nrTelefon} />
                    <RowInfo nume={"Email"}      valoare={username} />
                    <RowInfo nume={"Rol"}        valoare={authority} />
                    <div className="containerLinie">
                        <div className="containerLinieStanga"></div>
                        <div className="containerLinieDreapta"> <button className="buton">Setări</button></div>
                    </div>
                </div>
            </div>
            <div className="containerSecundar">
                <div className="containerSecundarStanga">
                    <RowInfo nume={"Programări neconfirmate"}   value={"Nr"}/>
                    <RowInfo nume={"Programări azi"}            value={"Nr"}/>
                    <RowInfo nume={"Programări mâine"}          value={"Nr"}/>
                    <RowInfo nume={"Tratamente azi"}            value={"Nr"}/>
                    <RowInfo nume={"Tratamente mâine"}          value={"Nr"}/>
                </div>
                <div className="cotainerSecundarDreapta">
                    <RowInfo nume={"Vizite efectuate"}  value={"Total"}/>
                    <RowInfo nume={"Total animale"}     value={"Total"}/>
                </div>
            </div>
            <div className="container"></div>
        </div>    
    )
}
export default Dashboard