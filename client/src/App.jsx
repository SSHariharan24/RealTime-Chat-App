import React, { useEffect } from 'react'
import{Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"
import { useThemeStore } from "./store/useThemeStore";
import Navbar from './components/Navbar'
import {Routes,Route, Navigate} from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import SettingPage from "./pages/SettingPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from './store/useAuthStore'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore()
  const { theme } = useThemeStore();
  console.log({ onlineUsers });

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log({authUser});

   if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div data-theme={theme}>
      <Navbar/>

      <Routes>
        <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>}></Route>
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />}></Route>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />}></Route>
        <Route path="/settings" element={<SettingPage/>}></Route>
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />}></Route>
      </Routes>

      <Toaster/>

    </div>
  )
}

export default App
