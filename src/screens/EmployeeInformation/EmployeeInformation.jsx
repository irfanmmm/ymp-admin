import React from "react";

function EmployeeInformation() {
  return (
    <div class="main-container">
      <div class="pd-ltr-20 xs-pd-20-10">
        <div class="min-height-200px">
          <div class="page-header">
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <div class="title">
                  <h4>Employee Information</h4>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 text-right">
                <div class="dropdown">
                  <a
                    class="btn btn-primary dropdown-toggle no-arrow"
                    href="#"
                    role="button"
                  >
                    Add Employees
                  </a>
                </div>
              </div>
              <div class="pd-10"></div>
            </div>

            <div class="card-box mb-30">
              <div class="pd-10"></div>
              <div class="pb-20">
                <table class="checkbox-datatable table nowrap"></table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeInformation;
