import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import demandAxios from '../../../BaseURL';
import ProductBaseReview from '../feedback/customer/product/ProductBaseReview'

function SingalFashionProduct() {
  const { id } = useParams(); // Get the product ID from the route parameters
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await demandAxios.get(`/api/demandAnalysis/product/${id}`); // Fetch single product by ID
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Depend on the product ID

  if (loading) {
    return <div className="single-product-loading">Loading...</div>;
  }

  if (error) {
    return <div className="single-product-error">{error}</div>;
  }

  if (!product) {
    return <div className="single-product-not-found">Product not found</div>;
  }

  return (
    <>
    <div className="single-product-container">
      <h1 className="single-product-title">{product.name}</h1>
      <img src={product.imageUrl} alt={product.name} className="single-product-image" />
      <p className="single-product-category">Category: {product.category}</p>
      <p className="single-product-price">Price: ${product.price.toFixed(2)}</p>
      <p className="single-product-description">{product.description}</p>
      <button className="single-product-btn">Add to Cart</button>
    </div>
    <ProductBaseReview productId={id}/>
    </>
  );
}

export default SingalFashionProduct;
