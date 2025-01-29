import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useAxios } from "../../hooks/useAxios.js";
import { LOGIN_URL } from "../../config/urls.js";
import { ProductContext } from "../../context/ContextApi.jsx";

function Login() {
  const { setIsAuthenticated } = useContext(ProductContext);
  const navigate = useNavigate();
  const { fetchData } = useAxios();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClickLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password) {
      setError("Username or password is required");
      return;
    } else if (!username) {
      setError("Username is required");
      return;
    } else if (!password) {
      setError("Password is required");
      return;
    }
    // to trigger login event
    const response = await fetchData({
      url: LOGIN_URL,
      method: "POST",
      data: {
        UserName: username,
        Password: password,
        Mobile: false,
      },
    });

    if (response.statusCode === 6000) {
      localStorage.setItem("user-data", response?.token);
      setIsAuthenticated(true);
      navigate("/");
    } else {
      setError(response?.message);
    }
  };

  return (
    <>
      <div class="login-wrap d-flex align-items-center flex-wrap justify-content-center">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6 col-lg-7">
              <img src="/assets/images/login-page-img.png" alt="" />
            </div>
            <div class="col-md-6 col-lg-5">
              <div class="login-box bg-white box-shadow border-radius-10">
                <div class="login-title">
                  <h2 class="text-center text-primary">Login To YMP</h2>
                </div>
                <form id="loginForm">
                  <div class="select-role">
                    <div
                      class="btn-group btn-group-toggle"
                      data-toggle="buttons"
                    >
                      <label class="btn active">
                        <input type="radio" name="options" id="admin" />
                        <div class="icon">
                          <img
                            src="/assets/images/briefcase.svg"
                            class="svg"
                            alt=""
                          />
                        </div>
                        <span>I'm</span>
                        Manager
                      </label>
                    </div>
                  </div>
                  <div class="input-group custom">
                    <input
                      type="text"
                      id="username"
                      class="form-control form-control-lg"
                      placeholder="Username"
                      value={username}
                      onChange={({ target: { value } }) => {
                        setError("");

                        setUsername(value);
                      }}
                    />
                    <div class="input-group-append custom">
                      <span class="input-group-text">
                        <i class="icon-copy dw dw-user1"></i>
                      </span>
                    </div>
                  </div>
                  <div
                    class="input-group custom"
                    style={{
                      marginBottom: 0,
                    }}
                  >
                    <input
                      type="password"
                      id="password"
                      class="form-control form-control-lg"
                      placeholder="**********"
                      value={password}
                      onChange={({ target: { value } }) => {
                        setError("");
                        setPassword(value);
                      }}
                    />
                    <div class="input-group-append  custom">
                      <span class="input-group-text">
                        <i class="dw dw-padlock1"></i>
                      </span>
                    </div>
                  </div>
                  <div class="form-control-feedback has-danger input-group">
                    {error}
                  </div>
                  {/* <div class="row pb-30">
                    <div class="col-6">
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="customCheck1"
                        />
                        <label class="custom-control-label" for="customCheck1">
                          Remember
                        </label>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="forgot-password">
                        <a asp-controller="Login" asp-action="ForgetPassword">
                          Forgot Password
                        </a>
                      </div>
                    </div>
                  </div> */}
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="input-group mb-0">
                        <button
                          type="submit"
                          class="btn btn-primary btn-lg btn-block"
                          onClick={handleClickLogin}
                        >
                          Sign In
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
