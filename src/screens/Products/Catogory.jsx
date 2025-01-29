import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table.tsx";
import { FormModal } from "../../components/Modal/FormModal.jsx";
import { useAxios } from "../../hooks/useAxios.js";
import { ADD_CATEGORY, DELETE_CATEGORY, GET_PRODUCTS } from "../../config/urls.js";
import Swal from "sweetalert2";

function Catogory() {
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState("");

  const [productCatogory, setProductCatogory] = useState([]);

  const { fetchData } = useAxios();

  useEffect(() => {
    getCatogory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    if (!form.get("categoryCode")) {
      setError("Please enter a category");
      return;
    } else if (!form.get("categoryName")) {
      setError("Please enter a categoryName");
      return;
    }

    try {
      const resposne = await fetchData({
        url: ADD_CATEGORY,
        method: "POST",
        data: {
          Description: form.get("categoryCode"),
          CategoryName: form.get("categoryName"),
        },
      });

      if (resposne?.statusCode === 6000) {
        setIsVisible(!isVisible);
        setError("");
        getCatogory();
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
      text: "Deleting this item will also remove all associated products. Do you want to proceed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetchData({
          url: `${DELETE_CATEGORY}/${id}`,
          method: "DELETE",
        });

        if (response?.statusCode === 6000) {
          getCatogory();
          Swal.fire({
            title: "Deleted!",
            text: "Your Employee has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const getCatogory = async () => {
    try {
      const response = await fetchData({
        url: GET_PRODUCTS,
      });

      if (response?.statusCode === 6000) {
        const rows = [];
        response.productlist?.forEach((catogory) => {
          rows.push({
            id: catogory?.categoryId,
            column1: catogory?.categoryDescription,
            column2: catogory?.category,
            column3: catogory?.products?.length,
            column4: (
              <i
                className="icon-copy fa fa-trash fa-lg "
                aria-hidden="true"
              ></i>
            ),
          });
        });
        setProductCatogory(rows);
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
          <FormModal  heading={"Category"} onClose={() => setIsVisible(!isVisible)}>
            <form id="addCategoryForm" onSubmit={handleSubmit}>
              <div class="modal-body">
                <div class="row">
                  <div class="form-group col-lg-6">
                    <label>Category Code</label>
                    <input
                      type="text"
                      id="txtcodename"
                      asp-for="Categorycode"
                      class="form-control"
                      name="categoryCode"
                    />
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Category Name</label>
                    <input
                      type="text"
                      id="txtcodename"
                      asp-for="CategoryName"
                      class="form-control"
                      name="categoryName"
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
                  <h4>Category</h4>
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
                    Add Category
                  </a>
                </div>
              </div>
              <div class="pd-10"></div>
            </div>

            <Table
              headings={[
                "Category Code",
                "Category Name",
                "Total Products",
                "Action",
              ]}
              rows={productCatogory}
              actions={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catogory;
