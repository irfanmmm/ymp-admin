function AddEmplyee() {
  return (
    <form>
      <div class="form-group row">
        <label class="col-sm-12 col-md-2 col-form-label">Employee Name</label>
        <div class="col-sm-12 col-md-10">
          <input class="form-control" type="text" placeholder="Johnny Brown" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-sm-12 col-md-2 col-form-label">Email</label>
        <div class="col-sm-12 col-md-10">
          <input
            class="form-control"
            value="bootstrap@example.com"
            type="email"
          />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-12 col-md-2 col-form-label">UserName</label>
        <div class="col-sm-12 col-md-10">
          <input class="form-control" type="text" placeholder="Johnny Brown" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-12 col-md-2 col-form-label">Phone No</label>
        <div class="col-sm-12 col-md-10">
          <input class="form-control" value="1-(111)-111-1111" type="tel" />
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-12 col-md-2 col-form-label">Password</label>
        <div class="col-sm-12 col-md-10">
          <input class="form-control" value="password" type="password" />
        </div>
      </div>

      <div class="form-group row">
        <label class="col-sm-12 col-md-2 col-form-label">Employee Role</label>
        <div class="col-sm-12 col-md-10">
          <select class="custom-select col-12">
            <option selected="">Choose...</option>
            <option value="1">Admin</option>
            <option value="2">Staff</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <label class="col-sm-12 col-md-2 col-form-label"></label>

        <div class="col-sm-12 col-md-10">
          <button
            type="button"
            style={{
              alignSelf: "flex-end",
            }}
            class="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default AddEmplyee;
