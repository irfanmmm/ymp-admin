import React from "react";

type Props = {
  rows: [{
    id?: number,
    column1?: string,
    column2?: number,
    column3?: string,
    column4?: string,
    column5?: string,
    action?: []
  }],
  children?: React.ReactNode;
  headings: [],
  actions: (id : number) => {},
  filter: []
}


function Table({ rows, children, headings, actions, filter }: Props) {
  return (
    <div className="card-box mb-30">
      {children}
      <div className="pb-20">
        <table className="data-table table table-striped table-bordered stripe nowrap">
          <thead>
            <tr>
              {
                headings?.map((v, i) => (

                  <th className={i === 0 ? "table-plus datatable-nosort" : i === headings.length - 1 ? 'datatable-nosort' : ''} key={i} >{v}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              rows?.map((v, i) => (

                <tr>

                  {
                    headings?.map((c, index) => (
                      <>
                        <td className="table-plus" onClick={e => {
                          e.preventDefault();
                          if (index === headings.length - 1) {
                            actions(v.id);
                          }
                        }} >{v[`column${index + 1}`]}</td>
                      </>
                    ))
                  }
                  {/* <td onClick={() => actions(v.id)} >{v.action}</td> */}


                  {/* <td>{v.column2}</td>
                  <td>{v.column3}</td>
                  <td>{v.column4}</td>
                  <td>{v.column5}</td> */}

                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
