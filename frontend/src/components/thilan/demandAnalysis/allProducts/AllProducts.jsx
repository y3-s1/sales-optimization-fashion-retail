import React, { useEffect, useState } from 'react'
import "@mui/material/styles";
import "@mui/x-data-grid";

import ImageCard from "./ImageCard";
import { DataGrid, gridPageCountSelector, gridPageSelector, GridToolbar, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { Box, Pagination, PaginationItem } from '@mui/material';
import demandAxios from '../../../../BaseURL';


const columns = [
  {
    field: "productId",
    headerName: "ID",
    width: 90,
    flex: 0.5,
    align: "center",
    headerAlign: "center",
    type: "string",
  },
  {
    field: "imageUrl",
    headerName: "Image",
    editable: true,
    flex: 1,
    align: "center",
    headerAlign: "center",
    renderCell: (params) => {
      return <ImageCard url={params.value} />;
    },
  },
  {
    field: "name",
    headerName: "Item",
    editable: true,
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "lastMonthAvgPrice",
    headerName: "Last Month Avg. Price",
    description: "This column has a value getter and is not sortable.",
    align: "center",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "lastMonth",
    headerName: "Last Month Sales",
    description: "This column has a value getter and is not sortable.",
    align: "center",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "thisMonthAvgPrice",
    headerName: "This Month Avg. Price",
    description: "This column has a value getter and is not sortable.",
    align: "center",
    headerAlign: "center",
    flex: 1,
  },
  {
    field: "thisMonth",
    headerName: "This Month Sales",
    description: "This column has a value getter and is not sortable.",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
];




function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="text"
      shape="circular"
      page={page + 1}
      count={pageCount}
      // @ts-expect-error
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
};







function AllProducts({allProducts, setCurrentProductId, currentProductId}) {

  return (
    <div className='highDemandCategories-all font-tinos'>
        <h2 className="font-tinos p-3 text-left text-xl pl-4">All Products</h2>
        
        <div
        >
          <div>
            <div className="DemandTable p-3">
              <div
                style={{
                  height: "75vh",
                  width: "100%",
                }}
              >
                <Box sx={{ height: "100%", width: "100%" }}>
                  <DataGrid
                    rows={allProducts}
                    columns={columns}
                    rowHeight={70}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    getRowId={(row) => row._id}
                    onRowClick={(row) => {
                      console.log(row);
                      setCurrentProductId(row.row._id);
                    }}
                    getRowClassName={(params) => 
                      params.id === currentProductId ? "demand-analysis-current-product-row" : ""
                    }
                    slots={{
                      toolbar: GridToolbar,
                      pagination: CustomPagination,
                    }}
                    pageSizeOptions={[10]}
                    showColumnVerticalBorder={true}
                    showCellVerticalBorder={true}
                    sx={{
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "#000",
                        color: "#000",
                        fontFamily: "Tinos",
                        fontSize: "16px",
                        fontWeight: "bold",
                      },
                      "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: "#fff",
                        color: "#2B2B2B",
                        fontFamily: "Tinos",
                        fontSize: "14px",
                        fontWeight: "400",
                      },
                      "& .MuiDataGrid-footerContainer": {
                        backgroundColor: "#fff",
                      },
                      "& .MuiDataGrid-toolbarContainer": {
                        "& .MuiButton-text": {
                          color: "#636363",
                          marginLeft: "30px",
                        },
                      },
                    }}
                  />
                </Box>
              </div>
            </div>
          </div>
        </div>

    </div>
  )
}

export default AllProducts