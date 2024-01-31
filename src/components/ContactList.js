import React from "react";
import Contact from "./Contact";

const ContactList = ({data, currentPage, getAllContacts}) => {
    return (
        <main className="main">
            {data?.content?.length === 0 && <div>No contacts! Please add a new contact</div>}

            <ul className="contact__list">
                {data?.content?.length > 0 && data.content.map((con) => <Contact contact={con} key={con.id}/>)}
            </ul>

            {
                data?.content?.length > 0 && data?.totalPages > 1 &&
                <div className="pagination">
                    <a onClick={ () => { getAllContacts(currentPage - 1)}} className={data.first ? 'disabled' : ""}>&laquo; &laquo;</a>
                    {
                        data && [...Array(data.totalPages).values() ].map( (element, index)=>{
                            return(<a onClick={ () => getAllContacts(index) } className={currentPage===index? "active":""} key={index}>{index+1}</a>)
                        })
                    }
                    <a onClick={ () => {getAllContacts(currentPage + 1)}} className={data.last ? "disabled" : ""}>&raquo; &raquo;</a>
                </div>
            }
        </main>
    )
}
export default ContactList
