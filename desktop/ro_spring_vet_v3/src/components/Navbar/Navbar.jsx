import { logout } from "../LoginRegister/AccesareAPI"
import "./styles.css"

const Navbar = ( {api, viewLoginRegister, setViewLoginRegister, setViewDashboard, authority, setAuthority, jwtToken, setJwtToken} ) => {

    const setAllFalse = () => {
        setAuthority(false)
        setViewLoginRegister(false)
        setViewDashboard(false)
    }

    const handleClickLogout = () => {
        logout({jwtToken, setJwtToken, api})
        setAllFalse()
        setViewLoginRegister(true)
    }

    const ElementNavbar = ({label, functie}) => (
        <div className="elementNavbar"> 
            <button className="butonNavbar" onClick={functie}>{label}</button> 
        </div>
    )

    return (
        <div className="containerNavbar">
            {viewLoginRegister && (
                <p className="titlu-text">Bun venit la RoSpringVet</p>
            )}
            {authority === "ADMIN" ? (
                <>
                <div className="containerElementeNavbar">
                    <ElementNavbar label={"Dashboard"}  functie={{}}/>
                    <ElementNavbar label={"Angajați"}   functie={{}}/>
                    <ElementNavbar label={"Animale"}    functie={{}}/>
                    <ElementNavbar label={"Stăpâni"}    functie={{}}/>
                    <ElementNavbar label={"Vizite"}     functie={{}}/>
                    <ElementNavbar label={"Tratamente"} functie={{}}/>
                    <ElementNavbar label={"Programări"} functie={{}}/>
                </div>
                <div className="containerElementeNavbar2">
                    <ElementNavbar label={"Logout"}     functie={handleClickLogout}/>
                </div>
                </>
            ):(
                <></>
            )}
        </div>
    )
}
export default Navbar