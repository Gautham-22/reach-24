import { useState, useEffect } from "react"
import './App.css'
import Card from './components/Card'
import Navbar from './components/Navbar'
import Postform from './components/Postform'
import Textcard from './components/Textcard'
import Editform from './components/Editform'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { posts } from './data'

function App() {

  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("Add");
  const [editPost, setEditPost] = useState(null);
  const [posts, setPosts] = useState([])
  const [loadPosts, setLoadPosts] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts")
      .then((response) => {
        if (response.status === 200) {
          setPosts(response.data);
        } else {
          toast.error("Error fetching posts")
          setPosts([]);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching posts")
        setPosts([]);
      });
  }, [loadPosts]);

  return (
    <>
      <div className='App'>
        <div>
          <Navbar status={setShowModal} cur={showModal} />
          <div className="cards">
            {posts && posts.length
              ?
              posts.map((post, index) => {
                if (post.postType === 'text') {
                  return <Textcard details={post} key={index} setEditPost={setEditPost} setFormType={setFormType} setShowModal={setShowModal} setLoadPosts={setLoadPosts} />
                }
                return <Card details={post} key={index} setEditPost={setEditPost} setFormType={setFormType} setShowModal={setShowModal} setLoadPosts={setLoadPosts} />
              })
              :
              <p>No posts yet</p>
            }
          </div>
        </div>
        <ToastContainer />
      </div>
      {
        formType === "Add" && showModal && <Postform status={setShowModal} cur={showModal} setLoadPosts={setLoadPosts} />
      }
      {
        formType === "Edit" && showModal &&
        <Editform status={setShowModal} cur={showModal} details={editPost} setFormType={setFormType} setLoadPosts={setLoadPosts}
        />
      }
    </>
  )
}

export default App
