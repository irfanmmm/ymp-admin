import React from "react";
import Table from "../../components/Table/Table";

function DailyOrders() {
  return (
    <div class="main-container">
      <div class="pd-ltr-20 xs-pd-20-10">
        <div class="min-height-200px">
          <div class="page-header">
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <div class="title">
                  <h4>Daylie Ordes</h4>
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

export default DailyOrders;
