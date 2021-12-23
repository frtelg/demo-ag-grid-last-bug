import React, { ChangeEvent, useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { GridApi, GridReadyEvent, PaginationChangedEvent } from "ag-grid-community";

type Car = {
  make: string,
  model: string,
  price: number,
}

export const PAGINATION_SIZE_SHOW_ALL = 99999;

const App = () => {

  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [rowData, setRowData] = useState<Car[]>([]);
  const [paginationSize, setPaginationSize] = useState(5);

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);

    const initialData = [
      { make: "Toyota", model: "Celica", price: 35000 },
      { make: "Ford", model: "Mondeo", price: 32000 },
      { make: "Porsche", model: "Boxter", price: 72000 },
      { make: "Fiat", model: "Multipla", price: 5000 },
      { make: "Peugeot", model: "1008", price: 42000 },
      { make: "Hyundai", model: "Kona", price: 40000 },
    ];

    const updateData = (data: Car[]) => {
      gridApi?.setRowData(data);
      setRowData(data);
    };

    updateData(initialData);
  };

  const onPaginationChanged = (event: PaginationChangedEvent) => {
    if (event.api.paginationGetPageSize() !== paginationSize) {
      setPaginationSize(event.api.paginationGetPageSize());
    }
  };

  const changePageSize = (event: ChangeEvent<HTMLSelectElement>) => {
    const pageSize = parseInt(event.currentTarget.value, 10);
    gridApi?.paginationSetPageSize(pageSize === -1 ? PAGINATION_SIZE_SHOW_ALL : pageSize)

    setPaginationSize(pageSize);
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        rowData={rowData}
        pagination={true}
        paginationPageSize={paginationSize}
        onGridReady={onGridReady}
        onPaginationChanged={onPaginationChanged}
      >
        <AgGridColumn field="make"></AgGridColumn>
        <AgGridColumn field="model"></AgGridColumn>
        <AgGridColumn field="price"></AgGridColumn>
      </AgGridReact>
      <label>Select pagination size: </label>
      <select onChange={changePageSize}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={-1}>All</option>
      </select>
    </div>
  );
};

export default App;
