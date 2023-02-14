import { Routes, Route } from "react-router-dom"
import LoginPage from "../pages/LoginPage"
import BoardPage from "../pages/BoardPage"
import DetailsPage from "../pages/DetailsPage"




export default function Routing(){
    return(
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/details/:day/:id" element={<DetailsPage />} />


        </Routes>
    )
}