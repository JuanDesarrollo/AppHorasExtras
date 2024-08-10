import React from 'react'

export const CardDatatable = ({ tbody = [], nombreCard = '' }) => {
    return (
        <div className="card">
            <div className="card-header">
                <h5>{nombreCard}</h5>
            </div>
            <div className="card-body">
                <div id="dom-jqry_wrapper" className="dt-container dt-bootstrap5">
                    <div className="row mt-2 justify-content-between">
                        <div className="col-md-auto me-auto ">
                            <div className="dt-length">
                                <select name="dom-jqry_length" aria-controls="dom-jqry" className="form-select form-select-sm" id="dt-length-0">
                                    <option value="10">10</option>
                                    <option value="25">25</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                <label for="dt-length-0"> entries per page</label>
                            </div>
                        </div>
                        <div className="col-md-auto ms-auto ">
                            <div className="dt-search"><label for="dt-search-0">Search:</label><input type="search" className="form-control form-control-sm" id="dt-search-0" placeholder="" aria-controls="dom-jqry" /></div>
                        </div>
                    </div>
                    <div className="row mt-2 justify-content-md-center">
                        {tbody}
                    </div>
                    <div className="row mt-2 justify-content-between">
                        <div className="col-md-auto me-auto ">
                            <div className="dt-info" aria-live="polite" id="dom-jqry_info" role="status">Showing 1 to 10 of 20 entries</div>
                        </div>
                        <div className="col-md-auto ms-auto ">
                            <div className="dt-paging paging_full_numbers">
                                <ul className="pagination">
                                    <li className="dt-paging-button page-item disabled"><a className="page-link first" aria-controls="dom-jqry" aria-disabled="true" aria-label="First" data-dt-idx="first" tabindex="-1">«</a></li>
                                    <li className="dt-paging-button page-item disabled"><a className="page-link previous" aria-controls="dom-jqry" aria-disabled="true" aria-label="Previous" data-dt-idx="previous" tabindex="-1">‹</a></li>
                                    <li className="dt-paging-button page-item active"><a href="#" className="page-link" aria-controls="dom-jqry" aria-current="page" data-dt-idx="0" tabindex="0">1</a></li>
                                    <li className="dt-paging-button page-item"><a href="#" className="page-link" aria-controls="dom-jqry" data-dt-idx="1" tabindex="0">2</a></li>
                                    <li className="dt-paging-button page-item"><a href="#" className="page-link next" aria-controls="dom-jqry" aria-label="Next" data-dt-idx="next" tabindex="0">›</a></li>
                                    <li className="dt-paging-button page-item"><a href="#" className="page-link last" aria-controls="dom-jqry" aria-label="Last" data-dt-idx="last" tabindex="0">»</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
