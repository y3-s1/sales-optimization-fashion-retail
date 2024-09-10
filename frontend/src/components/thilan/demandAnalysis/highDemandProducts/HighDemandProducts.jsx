import React from 'react';

function HighDemandProducts({ highDemandProducts }) {

  if (!highDemandProducts || highDemandProducts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="highDemandProducts-all font-tinos">
      <h2 className="font-tinos mb-6 text-left text-lg">High Demanding Products</h2>
      <div className="list">
        {highDemandProducts.map((product) => (
          <div className="flex items-center justify-between mb-7" key={product.id}>
            <div className="flex gap-5">
              <img
                src={product.img}
                alt={product.name}
                className="w-11 h-11 rounded-full object-cover shadow-md"
              />
              <div className="flex flex-col gap-[5px]">
                <span className="text-sm font-bold " style={{ color: "#666" }}>
                  {product.name}
                </span>
                <span className="text-xs text-gray-500">{product.category}</span>
              </div>
            </div>
            <span className="font-bold" style={{ color: "#000" }}>
              {product.demand}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HighDemandProducts;
