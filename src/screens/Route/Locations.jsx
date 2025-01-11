import React from "react";
import Table from "../../components/Table/Table";

function Locations() {
  return (
    <div class="main-container">
      <div class="pd-ltr-20 xs-pd-20-10">
        <div class="min-height-200px">
          <div class="page-header">
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <div class="title">
                  <h4>Routes</h4>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 text-right">
                <div class="dropdown">
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

            <Table />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Locations;
