import React from "react";

function Products() {
  return (
    <div>
      <div class="main-container">
        <div
          class="modal fade bs-example-modal-lg"
          id="addProduct"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title" id="myLargeModalLabel">
                  Add Products
                </h4>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="form-group col-lg-6">
                    <label>Product Code</label>
                    {/* <input type=text id='txtcodename' asp-for="ProductCode" class='form-control' /> */}
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Product Name</label>
                    {/* <input type=text id='txtcodename' asp-for="ProductName" class='form-control' /> */}
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Description</label>
                    {/* <input type=text id='txtdesc' asp-for="ProductDescription" class='form-control' /> */}
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Categories</label>
                    <select
                      id="categories"
                      asp-for="CategoryId"
                      class="form-control  selectpicker"
                      multiple
                      data-max-options="1"
                      data-live-search="true"
                      data-size="5"
                    ></select>
                  </div>
                  <div class="form-group col-lg-6">
                    <label>MRP</label>
                    {/* <input type=text id='txtdesc' asp-for="MRP" class='form-control' /> */}
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade bs-example-modal-lg"
          id="uploadProduct"
          tabindex="-1"
          role="dialog"
          aria-labelledby="myLargeModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title" id="myLargeModalLabel">
                  Upload Products
                </h4>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-hidden="true"
                >
                  ×
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="form-group col-lg-4">
                    <label>Upload Product</label>
                    <input
                      type="file"
                      class="form-control"
                      id="productUpload"
                      name="files"
                    />
                  </div>
                  <div id="div_download">
                    {/* <a class="item" id="exportProductDetails" data- toggle="tooltip" data-placement="top" data-value="1" data - original- title="Download"><i class='zmdi zmdi-download'></i></a> */}
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="pd-ltr-20 xs-pd-20-10">
          <div class="min-height-200px">
            <div class="page-header">
              <div class="row">
                <div class="col-md-6 col-sm-12">
                  <div class="title">
                    <h4>Product List</h4>
                  </div>
                </div>
                <div class="col-md-6 col-sm-12 text-right">
                  <div class="dropdown">
                    <a  class="dropdown-toggle btn btn-primary" role="button" data-toggle="dropdown" aria-expanded="false">
                               
                                Add Product
                            </a>
                    <ul class="dropdown-menu">
                      <li>
                        <a
                          asp-controller="Route"
                          asp-action="Index"
                          class="dropdown-item"
                          data-toggle="modal"
                          data-target="#addProduct"
                          type="button"
                        >
                          Add Product
                        </a>
                      </li>
                      <li>
                        <a
                          asp-controller="Route"
                          asp-action="Categories"
                          class="dropdown-item"
                          data-toggle="modal"
                          data-target="#uploadProduct"
                          type="button"
                        >
                          Upload Product
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="pd-10"></div>
              </div>
              <div class="pd-10"></div>
              <div class="pb-20">
                <div class=" col-lg-12 m-t-10">
                  <div class="table-responsive">
                    <table class="checkbox-datatable table table-striped table-bordered nowrap"></table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
