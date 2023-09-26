import "./styles.css"

const Navbar = ( {viewLoginRegister} ) => {
    return (
        <div className="containerNavbar">
            {viewLoginRegister && (
                <p className="titlu-text">Bun venit la RoSpringVet</p>
            )}
            
        </div>
    )
}
export default Navbar