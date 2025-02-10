import React, { useEffect, useRef, useState } from "react";

type Props = {
  rows: [{
    id?: number,
    column1?: string,
    column2?: string,
    column3?: string,
    column4?: string,
    column5?: string,
    column6?: string,
    column7?: string,
    action?: []
  }],
  children?: React.ReactNode;
  headings: [],
  actions: (id: number) => {},
  filter: []
}


function Table({ rows, children, headings, actions, filter }: Props) {
  const currentPageNumber = useRef<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [productCatogory, setProductCatogory] = useState(rows);


  useEffect(() => {
    setProductCatogory(rows);
  }, [rows]);


  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = productCatogory.slice(
    indexOfFirstItem,
    indexOfLastItem
  );


  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchedProducts = (text: string) => {
    const searchText = text.trim().toUpperCase();

    if (!searchText) {
      setProductCatogory(rows);
      return;
    }

    const filteredRows: any = rows.filter((value) =>
      [value.column3, value.column2, value.column5, value.column4, value?.column6, value?.column7].some((col) =>
        col?.toString()?.toUpperCase().includes(searchText)
      )
    );

    setProductCatogory(filteredRows);
  };
  return (
    <>
      <div
        className="row"
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            marginLeft: "auto",
            marginRight: 15,
          }}
        >
          <div className="dataTables_filter">
            <label>
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Search"
                onFocus={() => {
                  // save prevues page number
                  currentPageNumber.current = currentPage;
                  handlePageChange(1)
                }}
                onBlur={event => {
                  if (event.target.value === "") {
                    handlePageChange(currentPageNumber.current)
                  } else {
                    handlePageChange(1)
                  }
                }}
                onChange={({ target: { value } }) => {
                  handleSearchedProducts(value);
                }}
                aria-controls="DataTables_Table_0"
              />
            </label>
          </div>
        </div>
      </div>
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
                currentProducts?.map((v, i) => (
                  <tr>
                    {
                      headings?.map((c, index) => (
                        <>
                          <td className="table-plus" onClick={e => {
                            e.preventDefault();
                            if (index === headings.length - 1) {
                              actions?.(v.id);
                            }
                          }} >{v[`column${index + 1}`]}</td>
                        </>
                      ))
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

      </div>
      <div className="row" style={{}}>
        <div className="col-sm-12 col-md-5">
          <div
            className="dataTables_info"
            id="DataTables_Table_0_info"
            role="status"
            aria-live="polite"
          >
            {currentPage}-{Math.ceil(rows.length / itemsPerPage)} of {rows.length}
            entries
          </div>
        </div>
        <div
          className=""
          style={{
            marginLeft: "auto",
            marginRight: 15,
          }}
        >
          <div
            className="dataTables_paginate paging_simple_numbers"
            id="DataTables_Table_0_paginate"
          >
            <ul className="pagination">
              <li
                className={`paginate_button page-item previous ${currentPage === 1 && "disabled"
                  } `}
                id="DataTables_Table_0_previous"
                onClick={() => currentPage !== 1 && handlePageChange(currentPage - 1)}
              >
                <a
                  href="#"
                  aria-controls="DataTables_Table_0"
                  data-dt-idx="0"
                  className="page-link"
                >
                  <i className="ion-chevron-left"></i>
                </a>
              </li>
              {Array.from(
                { length: Math.ceil(rows.length / itemsPerPage) },
                (_, i) => (
                  <li
                    className={`paginate_button page-item ${currentPage === i + 1 && "active"
                      }`}
                    onClick={() => handlePageChange(i + 1)}

                  >
                    <a
                      href="#"
                      aria-controls="DataTables_Table_0"
                      data-dt-idx="1"
                      className="page-link"
                    >
                      {i + 1}
                    </a>
                  </li>
                )
              )}
              <li
                className={`paginate_button page-item next ${currentPage === Math.ceil(rows.length / itemsPerPage) &&
                  "disabled"
                  } `}
                id="DataTables_Table_0_next"
                onClick={() => currentPage < Math.ceil(rows.length / itemsPerPage) && handlePageChange(currentPage + 1)}
              >
                <a
                  href="#"
                  aria-controls="DataTables_Table_0"
                  data-dt-idx="3"
                  className="page-link"
                >
                  <i className="ion-chevron-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>

  );
}

export default Table;
