import React, { useState } from "react";

function Headder() {
  const [isOpendDrop, setIsOpendDrop] = useState(false);
  return (
    <div class="header" style={{
      paddingRight:50
    }} >
      <div class="header-left">
        <div class="menu-icon dw dw-menu"></div>
      </div>
      <div class="header-right mr-md">
        
        <div className={"user-info-dropdown mr-lg"}>
          <div
            className={`dropdown ${isOpendDrop && "show"}`}
            onClick={() => {
              setIsOpendDrop(!isOpendDrop);
            }}
          >
            <a class="dropdown-toggle" role="button" data-toggle="dropdown">
              <span class="user-icon">
                {/* <img src="/vendors/images/photo1.jpg" alt=""> */}
              </span>
            </a>
            <div
              className={`dropdown-menu  dropdown-menu-right dropdown-menu-icon-list ${
                isOpendDrop && "show"
              }`}
            >
              <a class="dropdown-item">
                <i class="dw dw-settings2"></i> Setting
              </a>
              <a class="dropdown-item">
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
