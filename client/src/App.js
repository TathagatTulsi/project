import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminLogin from "./Admin/AdminLogin";
import HomePage from "./Admin/HomePage";
import Layout from "./Admin/Layout"
import Dashboard from "./Admin/AdminDashboard"
import OrganizationLogin from "./Organization/OrganizationLogin"
import OrganizationRegister from "./Organization/OrganizationRegister"
import OrganizationLayout from "./Organization/OrganizationLayout"
import AddSubscription from "./Subscription/AddSubscription"
import UserLogin from './User/UserLogin'
import UserRegister from "./User/UserRegister"
import OrganizationDashboard from "./Organization/OrganizationDashboard";
import UserLayout from "./User/UserLayout"
import ProductAdd from "./Product/ProductAdd";
import Add_get_Organization from "./Organization/Add_get_Organization";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />}> </Route>

          <Route exact path="/admin-login" element={<AdminLogin />}> </Route>

          <Route path="/admin-dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
          </Route>

          <Route exact path="/loginOrganization" element={<OrganizationLogin />} ></Route>
          <Route path="/registerOrganization" element={<OrganizationRegister />}> </Route>

          <Route path="/organ-dashboard" element={<OrganizationLayout />}>
            <Route index element={<Dashboard />} />
          </Route>

          <Route path = "/AddSubscription" element={<AddSubscription />}></Route>

          <Route path="/User-Login" element={<UserLogin />}></Route>
          <Route path="/addUser" element={<UserRegister />}></Route>

          <Route path="/user_get" element={<OrganizationDashboard />}></Route>
          <Route path = "/add-get-Organization" element={<Add_get_Organization />}></Route>

          <Route path="/user-dashboard" element={<UserLayout />}></Route>
          <Route path="/addProduct" element={<ProductAdd />}></Route>
          {/* <Route path="/forgot" element={<Forgot />}> </Route>

          <Route path="/changepassword" element={<ChangePassword />}> </Route>

          <Route path="/carts" element={<Cart />}> </Route>

          <Route path="/order" element={<Order />}> </Route> */}


        </Routes>
        <ToastContainer />

      </BrowserRouter>
    </div>
  );
}

export default App;
