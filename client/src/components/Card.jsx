import React from 'react'
import { RiDeleteBinFill } from 'react-icons/ri';
import { BsPencilFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import axios from 'axios';

const Card = ({ details, setFormType, setShowModal, setEditPost, setLoadPosts }) => {
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
            <img className="card-img" src={details.image} alt="Card" />
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

export default Card