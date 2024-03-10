// import { useState } from 'react'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Post } from './pages/Post'


import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Posts } from './pages/Posts'
import { Publish } from './pages/Publish'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Post />} />
          <Route path="/blogs" element={<Posts />} />
          <Route path="/publish" element={<Publish />} />

        </Routes></BrowserRouter >
    </>
  )
}

export default App
