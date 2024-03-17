import { useState } from 'react';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { store } from 'react-notifications-component';

const Modal = ({ setPosts }) => {
    const [name, setName] = useState('');
    const [post, setPost] = useState('');
    const [isNameInvalid, setIsNameInvalid] = useState(false);
    const [isPostInvalid, setIsPostInvalid] = useState(false);

    const handleNameChange = e => {
        if (isNameInvalid) setIsNameInvalid(false);
        setName(e.target.value);
    };

    const handlePostChange = e => {
        if (isPostInvalid) setIsPostInvalid(false);
        setPost(e.target.value);
    };

    const handleFormSubmit = async e => {
        e.preventDefault();

        if (post.trim() === '') {
            setIsPostInvalid(true);
            return;
        }

        try {
            await addDoc(collection(db, 'posts'), {
                name: name || 'Anonymous',
                description: post,
                createdAt: new Date(),
            });

            triggerNotification("Success", "You have successfully posted. Post minimum after 5 minutes.", "success");
            setName('');
            setPost('');

        } catch (error) {
            console.error("Error adding document: ", error);
            triggerNotification("Error", "Something went wrong!", "danger");
        }
    };

    const triggerNotification = (title, message, type) => {
        store.addNotification({
            title,
            message,
            type,
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__zoomInDown"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 3000,
                onScreen: true
            }
        });
    };

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">যা মন চায় লিখে ফেলুন</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">ছদ্মনাম (বাধ্যতামূলক নয়)</label>
                                <input type="text" className={`form-control ${isNameInvalid ? 'is-invalid' : ''}`} id="name" maxLength="30" value={name} onChange={handleNameChange} />
                            </div>
                            <div>
                                <label htmlFor="post" className="form-label">মন খুলে লিখুন *</label>
                                <textarea className={`form-control ${isPostInvalid ? 'is-invalid' : ''}`} id="post" maxLength="5000" value={post} onChange={handlePostChange} />
                            </div>
                            <div className="modal-footer d-flex justify-content-center border-0">
                                <button type="submit" className="btn btn-outline-primary mx-2">পোস্ট করুন</button>
                                <button type="button" className="btn btn-outline-danger mx-2" data-bs-dismiss="modal">বাতিল করুন</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
