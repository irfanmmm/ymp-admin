import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from "react-router";
import "../public/style/App.css";
import "../public/style/core.css";
import "../public/style/core.min.css";
import "../public/style/icon-font.css";
import "../public/style/icon-font.min.css";
import "../public/style/index.css";
import "../public/style/style.css";
import "../public/style/style.min.css";
import Drower from "./components/Drower/Drower.jsx";
import Headder from "./components/Hedder/Headder.jsx";
import Home from "./screens/Home/Home.jsx";
import AssignRoutes from "./screens/AssignRoutes/AssignRoutes.jsx";
import DailyOrders from "./screens/DailyOrders/DailyOrders.jsx";
import EmployeeInformation from "./screens/EmployeeInformation/EmployeeInformation.jsx";
import Login from "./screens/Login/Login.jsx";
import Catogory from "./screens/Products/Catogory.jsx";
import Products from "./screens/Products/Products.jsx";
import Locations from "./screens/Route/Locations.jsx";
import ShopList from "./screens/Route/ShopList.jsx";
import ErrorScreen from "./screens/Error/ErrorScreen.jsx";
import Logo from "./../public/assets/images/deskapp-logo.svg";
import AddEmplyee from "./screens/EmployeeInformation/AddEmplyee.jsx";
import ContextApi, { ProductContext } from "./context/ContextApi.jsx";
import { useContext, useEffect } from "react";

const LoginLayout = () => {
  return (
    <div>
      <div class="login-header box-shadow">
        <div class="container-fluid d-flex justify-content-between align-items-center">
          <div class="brand-logo">
            <a href="login.html">
              <img src="/assets/images/ic_launcher.png" alt="" />
            </a>
          </div>
        </div>
      </div>
      <Login />
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
  const { isAuthenticated, setIsAuthenticated } = useContext(ProductContext);
  useEffect(() => {
    if (localStorage.getItem("user-data")) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [localStorage.getItem("user-data")]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<ErrorScreen />} />
        <Route
          path="/"
          element={isAuthenticated ? <Layout /> : <LoginLayout />}
        >
          <Route index element={<Home />} />
          <Route path="/AssignRoutes" element={<AssignRoutes />} />
          <Route path="/DailyOrders" element={<DailyOrders />} />
          <Route
            path="/EmployeeInformation"
            element={<EmployeeInformation />}
          />
          {/* <Route
            path="/EmployeeInformation/AddEmployee"
            element={<AddEmplyee />}
          /> */}
          <Route path="/Products/Catogory" element={<Catogory />} />
          <Route path="/Products/Products" element={<Products />} />

          <Route path="/Route/Locations" element={<Locations />} />
          <Route path="/Route/ShopList" element={<ShopList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
