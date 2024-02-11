import './App.css'
import Card from './components/Card'
import Navbar from './components/Navbar'
import Textcard from './components/Textcard'
import { posts } from './data'

function App() {

  return (
    <div className='App'>
      <div>
        <Navbar />
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
  )
}

export default App
