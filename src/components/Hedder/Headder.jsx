import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ProductContext } from "../../context/ContextApi.jsx";
import { useAxios } from "../../hooks/useAxios.js";
import { GET_PROFILE } from "../../config/urls.js";

function Header() {
  const navigation = useNavigate();
  const { fetchData } = useAxios();
  const { setIsAuthenticated } = useContext(ProductContext);
  const [isOpenedDrop, setIsOpenedDrop] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfile()
      .then((response) => {
        setProfile(response?.employeeinfo);
      })
      .catch(console.log);
  }, []);

  const getProfile = async () => {
    return await fetchData({
      url: GET_PROFILE,
    });
  };

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigation("/");
  };

  return (
    <div
      class="header"
      style={{
        paddingRight: 50,
      }}
    >
      <div class="header-left">
        <div class="menu-icon dw dw-menu"></div>
      </div>
      <div
        class="header-right mr-md "
        style={{
          alignItems: "center",
        }}
      >
        <span className="user-name">{profile?.name}</span>

        <div className={"user-info-dropdown mr-lg"}>
          <div
            className={`dropdown ${isOpenedDrop && "show"}`}
            onClick={() => {
              setIsOpenedDrop(!isOpenedDrop);
            }}
          >
            <a class="dropdown-toggle" role="button" data-toggle="dropdown">
              <span class="user-icon">
                {/* <img src="/vendors/images/photo1.jpg" alt=""> */}
              </span>
            </a>
            <div
              className={`dropdown-menu  dropdown-menu-right dropdown-menu-icon-list ${
                isOpenedDrop && "show"
              }`}
            >
              <a class="dropdown-item" onClick={logout}>
                <i class="dw dw-logout"></i> Log Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
