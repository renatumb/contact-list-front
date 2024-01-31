import React from "react";

const Header = ({toggleModal, numberOfContacts}) => {
    return (
        <div className="header">
            <div className="container">
                <h3 className="App"><i className={"bi bi-people"}></i> CONTACT LIST ({numberOfContacts})</h3>
                <button onClick={() => {
                    toggleModal(true)
                }} className="btn">
                    <i className="bi bi-person-add"></i> Add new Contact
                </button>
            </div>
        </div>
    )
}

export default Header
