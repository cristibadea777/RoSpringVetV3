const OptiuniAnimale = () => {
    return(
        <dialog class="modal" id="modalPoza">
            <div class="modalDialog">
                <div class="containerButonPoze" id="containerButonPozeStanga">
                    <button class="buton" onclick="pozaInapoi()">
                        <i class="fa-solid fa-arrow-left"></i>
                    </button>
                </div>
                <img class="modalImage" src="http://127.0.0.1:5500/proiecte/notesapp4.jpg" alt="Image"/>
                <div class="containerButonClose">
                    <button class="buton" onclick="closeModal()">X</button>
                </div>
                <div class="containerButonPoze">
                    <button class="buton" id="containerButonPoze" onclick="pozaInainte()">
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </dialog>
    )
}
export default OptiuniAnimale