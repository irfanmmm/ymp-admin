import React from "react";
import { useNavigate } from "react-router";

function Login() {

  const navigation = useNavigate()
  const handleClickLogin = ()=>{
    navigation('/')
  }
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
                      asp-for="UserName"
                      id="username"
                      class="form-control form-control-lg"
                      placeholder="Username"
                    />
                    <div class="input-group-append custom">
                      <span class="input-group-text">
                        <i class="icon-copy dw dw-user1"></i>
                      </span>
                    </div>
                  </div>
                  <div class="input-group custom">
                    <input
                      type="password"
                      asp-for="Password"
                      id="password"
                      class="form-control form-control-lg"
                      placeholder="**********"
                    />
                    <div class="input-group-append custom">
                      <span class="input-group-text">
                        <i class="dw dw-padlock1"></i>
                      </span>
                    </div>
                  </div>
                  <div class="row pb-30">
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
                  </div>
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
