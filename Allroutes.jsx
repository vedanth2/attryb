import React from 'react'
import { Routes, Route } from "react-router-dom"
import {Signup} from '../components/Signup'
import {Login} from '../components/Login'
import { Home } from '../components/Home'
import { CarDetails } from '../components/CarDetails'
import { Navbar } from '../components/Navbar'

export const Allroutes = () => {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Signup/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path='/navbar' element={<Navbar/>}></Route>
          <Route path="/details" element={<CarDetails/>}></Route>
      </Routes>
    </div>
  )
}