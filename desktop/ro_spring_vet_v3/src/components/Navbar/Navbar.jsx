import "./styles.css"

const Navbar = ( {viewLoginRegister, authority} ) => {
    return (
        <div className="containerNavbar">
            {viewLoginRegister && (
                <p className="titlu-text">Bun venit la RoSpringVet</p>
            )}
            {authority === "ADMIN" ? (
                <>
                <div className="containerElementeNavbar">

                </div>
                </>
            ):(
                <></>
            )}
            
        </div>
    )
}
export default Navbar