import React from "react";

type Props = {
  rows: [{
    name: string,
    age: number,
    office: string,
    address: string,
    startDate: string,
    action?: React.ReactNode
  }],
  children?: React.ReactNode;
  headings: [],
  actions: [],
  filter: []
}


function Table({ rows,children, headings, actions, filter }: Props) {
  return (
    <div className="card-box mb-30">
      {children}
      <div className="pb-20">
        <table className="data-table table stripe nowrap">
          <thead>
            <tr>
              {
                headings?.map((v, i)=>(

                  <th className={i=== 0 ? "table-plus datatable-nosort" : i===headings.length -1 ? 'datatable-nosort' : '' } key={i} >{v}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="table-plus">Gloria F. Mead</td>
              <td>25</td>
              <td>Sagittarius</td>
              <td>2829 Trainer Avenue Peoria, IL 61602</td>
              <td>29-03-2018</td>
              <td>
                <div className="dropdown">
                  <a
                    className="btn btn-link font-24 p-0 line-height-1 no-arrow dropdown-toggle"
                    href="#"
                    role="button"
                    data-toggle="dropdown"
                  >
                    <i className="dw dw-more"></i>
                  </a>
                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-icon-list">
                    <a className="dropdown-item" href="#">
                      <i className="dw dw-eye"></i> View
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="dw dw-edit2"></i> Edit
                    </a>
                    <a className="dropdown-item" href="#">
                      <i className="dw dw-delete-3"></i> Delete
                    </a>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
