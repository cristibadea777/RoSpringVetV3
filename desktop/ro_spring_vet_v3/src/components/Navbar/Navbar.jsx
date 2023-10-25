import { logout } from "../AccesareAPI"
import "./Navbar.css"

const Navbar = ( { api, viewLoginRegister, setViewLoginRegister, setViewDashboard, authority, setAuthority, jwtToken, setJwtToken, 
                   setViewAngajati, setViewStapani, setViewAnimale, setViewVizite, setViewTratamente, setViewProgramari, setViewDetaliiAnimal
                 }) => {

    const setAllFalse = () => {
        setViewLoginRegister(false)
        setViewDashboard(false)
        setViewAngajati(false)
        setViewStapani(false)
        setViewAnimale(false)
        setViewVizite(false)
        setViewTratamente(false)
        setViewProgramari(false)
        setViewDetaliiAnimal(false)
    }

    const handleClickDashboard  = () => { setAllFalse(), setViewDashboard  (true) }
    const handleClickAnimale    = () => { setAllFalse(), setViewAnimale    (true) }
    const handleClickAngajati   = () => { setAllFalse(), setViewAngajati   (true) }
    const handleClickStapani    = () => { setAllFalse(), setViewStapani    (true) }
    const handleClickVizite     = () => { setAllFalse(), setViewVizite     (true) } 
    const handleClickTratamente = () => { setAllFalse(), setViewTratamente (true) }
    const handleClickProgramari = () => { setAllFalse(), setViewProgramari (true) }
    

    const handleClickLogout = () => {
        setAuthority(false)
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
            
            {!viewLoginRegister &&(
            <>
            <div className="containerElementeNavbar">
                <ElementNavbar label={"Dashboard"}  functie={handleClickDashboard}/>
                {authority === 'ADMIN' && (
                <>
                <ElementNavbar label={"Angajați"}   functie={handleClickAngajati}/>
                <ElementNavbar label={"Stăpâni"}    functie={handleClickStapani}/>
                </>
                )}
                <ElementNavbar label={"Animale"}    functie={handleClickAnimale}/>
                
                <ElementNavbar label={"Vizite"}     functie={handleClickVizite}/>
                <ElementNavbar label={"Tratamente"} functie={handleClickTratamente}/>
                <ElementNavbar label={"Programări"} functie={handleClickProgramari}/>
            </div>
            <div className="containerElementeNavbar2">
                <ElementNavbar label={"Logout"}     functie={handleClickLogout}/>
            </div>
            </>
            )}
        </div>
    )
}
export default Navbar