
import {Routes, Route} from 'react-router-dom'
import SigninForm from './auth/forms/SigninForm'
import { Home } from './root/pages'
import SignupForm from './auth/forms/SignupForm'
import AuthLayout from './auth/AuthLayout'
import RootLayout from './root/RootLayout'
import { Toaster } from "@/components/ui/toaster"
import Explore from './root/pages/Explore'
import Saved from './root/pages/Saved'
import AllUsers from './root/pages/AllUsers'
import CreatePost from './root/pages/CreatePost'
import EditPost from './root/pages/EditPost'
import PostDetails from './root/pages/PostDetails'
import Profile from './root/pages/Profile'
import UpdateProfile from './root/pages/UpdateProfile'
function App() {

  return (
    <>
     <main className=' flex h-screen'>
      
        <Routes>
          {/* Public routes */}
          <Route element={<AuthLayout/>}>
          <Route path="/signin" element={<SigninForm />} />
          <Route path="/signup" element={<SignupForm />} />
          </Route>
          

        {/* // Private routes */}
        <Route element={<RootLayout/>}>
           {/* <Route path="/" element={<Home />} />
           <Route path="/explore" element={<Explore />} />
           <Route path="/saved" element={<Saved />} />
           <Route path="/update-post/:id" element={<EditPost />} />
           <Route path="/all-users" element={<AllUsers />} />
           <Route path="/posts/:id" element={<PostDetails />} />
           <Route path="/create-post" element={<CreatePost />} /> */}
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />

           //
        </Route>
       </Routes>
       <Toaster/>
     </main>
    </>
  )
}

export default App
