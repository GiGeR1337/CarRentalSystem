import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {AuthProvider} from './context/AuthProvider';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/guest/Home.jsx';
import Login from './pages/guest/Login.jsx';
import Register from './pages/guest/Register.jsx';
import RentCar from './pages/user/RentCar.jsx';
import MyRentals from './pages/user/MyRentals.jsx';
import EditRental from './pages/user/EditRental.jsx';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCars from './pages/admin/AdminCars';
import AdminEditCar from './pages/admin/AdminEditCar';
import AdminCreateCar from './pages/admin/AdminCreateCar';
import AdminLocations from './pages/admin/AdminLocations';
import AdminEditLocation from './pages/admin/AdminEditLocation';
import AdminCreateLocation from './pages/admin/AdminCreateLocation';

function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar/>

                <ToastContainer
                    position="bottom-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme="colored"
                />

                <div className="container-fluid" style={{minHeight: '80vh'}}>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>

                        {/* Protected User Routes */}
                        <Route element={<PrivateRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}/>}>
                            <Route path="/rent/:id" element={<RentCar/>}/>
                            <Route path="/my-rentals" element={<MyRentals/>}/>
                            <Route path="/rentals/edit/:id" element={<EditRental/>}/>
                        </Route>

                        {/* Protected Admin Routes */}
                        <Route element={<PrivateRoute allowedRoles={['ROLE_ADMIN']}/>}>
                            <Route path="/admin" element={<AdminDashboard/>}/>

                            {/* Users */}
                            <Route path="/admin/users" element={<AdminUsers/>}/>

                            {/* Cars */}
                            <Route path="/admin/cars" element={<AdminCars/>}/>
                            <Route path="/admin/cars/edit/:id" element={<AdminEditCar/>}/>
                            <Route path="/admin/cars/create" element={<AdminCreateCar/>}/>

                            {/* Locations */}
                            <Route path="/admin/locations" element={<AdminLocations/>}/>
                            <Route path="/admin/locations/create" element={<AdminCreateLocation/>}/>
                            <Route path="/admin/locations/edit/:id" element={<AdminEditLocation/>}/>
                        </Route>
                    </Routes>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;