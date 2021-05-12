import axios from 'axios'
import { useState, useRef } from 'react'


const Modal = ({ setPosts }) => {

    const [name, setName] = useState('')
    const [post, setPost] = useState('')

    const modal = useRef()
    const cancel = useRef()

    const handleForm = e => {
        e.preventDefault()

        let description = post

        axios({
            method: 'POST',
            url: `https://api.xstechisland.tk/deyal/v1/posts`,
            data: {
                name: name,
                description: description,
            }
        }).then(res => {
            setPosts(oldPosts => [res.data.data, ...oldPosts.slice(0, -1)])
            cancel.current.click()
            setName('')
            setPost('')
        }).catch(e => {
            console.log(e)
        })
    }

    return (
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" ref={modal}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">যা মন চায় লিখে ফেলুন</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <form onSubmit={handleForm}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">ছদ্মনাম (বাধ্যতামূলক নয়)</label>
                                <input type="text" className="form-control" id="name"
                                    value={name} onChange={e => setName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="post" className="form-label">
                                    মন খুলে লিখুন
                                    </label>
                                <textarea className="form-control" id="post"
                                    value={post}
                                    onChange={e => setPost(e.target.value)}
                                    onKeyDown={_ => null} />
                            </div>
                        </div>
                        <div className="modal-footer d-flex justify-content-center border-0">
                            <button type="submit" className="btn btn-outline-primary mx-2">
                                পোস্ট করুন
                            </button>
                            <button type="button" className="btn btn-outline-danger mx-2" data-bs-dismiss="modal"
                                ref={cancel}>
                                বাতিল করুন
                        </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal