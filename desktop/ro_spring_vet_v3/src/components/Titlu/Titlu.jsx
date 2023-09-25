import "./styles.css"

const Titlu = ({viewLoginRegister}) => {
    return (
        <div className="titlu">
            {viewLoginRegister && (
                <p className="titlu-text">Bun venit la RoSpringVet</p>
            )}
        </div>
    )
}
export default Titlu