import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Table from "../../components/Table/Table.tsx";
import { FormModal } from "../../components/Modal/FormModal.jsx";
import { DELETE_USERS, GET_USERS, SAVE_USERS } from "../../config/urls";
import { useAxios } from "../../hooks/useAxios.js";
import Swal from "sweetalert2";

function EmployeeInformation() {
  const navigation = useNavigate();

  const containerRef = useRef(null);
  const { fetchData } = useAxios();
  const [isVisible, setIsVisible] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState("");

  const handleAddNewEmployee = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    getEmployees();

    document.addEventListener("click", (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setError("");
      }
    });
  }, []);

  const getEmployees = async () => {
    try {
      const response = await fetchData({
        url: GET_USERS,
      });

      console.log(response);

      if (response?.statusCode === 6000) {
        const employee = response?.employeeInfo?.map((employee) => ({
          id: employee?.id,
          column1: employee?.userName,
          column2: employee?.name,
          column3: employee?.email,
          column4: employee?.phoneNumber,
          column5: employee?.address,
          column6: employee?.city,
          column7: (
            <i className="icon-copy fa fa-trash fa-lg " aria-hidden="true"></i>
          ),
        }));

        setEmployees(employee);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    console.log(form.get("Role"));

    if (!form.get("Name")) {
      setError("Please enter a name");
      return;
    } else if (!form.get("Email")) {
      setError("Please enter a Email");
      return;
    } else if (!form.get("Role")) {
      setError("Please select a User Role");
      return;
    } else if (
      !form.get("Phone") ||
      form.get("Phone").toString().length !== 10
    ) {
      setError("Please enter a Valid Phone");
      return;
    } else if (!form.get("Address")) {
      setError("Please enter a Address");
      return;
    } else if (!form.get("City")) {
      setError("Please enter a City");
      return;
    }

    const response = await fetchData({
      url: SAVE_USERS,
      method: "POST",
      data: {
        Name: form.get("Name"),
        Email: form.get("Email"),
        PhoneNumber: form.get("Phone").toString(),
        Address: form.get("Address"),
        City: form.get("City"),
        RoleId: form.get("Role"),
      },
    });

    if (response?.statusCode === 6000) {
      getEmployees();
      setIsVisible(!isVisible);
      setError("");
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
          url: `${DELETE_USERS}/${event}`,
          method: "DELETE",
        });

        if (response?.statusCode === 6000) {
          getEmployees();
          Swal.fire({
            title: "Deleted!",
            text: "Your Employee has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div class="main-container">
      <div
        class="pd-ltr-20 xs-pd-20-10"
        style={{
          position: "relative",
        }}
      >
        {isVisible && (
          <FormModal
            heading={"Add Employee"}
            onClose={() => setIsVisible(!isVisible)}
          >
            {error && (
              <div
                ref={containerRef}
                class="custome-modal modal-sm modal-dialog-centered shadow-lg"
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
                    <label>Name</label>
                    <input
                      type="text"
                      id="txtcodename"
                      asp-for="Categorycode"
                      class="form-control"
                      name="Name"
                    />
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Email</label>
                    <input
                      type="email"
                      id="txtcodename"
                      asp-for="CategoryName"
                      class="form-control"
                      name="Email"
                    />
                  </div>
                  <div class="form-group col-lg-6">
                    <label>User Role</label>
                    <select class="form-control" name="Role" id="">
                      <option value="">Select Role</option>
                      <option value="1">Admin</option>
                      <option value="2">User</option>
                    </select>
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Phone No</label>
                    <input
                      type="number"
                      id="txtcodename"
                      asp-for="CategoryName"
                      class="form-control"
                      name="Phone"
                      maxLength={10}
                    />
                  </div>
                  <div class="form-group col-lg-6">
                    <label>Address</label>
                    <input
                      type="text"
                      id="txtcodename"
                      asp-for="CategoryName"
                      class="form-control"
                      name="Address"
                    />
                  </div>
                  <div class="form-group col-lg-6">
                    <label>City</label>
                    <input
                      type="text"
                      id="txtcodename"
                      asp-for="CategoryName"
                      class="form-control"
                      name="City"
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
                  <h4>Employee Information</h4>
                </div>
              </div>
              <div class="col-md-6 col-sm-12 text-right">
                <div class="dropdown" onClick={handleAddNewEmployee}>
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

            <div class="row">
              <div class="pd-10"></div>
            </div>

            <Table
              rows={employees}
              actions={handleDelete}
              headings={[
                "User Name",
                "Name",
                "Email",
                "Phone Number",
                "Address",
                "City",
                "Action",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeInformation;
