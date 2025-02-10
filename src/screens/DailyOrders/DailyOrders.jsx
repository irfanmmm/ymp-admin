import React, { useEffect, useRef, useState } from "react";
import Table from "../../components/Table/Table.tsx";
import { useAxios } from "../../hooks/useAxios.js";
import { DAILY_ORDERS } from "../../config/urls.js";
import moment from "moment";
import { FormModal } from "../../components/Modal/FormModal.jsx";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function DailyOrder() {
  const [isVisible, setIsVisible] = useState({
    id: null,
    isVisible: false,
  });

  const [tableRows, setTableRows] = useState([]);
  const [selected, setSelected] = useState([]);

  const { fetchData } = useAxios();

  useEffect(() => {
    getDailyOrders();
  }, []);

  const handleGetOrderBill = async (id) => {
    setIsVisible({
      id,
      isVisible: !isVisible.isVisible,
    });
  };

  const getDailyOrders = async () => {
    try {
      const response = await fetchData({
        url: DAILY_ORDERS,
      });

      if (response?.statusCode === 6000) {
        const rows = [];
        const billRows = [];
        response?.productlist?.forEach((produc) => {
          rows.push({
            id: produc?.orderId,
            column1: `ORD-${produc?.orderId}`,
            column2: produc?.shopName,
            column3: produc?.employeeName,
            column4: produc?.products?.length,
            column5: produc?.products?.reduce(
              (total, item) => total + item?.mrp,
              0
            ),
            column6: produc?.discountPercentage,
            column7: moment(produc?.date).format("DD-MM-YYYY"),
            column8: <i class="icon-copy bi bi-eye-fill"></i>,
          });
          billRows.push({
            id: produc?.orderId,
            products: produc?.products,
            shopAddress: produc?.shopAddress,
            shopName: produc?.shopName,
            date: moment(produc?.data).format("DD-MM-YYYY"),
          });
        });
        setSelected(billRows);
        setTableRows(rows);
      } else {
        throw new Error("Rows is empty");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownloadBill = () => {
    const titleRow = [["Daily Orders Report"]];
    const dataRows = selected
      ?.filter((v) => v.id === isVisible.id)[0]
      ?.products?.map((row, i) => ({
        "SL NO": i + 1,
        Product: row?.productName ?? "N/A",
        Category: row?.category,
        QTY: row?.quantity,
        MRP: row?.mrp,
        "Total Price": row?.mrp * row?.quantity,
      }));
    const worksheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(worksheet, titleRow, { origin: "A1" });
    XLSX.utils.sheet_add_json(worksheet, dataRows, {
      origin: "A3",
      skipHeader: false,
    });

    const numberOfColumns = Object.keys(dataRows[0]).length;
    worksheet["!merges"] = [
      {
        s: { r: 0, c: 0 },
        e: { r: 0, c: numberOfColumns - 1 },
      },
    ];
    worksheet["A1"].s = {
      alignment: { horizontal: "center", vertical: "center" },
      fill: { fgColor: { rgb: "FFFF00" } },
    };

    worksheet["!cols"] = Array(numberOfColumns).fill({ width: 20 });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `Daily_Orders_${moment().format("YYYYMMDD_HHmmss")}.xlsx`);
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
            heading={"View Order"}
            onClose={() =>
              setIsVisible({
                id: null,
                visible: !isVisible.isVisible,
              })
            }
          >
            <div class="card-box mb-30">
              <div class="pd-20">
                <h4 class="text-blue h4">
                  {
                    selected?.find((sele) => sele?.id === isVisible.id)
                      ?.shopName
                  }
                </h4>
                <p class="mb-0">
                  {
                    selected?.find((sele) => sele?.id === isVisible.id)
                      ?.shopAddress
                  }
                </p>
              </div>

              <div
                class="pb-20 scroll-hide"
                style={{
                  overflow: "scroll",
                  maxHeight: 500,
                  minWidth: 800,
                }}
              >
                <table class="data-table table-success table table-bordered data-table-export stripe hover nowrap">
                  <thead
                    style={{
                      position: "sticky",
                      top: -5,
                      background: "white",
                    }}
                  >
                    <tr>
                      <th class="table-plus datatable-nosort">SL No</th>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Qty</th>
                      <th>MRP</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selected
                      ?.find((sele) => sele?.id === isVisible.id)
                      ?.products?.map((row, i) => (
                        <tr>
                          <td class="table-plus">{i + 1}</td>
                          <td>{row?.productName}</td>
                          <td>{row?.category}</td>
                          <td>{row?.quantity}</td>
                          <td>{row?.mrp}</td>
                          <td>{row?.quantity * row?.mrp}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
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
              <button
                type="submit"
                class="btn btn-primary"
                onClick={() => handleDownloadBill()}
              >
                Download
              </button>
            </div>
          </FormModal>
        )}
        <div class="min-height-200px">
          <div class="page-header">
            <div class="row">
              <div class="col-md-6 col-sm-12">
                <div class="title">
                  <h4>Daily Orders</h4>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 text-right"></div>
              <div class="pd-10"></div>
            </div>

            <Table
              headings={[
                "Order Id",
                "Shop Name",
                "Order Taken By",
                "Total Product",
                "Total Price",
                "Discount Given",
                "Date",
                "View Order",
              ]}
              rows={tableRows}
              actions={handleGetOrderBill}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyOrder;
