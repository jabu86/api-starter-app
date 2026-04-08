import  {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './styles/admin/App.scss'
import './styles/App.scss'

// import './assets/css/fonts/Montserrat,Roboto.zip'
//Index
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

//Auth
import AuthLayout from "./layouts/AuthLayout.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Forgot from "./pages/auth/Forgot.jsx";
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
import PublicRouter from "./componentes/PublicRouter.jsx";



import { useState } from 'react'
import Categories from "./pages/admin/Categories.jsx";
function App() {

    // Modal control
    const [sideBarOpen, setSetBarOpen] = useState(true)
    const [show, setShow] = useState(false);
    function handleSideBarClick(e){
        setSetBarOpen(!sideBarOpen);
    }
    function handleOpenModal() {
         setShow(!show);
    }
  return (
    <>
        <BrowserRouter>
            <div>
                <Routes>
                    <Route exact element={
                        <PublicRouter>
                            <AuthLayout/>
                        </PublicRouter>
                    } >
                        <Route  path="/login" element={<Login/>} />
                        <Route  path="/register" element={<Register/>} />
                        <Route  path="/forgot" element={<Forgot/>} />
                    </Route>
                    <Route path="/" exact element={
                        <ProtectedRouter  allowedRoles={['customer','user','admin']} >
                            <CustomerLayout />
                        </ProtectedRouter>
                    } >
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />

                    </Route>
                    <Route path="/admin" element={
                        <ProtectedRouter  allowedRoles={['user', 'admin']}>
                            <AdminLayout handleSideBarClick={handleSideBarClick} sideBarOpen={sideBarOpen} />
                        </ProtectedRouter>
                    } >
                        <Route style={{ padding: "20px", flex: 1 }} path="/admin" element={<Dashboard />} />
                        <Route path="/admin/products" element={<Products openModal={handleOpenModal} show={show} />}  />
                        <Route path="/admin/brands" element={<Brands openModal={handleOpenModal} show={show} />} />
                        <Route path="/admin/categories" element={<Category openModal={handleOpenModal} show={show} />} />
                        <Route path="/admin/sub-categories/:slug" element={<SubCategories openModal={handleOpenModal} show={show}/>} />
                        <Route path="/admin/colors" element={<Colors openModal={handleOpenModal} show={show} />}  />
                        <Route path="/admin/sizes" element={<Sizes openModal={handleOpenModal} show={show} />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    </>
  )
}

export default App
