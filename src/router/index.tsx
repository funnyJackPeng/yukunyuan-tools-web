import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main";


const routes = [
    {
        path:'/',
        Component:Main
    }
]

export default createBrowserRouter(routes)
