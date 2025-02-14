import React, { useState } from "react";
import { useNavigate } from "react-router";

const TABS = [
  {
    title: "Home",
    icon: <span class="micon dw dw-house-1"></span>,
    activeIcon: <span class="fa-solid fa-house"></span>,
    path: "/",
  },
  {
    title: "Employee Info",
    icon: <span class="micon fa fa-users"></span>,
    activeIcon: <span class="fa-solid fa-users"></span>,
    path: "/EmployeeInformation",
  },
  {
    title: "Assign Route",
    icon: <span class="micon icon-copy dw dw-panel6"></span>,
    activeIcon: <span class="icon-copy dw dw-panel6"></span>,
    path: "/AssignRoutes",
  },
  {
    title: "Products",
    icon: <span class="micon icon-copy fa fa-cubes" aria-hidden="true"></span>,
    activeIcon: <span class="micon fa-solid fa-layer-group"></span>,
    subCategory: [
      {
        parant: "Products",

        title: "Product List",
        path: "/Products/Products",
      },
      {
        parant: "Products",

        title: "Categories",
        path: "/Products/Catogory",
      },
    ],
  },
  {
    title: "Route",
    icon: (
      <span class="micon icon-copy fa fa-map-marker" aria-hidden="true"></span>
    ),
    activeIcon: <span class="fa-solid fa-location-dot"></span>,
    subCategory: [
      {
        parant: "Route",
        title: "Route List",
        path: "/Route/Locations",
      },
      {
        parant: "Route",

        title: "Shop List",
        path: "/Route/ShopList",
      },
    ],
  },
  {
    title: "Daily Orders",
    icon: <span class="micon dw dw-invoice"></span>,
    activeIcon: <span class="fa-solid fa-users"></span>,
    path: "/DailyOrders",
  },
];

function Drower() {
  const navigation = useNavigate();
  const [isOpend, setIsOpend] = useState({
    isOpend: false,
    index: 0,
  });

  const handleClickLogin = (acc, path, index) => {
    if (acc.title === "Route" || acc.title === "Products") {
      setIsOpend({
        isOpend: true,
        index,
      });
    } else {
      setIsOpend({
        isOpend: false,
        index,
      });
      navigation(path);
    }
  };
  return (
    <div class="left-side-bar">
      <div class="brand-logo">
        {/* <div class="close-sidebar" data-toggle="left-sidebar-close"> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 15,
          }}
        >
          <img
            src="/assets/images/ic_launcher.png"
            alt=""
            style={{
              // marginTop: -50,
              width: 50,
              height: 50,
              borderRadius: 10,
            }}
          />
          <h2
            style={{
              color: "white",
            }}
          >
            YMP
          </h2>
          {/* </div> */}
        </div>
      </div>
      <div class="menu-block customscroll">
        <div class="sidebar-menu">
          <ul id="accordion-menu">
            {TABS?.map((acc, index) => (
              <li
                key={index}
                class="dropdown "
                onClick={() => handleClickLogin(acc, acc.path, index)}
              >
                <a
                  class={`dropdown-toggle ${
                    isOpend.index === index && "active"
                  } ${!acc.subCategory && "no-arrow"}`}
                >
                  {acc.icon}
                  <span class="mtext">{acc.title}</span>
                </a>
                <ul
                  class="submenu"
                  style={{
                    display:
                      acc.subCategory &&
                      isOpend.index === index &&
                      isOpend.isOpend
                        ? "block"
                        : "none",
                  }}
                >
                  {acc.subCategory?.map((subCategory, i) => (
                    <li
                      key={i}
                      onClick={() =>
                        handleClickLogin(subCategory, subCategory.path, index)
                      }
                    >
                      <a className="active">{subCategory.title}</a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Drower;
