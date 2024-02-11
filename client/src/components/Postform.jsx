import React, { useState } from 'react';
import { ImCross } from 'react-icons/im';
import { FaCheck } from 'react-icons/fa';
import axios from "axios"
import { toast } from 'react-toastify';

const Postform = ({ cur, status, setLoadPosts }) => {

    const [postType, setPostType] = useState('image');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [caption, setCaption] = useState('');
    const [title, setTitle] = useState('');
    const [imgLink, setImgLink] = useState('');

    const handleSubmit = () => {
        axios.post("http://localhost:5000/api/posts", {
            name,
            location,
            image: imgLink,
            title,
            caption,
            postType
        })
            .then((response) => {
                if (response.status === 201) {
                    toast.success("Post creation success!");
                    setLoadPosts((prev) => prev + 1);
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Something went wrong :(");
            });
        status(!cur);
    }

    return (
        <div className="backdrop">
            <div className="form">
                <div className="formtitlecard">
                    <p id="formtitle">Add New Post</p>
                </div>
                <div className="formFont">
                    Username:
                    <input type="text" className="formInput" placeholder="Enter username"
                        value={name} onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="formFont">
                    Location:
                    <input type="text" className="formInput" placeholder="Enter location"
                        value={location} onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div className="formFont">
                    Post Type:
                    <select className="formInput" value={postType} onChange={(e) => setPostType(e.target.value)}>
                        <option value={'image'}> Image </option>
                        <option value={'text'}> Text </option>
                    </select>
                </div>
                {postType === 'image' && (
                    <div className="formFont">
                        Image Link:
                        <input type="text" className="formInput" placeholder="https://picsum.photos/200/300"
                            value={imgLink} onChange={(e) => setImgLink(e.target.value)}
                        />
                    </div>
                )}
                {postType === 'text' && (
                    <>
                        <div className="formFont">
                            Title:
                            <input type="text" className="formInput" placeholder="Mern stack"
                                value={title} onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="formFont">
                            Caption:
                            <input type="text" className="formInput" placeholder="Somewhere in the CEG"
                                value={caption} onChange={(e) => setCaption(e.target.value)}
                            />
                        </div>
                    </>
                )}
                <div className="rabtn">
                    <div onClick={() => status(!cur)}>
                        <ImCross />
                    </div>
                    <div onClick={handleSubmit}>
                        <FaCheck />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Postform