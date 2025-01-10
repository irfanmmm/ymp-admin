import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "../public/style/App.css";
import "../public/style/core.css";
import "../public/style/core.min.css";
import "../public/style/icon-font.css";
import "../public/style/icon-font.min.css";
import "../public/style/index.css";
import "../public/style/style.css";
import "../public/style/style.min.css";
import Drower from "./components/Drower/Drower";
import Headder from "./components/Hedder/Headder";
import Home from "./screens/Home/Home";
import AssignRoutes from "./screens/AssignRoutes/AssignRoutes";
import DailyOrders from "./screens/DailyOrders/DailyOrders";
import EmployeeInformation from "./screens/EmployeeInformation/EmployeeInformation";
import Login from "./screens/Login/Login";
import Catogory from "./screens/Products/Catogory";
import Products from "./screens/Products/Products";
import Locations from "./screens/Route/Locations";
import ShopList from "./screens/Route/ShopList";
import ErrorScreen from "./screens/Error/ErrorScreen";
import Logo from './../public/assets/images/deskapp-logo.svg';

const LoginLayout = () => {
  return (
    <div>
      <div class="login-header box-shadow">
        <div class="container-fluid d-flex justify-content-between align-items-center">
          <div class="brand-logo">
            <a href="login.html">
              {/* <img src="" alt=""> */}
              <img src={Logo} alt="" />
            </a>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

const Layout = () => {
  return (
    <div>
      <Headder />
      <main style={{ minHeight: "80vh", padding: "20px" }}>
        <Drower />
        <Outlet /> {/* This renders child routes */}
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginLayout />}>
          <Route index element={<Login />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/AssignRoutes" element={<AssignRoutes />} />
          <Route path="/DailyOrders" element={<DailyOrders />} />
          <Route
            path="/EmployeeInformation"
            element={<EmployeeInformation />}
          />
          <Route path="/Error" element={<ErrorScreen />} />
          <Route path="/Products/Catogory" element={<Catogory />} />
          <Route path="/Products/Products" element={<Products />} />

          <Route path="/Route/Locations" element={<Locations />} />
          <Route path="/Route/ShopList" element={<ShopList />} />
        </Route>

        {/* <Headder />
        <Drower /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
