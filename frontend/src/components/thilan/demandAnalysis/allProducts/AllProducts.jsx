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







function AllProducts() {

  const [allProducts, setAllProducts] = useState({});
  
  useEffect(() => {
    const fetchAllProductsData = async () => {
      try {
        const response = await demandAxios.get("demandAnalysis/allProducts");
        const processedData = response.data.map(product => {
          // Get the sales data
          const sales = product.sales;

          // Get the last and current month sales
          const now = new Date();
          const currentMonth = now.toLocaleString('default', { month: 'long' });
          const lastMonth = new Date(now.setMonth(now.getMonth() - 1)).toLocaleString('default', { month: 'long' });

          // Find this month's sales
          const thisMonthSalesData = sales.find(sale => sale.month === currentMonth && sale.year === String(now.getFullYear()));
          const lastMonthSalesData = sales.find(sale => sale.month === lastMonth && sale.year === String(now.getFullYear()));

          return {
            ...product,
            lastMonth: lastMonthSalesData ? lastMonthSalesData.count : 'N/A',
            lastMonthAvgPrice: lastMonthSalesData ? lastMonthSalesData.avgPrice : 'N/A',
            thisMonth: thisMonthSalesData ? thisMonthSalesData.count : 'N/A',
            thisMonthAvgPrice: thisMonthSalesData ? thisMonthSalesData.avgPrice : 'N/A',
          };
        });

        setAllProducts(processedData);
      } catch (error) {
        console.error("Error fetching all products", error);
      }
    };
    fetchAllProductsData();
  }, []);

  console.log(allProducts)


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
                    // onRowClick={(row) => {
                    //   console.log(row);
                    //   method(row.row._id);
                    // }}
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