import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./ComponenteModale.css"

const BaraModalEntitate = ({titluModal, functieInchindereModal}) => (
    <div className="baraModalDetaliiEntitate">
        <div id="baraStanga">  
            <p className="textTitluModal">{titluModal} - Opțiuni</p> 
        </div>
        <div id="baraDreapta"> 
            <button className="butonInchidere" onClick={functieInchindereModal}>
                <FontAwesomeIcon icon={faX} size={"1x"} color={"white"} />
            </button> 
        </div>
    </div>
)

const ContainerInputPoza = ({pozaCurenta, handleChangePoza}) => (
    <div className="containerInputPoza">
        <div className="containerPoza">
            <img src={pozaCurenta} />
            <div className="containerButonSchimbaPoza">
                <label>
                    Schimbă poza
                    <input
                        type="file"
                        accept="image/*"
                        style={{display: "none"}}
                        onChange={handleChangePoza}
                    >
                    </input>
                </label>
            </div>
        </div>
    </div>
)

const ContainerRaspuns = ({textRaspuns, setViewRaspuns, setViewEntitateNoua}) => (
    <div className="modal"> 
        <div style={{width:"25%", height:"33%", backgroundColor:"#232B2B", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", border: "1px solid white"}}>
            <p className="raspunsApi" style={{color: (textRaspuns.status === 200) ? "green" : "red"}}> {textRaspuns.data} </p>
            <button onClick={() => {
                setViewRaspuns(false)
                if(textRaspuns.status === 200) 
                    setViewEntitateNoua(false)
            }}>OK</button>
        </div>
    </div>
)



export { BaraModalEntitate, ContainerInputPoza, ContainerRaspuns }