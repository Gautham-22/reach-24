import React from 'react'
import { RiDeleteBinFill } from 'react-icons/ri';
import { BsPencilFill } from 'react-icons/bs';
import axios from 'axios';
import { toast } from 'react-toastify';

const Textcard = ({ details, setFormType, setShowModal, setEditPost, setLoadPosts }) => {
    const handleDelete = () => {
        axios.delete(`http://localhost:5000/api/posts/${details._id}`)
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Post deletion success!");
                    setLoadPosts((prev) => prev + 1);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Something went wrong :(");
            });
    }
    return (
        <div className="card">
            <div className="card-img textcard-body">
                <div className="card-title">{details.title}</div>
                <div className="card-text">{details.caption}</div>
            </div>
            <div className="card-body">
                <img src={'./panda-avatar.png'} alt="User" id="user" />
                <div className="card-desc">
                    <div className="card-title">{details.name}</div>
                    <div className="card-text">{details.location}</div>
                </div>
                <div className="icons">
                    <RiDeleteBinFill id="trash" onClick={handleDelete} />
                    <BsPencilFill id="edit" onClick={() => {
                        setEditPost(details);
                        setFormType("Edit");
                        setShowModal(true);
                    }} />
                </div>
            </div>
        </div>
    )
}

export default Textcard