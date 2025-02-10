import React, { useEffect, useRef, useState } from "react";
import Table from "../../components/Table/Table.tsx";
import { FormModal } from "../../components/Modal/FormModal.jsx";
import { useAxios } from "../../hooks/useAxios.js";
import {
  BASE_URL,
  DELETE_PRODUCT,
  DOWNLOAD_XCEL,
  GET_PRODUCTS,
  SAVE_PRODUCT,
  UPLOAD_PRODUCT,
} from "../../config/urls";
import Swal from "sweetalert2";

function Products() {
  const { fetchData } = useAxios();
  const [isVisibleDropDown, setIsVisibleDropDown] = useState(false);
  const [productCatogory, setProductCatogory] = useState([]);
  const [productList, setProductList] = useState([]);
  const [category, setCategory] = useState([]);

  const [error, setError] = useState("");
  const containerRef = useRef(null);
  const dropdown = useRef(null);

  const [isVisible, setIsVisible] = useState({
    form: false,
    upload: false,
  });

  useEffect(() => {
    getProducts();
    document.addEventListener("click", (e) => {
      if (dropdown.current && !dropdown.current.contains(e.target)) {
        setIsVisibleDropDown(false);
      }
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setError("");
      }
    });
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetchData({
        url: GET_PRODUCTS,
      });

      if (response?.statusCode === 6000) {
        const rows = [];

        console.log(response.productlist);

        response.productlist?.forEach((catogory) => {
          catogory?.products?.forEach((product) => {
            rows.push({
              id: product?.id,
              column1: product?.productCode,
              column2: product?.productName,
              column3: product?.productDescription,
              column4: catogory?.category,
              column5: product?.mrp,
              column6: (
                <i
                  className="icon-copy fa fa-trash fa-lg "
                  aria-hidden="true"
                ></i>
              ),
            });
          });
        });

        setProductList(rows);

        setProductCatogory(rows);

        const catogoryList = response.productlist?.map((catogory) => ({
          categoryId: catogory?.categoryId,
          category: catogory?.category,
        }));

        setCategory(catogoryList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClick = (e) => {
    if (e === "ADD") {
      setIsVisible({
        form: true,
        upload: false,
      });
    } else {
      setIsVisible({
        form: false,
        upload: true,
      });
    }
  };

  const handleDelete = async (event) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await fetchData({
          url: `${DELETE_PRODUCT}/${event}`,
          method: "DELETE",
        });
        console.log("response", response);
        if (response?.statusCode === 6000) {
          getProducts();

          Swal.fire({
            title: "Deleted!",
            text: "Your Employee has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    if (!form.get("ProductCode") || form.get("ProductCode").length >= 10) {
      setError("Please enter a ProductCode");
      return;
    } else if (!form.get("ProductName")) {
      setError("Please enter a ProductName");
      return;
    } else if (!form.get("Categories")) {
      setError("Please Select a Categories");
      return;
    } else if (!form.get("MRP") || form.get("MRP").toString().length >= 10) {
      setError("Please enter a Valid MRP");
      return;
    }

    const response = await fetchData({
      url: SAVE_PRODUCT,
      method: "POST",
      data: {
        ProductCode: form.get("ProductCode"),
        ProductName: form.get("ProductName"),
        ProductDescription: form.get("Description").toString(),
        CategoryId: parseInt(form.get("Categories")),
        Category: category.find((v) => v.categoryId == form.get("Categories"))
          ?.category,
        MRP: form.get("MRP").toString(),
      },
    });

    if (response?.statusCode === 6000) {
      setIsVisible(!isVisible);
      setError("");
      getProducts();
      Swal.fire({
        title: "Success!",
        text: "Successfully Added",
        icon: "success",
        confirmButtonText: "Ok",
      });
    } else {
      setError(response?.message);
    }
  };

  const handleSubmitExcelSheet = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);

    const formDate = new FormData();

    formDate.append("file", form.get("Products"));
    try {
      const response = await fetchData({
        url: UPLOAD_PRODUCT,
        method: "POST",
        data: formDate,
        headers: {
          mimeType: "multipart/form-data",
        },
      });

      if (response?.statusCode === 6000) {
        getProducts();
        Swal.fire({
          title: "Success!",
          text: "Successfully Added",
          icon: "success",
          confirmButtonText: "Ok",
        });

        setIsVisible({
          form: false,
          upload: false,
        });
      } else {
        Swal.fire({
          title: "Waring!",
          text: response?.message,
          icon: "warning",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {}

    console.log(form.get("Products"));
  };

  




  return (
    <div class="main-container">
      <div
        class="pd-ltr-20 xs-pd-20-10"
        style={{
          position: "relative",
        }}
      >
        {isVisible.form ? (
          <FormModal
            heading={"Product"}
            onClose={() =>
              setIsVisible({
                form: false,
                upload: false,
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
                    <label>Product Code</label>
                    <input
                      type="text"
                      id="txtcodename"
                      asp-for="Categorycode"
                      class="form-control"
                      name="ProductCode"
                    />
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Product Name</label>
                    <input
                      type="text"
                      id="txtcodename"
                      asp-for="CategoryName"
                      class="form-control"
                      name="ProductName"
                    />
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Description</label>
                    <input
                      type="text"
                      id="txtcodename"
                      asp-for="CategoryName"
                      class="form-control"
                      name="Description"
                    />
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Categories</label>
                    <select
                      type="text"
                      id="txtcodename"
                      asp-for="CategoryName"
                      class="form-control"
                      multiple={false}
                      name="Categories"
                    >
                      <option value="">---Select Category---</option>
                      {category?.map((value) => (
                        <option value={value?.categoryId}>
                          {value?.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div class="form-group col-lg-6">
                    <label>MRP</label>
                    <input
                      type="number"
                      id="txtcodename"
                      asp-for="CategoryName"
                      class="form-control"
                      name="MRP"
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
        ) : (
          isVisible.upload && (
            <FormModal
              heading={"Product"}
              onClose={() =>
                setIsVisible({
                  form: false,
                  upload: false,
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
              <form id="uploadForm" onSubmit={handleSubmitExcelSheet}>
                <div class="modal-body">
                  <div class="row">
                    <div class="form-group col-lg-6">
                      <label>Add Product List</label>
                      <input
                        type="file"
                        id="txtcodename"
                        asp-for="Categorycode"
                        class="form-control"
                        name="Products"
                        accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                      />
                    </div>
                    <div
                      class="form-group col-lg-6"
                      style={{
                        margin: "auto",
                      }}
                    >
                      <label
                        style={{
                          marginBottom: 0,
                          fontSize: 12,
                        }}
                      >
                        Formate Hare <br />
                        <a
                          href={DOWNLOAD_XCEL}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "8px 12px",
                            backgroundColor: "#007bff",
                            color: "white",
                            borderRadius: "4px",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <i
                            className="fa fa-download"
                            style={{ marginRight: "8px" }}
                          ></i>
                          Download
                        </a>
                      </label>
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
          )
        )}
        <div class="min-height-200px">
          <div class="page-header">
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <div class="title">
                  <h4>Product</h4>
                </div>
              </div>

              <div class="col-md-6 col-sm-12 text-right">
                <div class="dropdown">
                  <a
                    href="#"
                    class="dropdown-toggle btn btn-primary"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                    ref={dropdown}
                    onClick={() => {
                      setIsVisibleDropDown(!isVisibleDropDown);
                    }}
                  >
                    Add Product
                  </a>
                  {isVisibleDropDown && (
                    <div
                      style={{
                        position: "absolute",
                        background: "white",
                        top: "100%",
                        right: "0%",
                        boxShadow: "1px 1px 10px 1px",
                        borderRadius: 5,
                      }}
                    >
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={() => onClick("ADD")}
                      >
                        Add Product
                      </a>
                      <a
                        class="dropdown-item"
                        href="#"
                        onClick={() => onClick("UPLOAD")}
                      >
                        Upload Product
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div class="pd-10"></div>
            </div>

        

            <Table
              headings={[
                "Product Code",
                "Product Name",
                "Product Description",
                "Brand Name",
                "MRP",
                "Action",
              ]}
              rows={productList}
              actions={handleDelete}
            />
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
