import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import Post from './Comp/Post.jsx';
import Cards from './Comp/Cards.jsx';
// import { loaderPosts } from './Comp/Cards.jsx';

const router=createBrowserRouter([
  {
    path : "/", 
    element : <App/>,
    children:[
    { path : "/", 
      element : <Cards/>,
    //  loader :loaderPosts
    },
    {path : "/create-post", element :<Post/>},
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
