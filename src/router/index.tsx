import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../pages/main";
import JoinApplication from "../pages/joinApplication";
import Home from "../pages/home"


const routes = [
    {
        path:'/',
        Component:Main,
        children:[
            {
                path:"/",
                element:<Navigate to = "home"/>
            },
            {
                path:'home',
                Component:Home
            },
            {
                path:'joinApplication',
                Component:JoinApplication
            },
           
        ]
    }
]

export default createBrowserRouter(routes)
