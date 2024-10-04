import React, { useEffect, useState } from 'react'
import demandAxios from '../../../../BaseURL';
import SingleProductHeader from './singleProductHeader/SingleProductHeader';
import SingleProductSalesChart from './singleProductSalesChart/SingleProductSalesChart';


function SingleProduct({currentProduct}) {

  return (
    <div>
      <SingleProductHeader currentProduct={currentProduct}></SingleProductHeader>
      <SingleProductSalesChart currentProduct={currentProduct}></SingleProductSalesChart>
    </div>
  )
}

export default SingleProduct