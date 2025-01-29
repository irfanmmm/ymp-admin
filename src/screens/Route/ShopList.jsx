import React, { useEffect, useRef, useState } from "react";
import Table from "../../components/Table/Table.tsx";
import { FormModal } from "../../components/Modal/FormModal.jsx";
import { useAxios } from "../../hooks/useAxios.js";
import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  DELETE_ROUTE,
  DELETE_SHOP,
  GET_PRODUCTS,
  GET_SHOPS,
  SAVE_ROUTE,
  SAVE_SHOP,
} from "../../config/urls.js";
import Swal from "sweetalert2";
import moment from "moment";

function ShopList() {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");

  const containerRef = useRef(null);

  const [shop, setShop] = useState([]);
  const [routes, setRoutes] = useState([]);

  const { fetchData } = useAxios();

  useEffect(() => {
    getShops();
    document.addEventListener("click", (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setError("");
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    if (!form.get("Shop")) {
      setError("Please enter a Shop");
      return;
    } else if (!form.get("Address")) {
      setError("Please enter a Address");
      return;
    } else if (
      !form.get("Phone") ||
      form.get("Phone").toString().length !== 10
    ) {
      setError("Please enter a Valid Phone");
      return;
    } else if (!form.get("Route")) {
      setError("Please Select a Route");
      return;
    }

    try {
      const resposne = await fetchData({
        url: SAVE_SHOP,
        method: "POST",
        data: {
          RouteId: parseInt(form.get("Route")),
          RouteName: routes.find((v) => v.routeId == form.get("Route"))
            ?.routeName,
          ShopName: form.get("Shop"),
          Address: form.get("Address"),
          PhoneNo: form.get("Phone"),
          GSTNO: form.get("GST") || "",
          // EntryDate: moment(new Date()).format("YYYY-MM-DD HH:mm:ss:ms").toString(),
        },
      });

      console.log("====================================");
      console.log(resposne);
      console.log("====================================");

      if (resposne?.statusCode === 6000) {
        setIsVisible(!isVisible);
        setError("");
        getShops();
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
      text: "Do you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetchData({
          url: `${DELETE_SHOP}/${id}`,
          method: "DELETE",
        });

        if (response?.statusCode === 6000) {
          getShops();
          Swal.fire({
            title: "Deleted!",
            text: "Your Employee has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const getShops = async () => {
    try {
      const response = await fetchData({
        url: GET_SHOPS,
      });

      if (response?.statusCode === 6000) {
        const rows = [];

        response?.shoplist?.forEach((route) => {
          route?.shops?.forEach((shop) => {
            rows.push({
              id: shop?.id,
              column1: shop?.shopName,
              column2: shop?.address,
              column3: shop?.phoneNo,
              column4: route?.routeName,
              column5: shop?.gst || "Not Exist",
              column6: (
                <i
                  className="icon-copy fa fa-trash fa-lg "
                  aria-hidden="true"
                ></i>
              ),
            });
          });
        });

        setShop(rows);

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
        {isVisible && (
          <FormModal heading={"Shop"} onClose={() => setIsVisible(!isVisible)}>
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
                    <label>Shops Name</label>
                    <input
                      type="text"
                      id="txtcodename"
                      class="form-control"
                      name="Shop"
                    />
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Address</label>
                    <input
                      type="text"
                      id="txtcodename"
                      class="form-control"
                      name="Address"
                    />
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Phone Number</label>
                    <input
                      type="number"
                      maxLength={10}
                      id="txtcodename"
                      class="form-control"
                      name="Phone"
                    />
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Route</label>
                    <select
                      type="text"
                      id="txtcodename"
                      class="form-control"
                      multiple={false}
                      name="Route"
                    >
                      <option value="">---Select Route---</option>
                      {routes?.map((value) => (
                        <option value={value?.routeId}>
                          {value?.routeName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div class="form-group col-lg-6">
                    <label>GST Number (Optional)</label>
                    <input
                      type="text"
                      id="txtcodename"
                      class="form-control"
                      name="GST"
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
                  <h4>Shops</h4>
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
                    Add Shop
                  </a>
                </div>
              </div>
              <div class="pd-10"></div>
            </div>

            <Table
              headings={[
                "Shop Name",
                "Shop Address",
                "Phone Number",
                "Route Name",
                "GST Number",
                "Action",
              ]}
              rows={shop}
              actions={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopList;
