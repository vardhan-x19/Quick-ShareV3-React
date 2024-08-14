import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './Comp/Header';
import Footer from './Comp/Footer';
import SideBar from './Comp/SideBar';
import { useState } from 'react';
import ContextProvider from './Store/Context';
import { Outlet } from 'react-router-dom';

function App() {
  let[items,setItems]=useState("Home");
  return (
     <ContextProvider>
     <div className='app-container'>
     <SideBar setItems={setItems} item={items}></SideBar>
     <div className='content'>
     <Header className='header'></Header>
     <Outlet/>
     <Footer></Footer>
     </div>
    </div>
    </ContextProvider>
  )
}

export default App
