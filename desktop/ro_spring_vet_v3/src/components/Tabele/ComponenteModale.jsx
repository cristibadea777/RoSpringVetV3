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
        </div>
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
)

export { BaraModalEntitate, ContainerInputPoza }