import React, {useEffect, useRef, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteContact, getContact} from "../api/ContactService";
import {toastError, toastSuccess} from "../api/ToastService";

export default function ContactDetails({updateContact, updateImage}) {

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: '',
        photoUrl: ''
    })

    const urlParams = useParams()

    const fetchContactDetail = async () => {
        try {
            const response = await getContact(urlParams.id)
            setContact(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchContactDetail()
    }, []);

    const inputRef = useRef()
    const selectImage = () => {
        inputRef.current.click()
    }

    const updatePhotoX = async (file) => {
        try {
            const formData = new FormData()
            formData.append('file', file, file.name)
            formData.append('id', urlParams.id)
            const resp = await updateImage(formData)
            if ( resp) {
                setContact({...contact, photoUrl: resp.data + '?' + new Date().getMilliseconds()})
                toastSuccess("Photo UPDATED successfully")
            }
        } catch (error) {
            console.error(error)
            toastError(error)
        }
    }

    const onChangeX = (event) => {
        setContact( { ...contact, [event.target.name]: event.target.value } )
    }

    const onUpdateContact = async (event) => {
        event.preventDefault()
        updateContact(contact)
    }

    const navigateHome = useNavigate()

    const deleteContactX = (id) =>{
        try{
            deleteContact(id)
            toastSuccess("Deleted successfully")
            navigateHome('/')
        }catch(error){
            console.error(error)
            toastError(error)
        }
    }
    return (
        <div>
            <Link to={"/"} className={"link"}><i className="bi bi-arrow-left"></i> Back to List </Link>
            <br/><br/>
            <button className="btn btn-danger" onClick={ () => deleteContactX(contact.id) }><i className="bi bi-trash"></i> Delete Contact</button>
            <br/>
            <div className="profile">
                <div className="profile__details">
                    <img src={contact.photoUrl} alt={`Profile photo of ${contact.name}`}/>
                    <div className="profile__metadata">
                        <p className="profile__name">{contact.name}</p>
                        <p className="profile__muted">JPG, GIF, or PNG Max size of 10MB</p>
                        <button className="btn" onClick={selectImage}><i className="bi bi-cloud-upload"> </i> Change
                            Photo
                        </button>
                    </div>
                </div>
                <div className="profile__settings">
                    <form onSubmit={onUpdateContact} className="form">
                        <div className="user-details">
                            <input type="hidden" defaultValue={contact.id} name="id" required/>
                            <div className="input-box">
                                <span className="details">Name</span>
                                <input type="text" value={contact.name} onChange={onChangeX} name="name" required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Email</span>
                                <input type="text" value={contact.email} onChange={onChangeX} name="email" required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Phone</span>
                                <input type="text" value={contact.phone} onChange={onChangeX} name="phone" required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Address</span>
                                <input type="text" value={contact.address} onChange={onChangeX} name="address"
                                       required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Title</span>
                                <input type="text" value={contact.title} onChange={onChangeX} name="title" required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Status</span>
                                <input type="text" value={contact.status} onChange={onChangeX} name="status" required/>
                            </div>
                        </div>
                        <div className="form_footer">
                            <button type="submit" className="btn"><i className="bi bi-check-lg"></i> Save</button>
                        </div>
                    </form>
                </div>
            </div>

            <form style={{display: "none"}}>
                <input type="file" ref={inputRef} name='file' accept='image/*' onChange={(event) => {
                    updatePhotoX(event.target.files[0])
                }}/>
            </form>
        </div>
    )
}
