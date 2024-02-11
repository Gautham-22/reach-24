import { useState } from "react"
import './App.css'
import Card from './components/Card'
import Navbar from './components/Navbar'
import Postform from './components/Postform'
import Textcard from './components/Textcard'
import Editform from './components/Editform'
import { posts } from './data'

function App() {

  const [showModal, setShowModal] = useState(false);
  const [formType, setFormType] = useState("Add");
  const [editPost, setEditPost] = useState(null);

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
                  return <Textcard details={post} key={index} setEditPost={setEditPost} setFormType={setFormType} setShowModal={setShowModal} />
                }
                return <Card details={post} key={index} setEditPost={setEditPost} setFormType={setFormType} setShowModal={setShowModal} />
              })
              :
              <p>No posts yet</p>
            }
          </div>
        </div>
      </div>
      {
        formType === "Add" && showModal && <Postform status={setShowModal} cur={showModal} />
      }
      {
        formType === "Edit" && showModal &&
        <Editform status={setShowModal} cur={showModal} details={editPost} setFormType={setFormType}
        />
      }
    </>
  )
}

export default App
