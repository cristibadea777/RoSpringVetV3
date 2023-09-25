import "./styles.css"

const Titlu = ( {viewLoginRegister, viewDashboard} ) => {
    return (
        <div className="titlu">
            <p className="titlu-text">
                {viewLoginRegister ? "Bun venit la RoSpringVet" : "Dashboard"}
            </p>
        </div>
    )
}
export default Titlu