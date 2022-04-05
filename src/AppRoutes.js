import {Route, Routes} from 'react-router-dom'
import Home from './Home'
import Login from './Login'



export default function AppRoutes(){
    return(
        <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path ="/" element={<Login/>} />
        </Routes>
    )
}