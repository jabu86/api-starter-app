function Modal({closeModal, show , title, children}) {

    return (
            <div  className="modal-overlay" >
                <div className="admin-modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5">{title}</h1>
                                <button type="button" className="btn-close" onClick={() => closeModal(show)}></button>
                            </div>
                            <div className="modal-body mb-2">
                                {children}
                            </div>

                        </div>
                    </div>

                </div>
            </div>


    )
}
export default Modal;