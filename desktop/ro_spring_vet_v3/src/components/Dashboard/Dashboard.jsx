import "./Dashboard.css"

const Dashboard = ( {username, authority, userConectat, pozaProfil} ) => {

    const test = () => {

    }

    const RowInfo = ({label, valoare}) => (
        <div className="containerLinie">
            <div className="containerLinieStanga">  
                <p className="text">{label}</p> 
            </div>
            <div className="containerLinieDreapta"> 
                <p className="text">{valoare}</p> 
            </div>
        </div>
    )

    const RowInfoSecundar = ({label, valoare, functie}) => (
        <div className="containerLinie">
            <div className="containerLinieStanga">  
                <p className="text">{label}</p>
            </div>
            <div className="containerLinieDreapta"> 
                <button className="buton" onClick={functie}>{valoare}</button>
            </div>
        </div>
    )

    return(
        <div className="containerDashboard">
            <div className="containerInfo">
                <div className="containerPoza">
                    <div className="poza">
                        <img src={pozaProfil} />
                    </div>
                </div>
                <div className="containerTextInfo">
                    <RowInfo label={"Utilizator"}   valoare={userConectat.nume} />
                    <RowInfo label={"Telefon"}      valoare={userConectat.nrTelefon} />
                    <RowInfo label={"Email"}        valoare={username} />
                    {authority === 'ADMIN' &&(
                    <RowInfo label={"Funcție"}      valoare={userConectat.functie} />
                    )}
                    <div className="containerLinie">
                        <div className="containerLinieStanga"></div>
                        <div className="containerLinieDreapta"> <button className="buton">Setări</button></div>
                    </div>
                </div>
            </div>
            <div className="containerSecundar">
                <div className="containerSecundarStanga">
                    <RowInfoSecundar label={"Programări"} valoare={"Nr"} functie={test}/>
                    <RowInfoSecundar label={"Programări azi"} valoare={"Nr"} functie={test}/>
                    <RowInfoSecundar label={"Programări mâine"} valoare={"Nr"} functie={test}/>
                    <RowInfoSecundar label={"Tratamente azi"} valoare={"Nr"} functie={test}/>
                    <RowInfoSecundar label={"Tratamente mâine"} valoare={"Nr"} functie={test}/>         
                </div>
                <div className="cotainerSecundarDreapta">
                    <div className="linieContainerSecundarDreapta">
                        <RowInfo label={"Vizite efectuate"} valoare={"Total"} />
                    </div>
                    <div className="linieContainerSecundarDreapta">
                        <RowInfo label={"Total animale"} valoare={"Total"} />
                    </div>
                </div>
            </div>
            <div className="container"></div>
        </div>    
    )

}
export default Dashboard