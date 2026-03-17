import  {BrowserRouter, Routes, Route, Link} from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'

import './styles/admin/App.scss'
import './styles/App.scss'
// import './assets/css/fonts/Montserrat,Roboto.zip'
//Index
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

//Auth
import Login from "./pages/auth/Login.jsx";

//Admin
import AdminLayout from "./layouts/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboad.jsx";
import Products from "./pages/admin/Products.jsx";
import Category from "./pages/admin/Categories.jsx";
import SubCategories from "./pages/admin/SubCategories.jsx";
import Brands from "./pages/admin/Brands.jsx";
import Colors from "./pages/admin/Colors.jsx";
import Sizes from "./pages/admin/Sizes.jsx"

//customer
import CustomerLayout from "./layouts/CustomerLayout.jsx";
import ProtectedRouter from "./componentes/ProtectedRouter.jsx";



import { useState } from 'react'
import Categories from "./pages/admin/Categories.jsx";
function App() {

    const [sideBarOpen, setSetBarOpen] = useState(true)
    function handleSideBarClick(e){
        setSetBarOpen(!sideBarOpen);
    }
  return (
    <>
        <BrowserRouter>
            <div>
                <Routes>

                    <Route path="/" exact element={
                        <ProtectedRouter>
                            <CustomerLayout />
                        </ProtectedRouter>
                    } >
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                    <Route path="/admin" element={
                        <ProtectedRouter>
                            <AdminLayout handleSideBarClick={handleSideBarClick} sideBarOpen={sideBarOpen} />
                        </ProtectedRouter>

                    } >
                        <Route style={{ padding: "20px", flex: 1 }} path="/admin" element={<Dashboard />} />
                        <Route path="/admin/products" element={<Products />} />
                        <Route path="/admin/brands" element={<Brands />} />
                        <Route path="/admin/categories" element={<Category />} />
                        <Route path="/admin/sub-categories" element={<SubCategories />} />
                        <Route path="/admin/colors" element={<Colors />} />
                        <Route path="/admin/sizes" element={<Sizes />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    </>
  )
}

export default App
