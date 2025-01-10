import React from "react";

function Headder() {
  return (
    <div class="header">
      <div class="header-left">
        <div class="menu-icon dw dw-menu"></div>
      </div>
      <div class="header-right">
        <div class="user-notification">
          <div class="dropdown">
            <a
              class="dropdown-toggle no-arrow"
              href="#"
              role="button"
              data-toggle="dropdown"
            >
              <i class="icon-copy dw dw-notification"></i>
              <span class="badge notification-active"></span>
            </a>
            <div class="dropdown-menu dropdown-menu-right">
              <div class="notification-list mx-h-350 customscroll">
                <ul>
                  <li>For Notification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="user-info-dropdown">
          <div class="dropdown">
            <a
              class="dropdown-toggle"
              href="#"
              role="button"
              data-toggle="dropdown"
            >
              <span class="user-icon">
                {/* <img src="/vendors/images/photo1.jpg" alt=""> */}
              </span>
            </a>
            <div class="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
              <a
                class="dropdown-item"
                href="javascript:;"
                data-toggle="right-sidebar"
              >
                <i class="dw dw-settings2"></i> Setting
              </a>
              <a
                class="dropdown-item"
                asp-controller="Login"
                asp-action="SignOut"
              >
                <i class="dw dw-logout"></i> Log Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Headder;
