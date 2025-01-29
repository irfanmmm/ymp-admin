import React, { useEffect, useState } from "react";
import Table from "../../components/Table/Table.tsx";
import {
  GET_PRODUCTS,
  GET_PROFILE,
  GET_SHOPS,
  GET_USERS,
  TOP_PRODUCTS,
} from "../../config/urls.js";
import { useAxios } from "../../hooks/useAxios.js";

function Home() {
  const { fetchData } = useAxios();
  const [profile, setProfile] = useState(null);
  const [staff, setStaff] = useState(null);
  const [tableRows, setTableRows] = useState([]);

  const [products, setProducts] = useState({
    brand: null,
    producs: null,
  });

  const [shops, setShops] = useState({
    route: null,
    shops: null,
  });

  useEffect(() => {
    getProfile()
      .then((response) => {
        if (response.statusCode === 6000) {
          setProfile(response?.employeeinfo);
        }
      })
      .catch(console.log);

    getEmployees()
      .then((response) => {
        if (response.statusCode === 6000) {
          setStaff(response?.employeeInfo?.length);
        }else{
          setStaff(0);
        }
      })
      .catch(console.log);

    getRoutes()
      .then((response) => {
        if (response.statusCode === 6000) {
          let count = 0;
          response?.shoplist?.forEach((route) => {
            count += route?.shops?.length;
          });

          setShops({
            route: response?.shoplist?.length,
            shops: count,
          });
        }
      })
      .catch(console.log);

    getProducts()
      .then((response) => {
        if (response.statusCode === 6000) {
          let count = 0;
          response?.productlist?.forEach((brand) => {
            count += brand?.products?.length;
          });

          setProducts({
            brand: response?.productlist?.length,
            producs: count,
          });
        }
      })
      .catch(console.log);

    getTopProducts()
      .then((response) => {
        if (response.statusCode === 6000) {
          const rows = response?.productlist?.map((product, i) => ({
            id: i,
            column1: product?.productName,
            column2: product?.categoryName,
            column3: product?.mrp,
            column4: product?.totalQuantity,
          }));

          setTableRows(rows);
        }
      })
      .catch(console.log);
  }, []);

  const getProfile = async () => {
    return await fetchData({
      url: GET_PROFILE,
    });
  };

  const getRoutes = async () => {
    return await fetchData({
      url: GET_SHOPS,
    });
  };

  const getEmployees = async () => {
    return await fetchData({
      url: GET_USERS,
    });
  };

  const getProducts = async () => {
    return await fetchData({
      url: GET_PRODUCTS,
    });
  };

  const getTopProducts = async () => {
    return await fetchData({
      url: TOP_PRODUCTS,
    });
  };

  return (
    <div class="main-container">
      <div class="pd-ltr-20">
        <div class="card-box pd-20 height-100-p mb-30">
          <div class="row align-items-center">
            <div class="col-md-4">
              <img src="/assets/images/banner-img.png" alt="" />
            </div>
            <div class="col-md-8">
              <h4 class="font-20 weight-500 mb-10 text-capitalize">
                Welcome back{" "}
                <div class="weight-600 font-30 text-blue" id="name">
                  {profile?.name}
                </div>
              </h4>
              <p class="font-18 max-width-600">
                Phone No: {profile?.phoneNumber} <br />
                Address: {profile?.address} <br />
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-3 mb-30">
            <div class="card-box height-100-p widget-style1">
              <div class="d-flex flex-wrap align-items-center">
                <div class="progress-data">
                  <img src="/assets/images/user.png" alt="" />
                </div>
                <div class="widget-data">
                  <div class="h4 mb-0">{staff}</div>
                  <div class="weight-600 font-14">Staff</div>
                </div>
              </div>
            </div>
          </div>
          {/* <div class="col-xl-2 mb-30">
            <div class="card-box height-100-p widget-style1">
              <div class="d-flex flex-wrap align-items-center">
                <div class="progress-data">
                                    <img src="/assets/images/route.png" alt="" />
                </div>
                <div class="widget-data">
                  <div class="h4 mb-0">{shops.route}</div>
                  <div class="weight-600 font-14">Routes</div>
                </div>
              </div>
            </div>
          </div> */}
          <div class="col-xl-3 mb-30">
            <div class="card-box height-100-p widget-style1">
              <div class="d-flex flex-wrap align-items-center">
                <div class="progress-data">
                  <img src="/assets/images/store.png" alt="" />
                </div>
                <div class="widget-data">
                  <div class="h4 mb-0">{shops.shops}</div>
                  <div class="weight-600 font-14">Shops</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 mb-30">
            <div class="card-box height-100-p widget-style1">
              <div class="d-flex flex-wrap align-items-center">
              <div class="progress-data">

                <img src="/assets/images/brand.png" alt="" />
              </div>
                <div class="widget-data">
                  <div class="h4 mb-0">{products.brand}</div>
                  <div class="weight-600 font-14">Brands</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 mb-30">
            <div class="card-box height-100-p widget-style1">
              <div class="d-flex flex-wrap align-items-center">
              <div class="progress-data">

                <img src="/assets/images/product.png" alt="" />
              </div>
                <div class="widget-data">
                  <div class="h4 mb-0">{products.producs}</div>
                  <div class="weight-600 font-14">Products</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Table
          headings={["Product Name", "Brand Name", "Price", "Qty"]}
          rows={tableRows}
        >
          <h2 class="h4 pd-20">Best Selling Products</h2>
        </Table>
      </div>
    </div>
  );
}

export default Home;
