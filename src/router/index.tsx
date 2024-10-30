import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../pages/main";
import JoinApplication from "../pages/joinApplication";
import Home from "../pages/home"
import PersonalCenter from "../pages/personalCenter";


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
            {
                path:'personalCenter',
                Component:PersonalCenter
            }
        ]
    }
]

export default createBrowserRouter(routes)
