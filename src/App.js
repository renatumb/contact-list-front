import './App.css';
import {useEffect, useRef, useState} from "react";
import {getAllContacts, saveContact, updateContact, updatePhoto} from "./api/ContactService";
import Header from "./components/Header";
import {Navigate, Route, Routes} from "react-router-dom";
import ContactList from "./components/ContactList";
import ContactDetails from "./components/ContactDetails";
import {toastError, toastSuccess} from "./api/ToastService";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

    const [dataX, setDataX] = useState({})
    const [currentPage, setCurrentPage] = useState(0)

    const getContacts = async (page = 0, size = 3) => {
        try {
            setCurrentPage(page)
            const {data} = await getAllContacts(page, size)
            setDataX(data)
        } catch (error) {
            console.error(error)
            toastError(error)
        }
    }

    useEffect(() => {
        getContacts()
    }, []);

    const modelref = useRef()
    const toggleModal = (show) => {
        show ? modelref.current.showModal() : modelref.current.close();
    }

    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: ''
    })
    const [file, setFile] = useState(undefined)
    const fileRef = useRef()
    const onChangex = ( event) => {
        setFormValues({...formValues, [event.target.name]: event.target.value } )
    }

    const handleNewContact = async (event) => {
        event.preventDefault()
        try {
            const response = await saveContact(formValues)

            const formData = new FormData()
            formData.append('file', file, file.name)
            formData.append('id', response.data.id)

            await updatePhoto(formData)
            toggleModal(false)
            //
            setFile(undefined)
            fileRef.current.value = null
            getContacts()
            setFormValues({
                name: '', email: '', phone: '', address: '', title: '', status: ''
            })
            toastSuccess("** New Contact ADDED successfully **")
        } catch (error) {
            console.error(error)
            toastError(error)
        }
    }

    const updateContactX = async (data) => {
        try {
            updateContact(data)
            toastSuccess("Contact UPDATED successfully ")
        } catch (error) {
            console.error(error)
            toastError(error)
        }
    }

    const updateImageX = async (data) => {
        try {
            return await updatePhoto(data)
        } catch (error) {
            console.error(error)
            toastError(error)
        }
    }
//
    return (
        <>
            <Header toggleModal={toggleModal} numberOfContacts={dataX.totalElements}/>
            <main className={"main"}>
                <div className={"container"}>
                    <Routes>
                        <Route path={'/'} element={<Navigate to={'/contacts'}/>}/>
                        <Route path={'/contacts'} element={<ContactList data={dataX} currentPage={currentPage} getAllContacts={getContacts}/>}/>
                        <Route path={'/contacts/:id'} element={<ContactDetails updateContact={updateContactX} updateImage={updateImageX} />}/>
                    </Routes>
                </div>
            </main>

            {/* Modal ================ */}
            <dialog className="modal" id="modal" ref={modelref}>
                <div className="modal__header">
                    <h3>New Contact</h3>

                    <i className="bi bi-x-lg" onClick={() => {
                        toggleModal(false)
                    }}></i>
                </div>
                <div className="divider"></div>
                <div className="modal__body">
                    <form onSubmit={handleNewContact}>
                        <div className="user-details">
                            <div className="input-box">
                                <span className="details">Name</span>
                                <input type="text"  name='name'  value={formValues.name} onChange={onChangex} required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input type="text" name='email' value={formValues.email} onChange={onChangex} required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Title</span>
                                <input type="text" name='title' value={formValues.title} onChange={onChangex} required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Phone Number</span>
                                <input type="text" name='phone' value={formValues.phone} onChange={onChangex} required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Address</span>
                                <input type="text" name='address' value={formValues.address} onChange={onChangex} required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Account Status</span>
                                <input type="text" name='status' value={formValues.status} onChange={onChangex} required/>
                            </div>
                            <div className="file-input">
                                <span className="details">Profile Photo</span>

                                <input  type="file" name='photo' required ref={fileRef} onChange={(event) => {
                                    setFile(event.target.files[0])
                                }}/>
                            </div>
                        </div>
                        <div className="form_footer">
                            <button type='button' className="btn btn-danger" onClick={ ()=>{ toggleModal(false)} }><i className="bi bi-x-octagon"></i> Cancel
                            </button>
                            <button type='submit' className="btn "><i className="bi bi-check-lg"></i> Save</button>
                        </div>
                    </form>
                </div>
            </dialog>
            <ToastContainer />
        </>);
}

export default App;
