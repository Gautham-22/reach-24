import { useState } from "react"
import './App.css'
import Card from './components/Card'
import Navbar from './components/Navbar'
import Postform from './components/Postform'
import Textcard from './components/Textcard'
import { posts } from './data'

function App() {

  const [showModal, setShowModal] = useState(false);

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
                  return <Textcard details={post} key={index} />
                }
                return <Card details={post} key={index} />
              })
              :
              <p>No posts yet</p>
            }
          </div>
        </div>
      </div>
      {
        showModal && <Postform status={setShowModal} cur={showModal} />
      }
    </>
  )
}

export default App
