import React, { useEffect, useState } from 'react'
import demandAxios from '../../../../BaseURL';
import SingleProductHeader from './singleProductHeader/SingleProductHeader';
import SingleProductSalesChart from './singleProductSalesChart/SingleProductSalesChart';


function SingleProduct({currentProduct}) {

  const [product, setProduct] = useState({});

  useEffect(() => {
    fetchData();
  }, [currentProduct]);

  const fetchData = async () => {
    try {
      const res = await demandAxios.get(`api/demandAnalysis/product/${currentProduct}`);
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div>
      <SingleProductHeader currentProduct={product}></SingleProductHeader>
      <SingleProductSalesChart currentProduct={product}></SingleProductSalesChart>
    </div>
  )
}

export default SingleProduct