import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { ProductContext } from "../../context/ContextApi.jsx";
import { useAxios } from "../../hooks/useAxios.js";
import { CHANGE_PASSWORD, GET_PROFILE } from "../../config/urls.js";
import { FormModal } from "../Modal/FormModal.jsx";
import Swal from "sweetalert2";

function Header() {
  const navigation = useNavigate();
  const { fetchData } = useAxios();
  const { setIsAuthenticated } = useContext(ProductContext);
  const [isOpenedDrop, setIsOpenedDrop] = useState(false);
  const [profile, setProfile] = useState(null);
  const refValue = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getProfile()
      .then((response) => {
        setProfile(response?.employeeinfo);
      })
      .catch(console.log);

    document.addEventListener("click", (e) => {
      if (refValue.current && !refValue.current.contains(e.target)) {
        setIsOpenedDrop(false);
      }
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setError("");
      }
    });
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

  const chnagePassword = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);

    const current = form.get("currentPassword");
    const newPass = form.get("newPassword");
    const confirmnewPass = form.get("confirmnewPassword");

    if (!current || !newPass || !confirmnewPass) {
      setError("Please fill all fields");
      return;
    }

    if (newPass !== confirmnewPass) {
      setError("Password does not match");
      return;
    }

    try {
      const response = await fetchData({
        url: CHANGE_PASSWORD,
        method: "POST",
        data: {
          currentPassword: current,
          newPassword: newPass,
        },
      });

      if (
        response?.statusCode === 6000 &&
        response?.message === "Password changed successfully"
      ) {
        Swal.fire({
          title: "Success!",
          text: "Successfully Changed Password",
          icon: "success",
          confirmButtonText: "Ok",
          didClose: () => {
            setIsVisible(false);
            setError("");
            localStorage.clear();
            window.location.reload();
            navigation("/");
          },
        });
      } else {
        setError(response?.message);
      }
    } catch (error) {
      setError("Failed to change password");
    }
  };

  return (
    <div
      class="header"
      style={{
        paddingRight: 50,
      }}
    >
      <div class="header-left">
        {/* <div class="menu-icon dw dw-menu"></div> */}
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
            ref={refValue}
            className={`dropdown ${isOpenedDrop && "show"}`}
            onClick={() => {
              setIsOpenedDrop(!isOpenedDrop);
            }}
          >
            <a class="dropdown-toggle" role="button" data-toggle="dropdown">
              <span class="user-icon">
                <img src={"/assets/images/img.jpg"} alt="" />
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
              <a class="dropdown-item" onClick={() => setIsVisible(true)}>
                <i class="icon-copy ion-ios-unlocked"></i> Change Password
              </a>
            </div>
          </div>
        </div>
      </div>
      {isVisible && (
        <FormModal
          onClose={() => setIsVisible(false)}
          heading={"Change Password"}
        >
          {error && (
            <div
              ref={containerRef}
              class="custome-modal modal-sm modal-dialog-centered"
              style={{
                bottom: 0,
              }}
            >
              <div class="modal-content bg-danger text-white">
                <div class="modal-body text-center">
                  <h3 class="text-white mb-15">
                    <i class="fa fa-exclamation-triangle"></i> Alert
                  </h3>
                  <p>{error}</p>
                  <button
                    type="button"
                    class="btn btn-light"
                    data-dismiss="modal"
                    onClick={() => {
                      setError("");
                    }}
                  >
                    Ok
                  </button>
                </div>
              </div>
            </div>
          )}
          <form id="addCategoryForm" onSubmit={chnagePassword}>
            <div class="modal-body">
              <div class="row">
                <div class="form-group col-lg-12">
                  <label>Current Password</label>
                  <input
                    class="form-control desable-input "
                    contentEditable={false}
                    name="currentPassword"
                    type="text"
                  />
                </div>
                <div class="form-group col-lg-6">
                  <label>New Password</label>
                  <input
                    class="form-control desable-input "
                    contentEditable={false}
                    name="newPassword"
                    type="text"
                  />
                </div>
                <div class="form-group col-lg-6">
                  <label>Confirm New Password</label>
                  <input
                    class="form-control desable-input "
                    contentEditable={false}
                    name="confirmnewPassword"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => setIsVisible(false)}
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </FormModal>
      )}
    </div>
  );
}

export default Header;
