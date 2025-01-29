import React, { useEffect, useRef, useState } from "react";
import Table from "../../components/Table/Table.tsx";
import { FormModal } from "../../components/Modal/FormModal.jsx";
import { useAxios } from "../../hooks/useAxios.js";
import {
  ADD_CATEGORY,
  ASSIGN_ROUTE,
  ASSIGNED_ROUTE,
  DAILY_ORDERS,
  GET_SHOPS,
} from "../../config/urls.js";
import Swal from "sweetalert2";
import moment from "moment";
import { MultiSelect } from "react-multi-select-component";

function AssignRoute() {
  const [isVisible, setIsVisible] = useState({
    id: null,
    isVisible: false,
  });
  const [error, setError] = useState("");
  const containerRef = useRef(null);

  const [currentUsers, setCurrentUser] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [route, setRoute] = useState([]);
  const [selected, setSelected] = useState([]);

  const { fetchData } = useAxios();

  useEffect(() => {
    getRouteWithCurrentUser();
    getRoutes();
    document.addEventListener("click", (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setError("");
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selected);

    if (selected.length == 0 || !selected) {
      setError("Please select Route");
      return;
    }

    const userId = isVisible.id;
    const assignRouteList = selected.map((v, i) => ({
      Employeeid: userId,
      AssignedRouteId: v.value,
    }));

    try {
      const resposne = await fetchData({
        url: ASSIGN_ROUTE,
        method: "POST",
        data: assignRouteList,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(resposne);

      if (resposne?.statusCode === 6000) {
        setIsVisible({
          id: null,
          visible: !isVisible.isVisible,
        });
        setError("");
        getRouteWithCurrentUser();
        Swal.fire({
          title: "Success!",
          text: "Successfully Added",
          icon: "success",
          confirmButtonText: "Ok",
        });
      } else {
        setError(resposne?.message);
      }
    } catch (error) {}
  };

  const handleAddRoute = async (id) => {
    setIsVisible({
      id,
      isVisible: !isVisible.isVisible,
    });
  };

  const getRoutes = async () => {
    try {
      const response = await fetchData({
        url: GET_SHOPS,
      });

      if (response?.statusCode === 6000) {
        const routes = response?.shoplist?.map((shop) => ({
          routeId: shop?.routeId,
          routeName: shop?.routeName,
        }));
        setRoute(routes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRouteWithCurrentUser = async () => {
    try {
      const response = await fetchData({
        url: ASSIGNED_ROUTE,
      });

      console.log(response);
      

      if (response?.statusCode === 6000) {
        const rows = [];
        response?.allroute?.forEach((route) => {
          rows.push({
            id: route?.employeeId,
            column1: route?.employeeName,
            column2: route?.routes
              ?.map((assigned) => assigned?.routeName)
              ?.join(" , "),
            column3: moment(route?.latestAssignedDate).format("DD-MM-YYYY"),
            column4: (
              <i
                class="icon-copy fa fa-plus"
                style={{
                  cursor: "pointer",
                }}
                aria-hidden="true"
              ></i>
            ),
          });
        });

        setCurrentUser(rows);

        const routes = response?.shoplist?.map((route) => ({
          routeId: route?.routeId,
          routeName: route?.routeName,
        }));

        setRoutes(routes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="main-container">
      <div
        style={{
          position: "relative",
        }}
        class="pd-ltr-20 xs-pd-20-10"
      >
        {isVisible.isVisible && (
          <FormModal
            heading={"Daily Assigned Route"}
            onClose={() =>
              setIsVisible({
                id: null,
                visible: !isVisible.isVisible,
              })
            }
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
            <form id="addCategoryForm" onSubmit={handleSubmit}>
              <div class="modal-body">
                <div class="row">
                  <div class="form-group col-lg-6">
                    <label>User</label>
                    <input
                      class="form-control desable-input "
                      contentEditable={false}
                      
                      value={
                        currentUsers.find((user) => isVisible.id === user.id)
                          ?.column1
                      }
                      type="text"
                    />
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Route</label>
                    <MultiSelect
                      options={route.map((value) => ({
                        value: value.routeId,
                        label: value.routeName,
                      }))}
                      value={selected}
                      onChange={setSelected}
                      labelledBy="Select"
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() =>
                    setIsVisible({
                      id: null,
                      visible: !isVisible.isVisible,
                    })
                  }
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
        <div class="min-height-200px">
          <div class="page-header">
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <div class="title">
                  <h4>Daily Assigned Route</h4>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 text-right"></div>
              <div class="pd-10"></div>
            </div>

            <Table
              headings={[
                "Employee Name",
                "Assigned Route",
                "Assigned Date",
                "Action",
              ]}
              rows={currentUsers}
              actions={handleAddRoute}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignRoute;
