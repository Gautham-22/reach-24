import React from 'react'
import { RiDeleteBinFill } from 'react-icons/ri';
import { BsPencilFill } from 'react-icons/bs';

const Card = ({ details, setFormType, setShowModal, setEditPost }) => {
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
                    <RiDeleteBinFill id="trash" />
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