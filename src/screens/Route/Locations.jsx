import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table.tsx";
import { FormModal } from "../../components/Modal/FormModal.jsx";
import { useAxios } from "../../hooks/useAxios.js";
import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  DELETE_ROUTE,
  GET_PRODUCTS,
  GET_SHOPS,
  SAVE_ROUTE,
} from "../../config/urls.js";
import Swal from "sweetalert2";

function Locations() {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");

  const [route, setRoute] = useState([]);

  const { fetchData } = useAxios();

  useEffect(() => {
    getRoutes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    if (!form.get("Route")) {
      setError("Please enter a Route");
      return;
    }

    try {
      const resposne = await fetchData({
        url: SAVE_ROUTE,
        method: "POST",
        data: {
          RouteName: form.get("Route"),
        },
      });

      if (resposne?.statusCode === 6000) {
        setIsVisible(!isVisible);
        setError("");
        getRoutes();
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

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Deleting this item will also remove all associated shops. Do you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetchData({
          url: `${DELETE_ROUTE}/${id}`,
          method: "DELETE",
        });

        if (response?.statusCode === 6000) {
          getRoutes();
          Swal.fire({
            title: "Deleted!",
            text: "Your Employee has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const getRoutes = async () => {
    try {
      const response = await fetchData({
        url: GET_SHOPS,
      });

      if (response?.statusCode === 6000) {
        const rows = [];
        response.shoplist?.forEach((route) => {
          rows.push({
            id: route?.routeId,
            column1: route?.routeName,
            column2: route?.shops?.length,
            column3: (
              <i
                className="icon-copy fa fa-trash fa-lg "
                aria-hidden="true"
              ></i>
            ),
          });
        });
        setRoute(rows);
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
        {isVisible && (
          <FormModal heading={"Route"} onClose={() => setIsVisible(!isVisible)}>
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
                    <label>Route Name</label>
                    <input
                      type="text"
                      id="txtcodename"
                      asp-for="Route"
                      class="form-control"
                      name="Route"
                    />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => setIsVisible(!isVisible)}
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
                  <h4>Route</h4>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 text-right">
                <div class="dropdown" onClick={() => setIsVisible(!isVisible)}>
                  <a
                    class="btn btn-primary dropdown-toggle no-arrow"
                    href="#"
                    data-toggle="modal"
                    data-target="#addCategory"
                    role="button"
                  >
                    Add Route
                  </a>
                </div>
              </div>
              <div class="pd-10"></div>
            </div>

            <Table
              headings={["Route Name", "Number Of Shops", "Action"]}
              rows={route}
              actions={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Locations;
