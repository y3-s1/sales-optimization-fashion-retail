const highDemandProducts = [
    {
      id: 1,
      img: "https://api.totallypromotional.com/Data/Media/Catalog/6/800/4dbebd66-f02f-4c94-8e86-79e2ecf83c32Gildan-Heavy-Cotton-Ladies-foot-V-Neck-T-Shirt-Full-Color-TA114CFD-sports-grey.jpg",
      name: "Ladies T-Shirt-Grey",
      category: "women",
      demand: "3668",
    },
    {
      id: 2,
      img: "https://cdn11.bigcommerce.com/s-4d06e/images/stencil/2048x2048/products/17829/28511/SAN_LOG825_black__06688.1687798477.jpg?c=2",
      name: "Ladies Long Sleeve ",
      category: "women",
      demand: "3256",
    },
    {
      id: 3,
      img: "https://i0.wp.com/printrove.com/wp-content/uploads/2019/11/5dc2c59acc975.jpg?fit=1140%2C1140&ssl=1",
      name: "Ladies Crop Blouse",
      category: "women",
      demand: "2998",
    },
    {
      id: 4,
      img: "https://giordanomm.com/cdn/shop/files/28_f6e7f474-69d3-47ae-b49e-a52cd94ba8e2_compact.png?v=1720674287",
      name: "Gents Linen Shirt",
      category: "men",
      demand: "2512",
    },
    {
      id: 5,
      img: "https://i5.walmartimages.com/asr/568f60f1-53e1-479f-83ca-4f794b3d841e.fdba0ff2110d5b3a83b762f9fd7da9d6.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
      name: "Ladies Office Dress ",
      category: "female",
      demand: "2134",
    },
    {
      id: 6,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqp21E57tE1dYwmlDXcubB1cgb39m9UIdGWDygmcET6ZrVyy7vacUDqZywwo00l-ijAic&usqp=CAU",
      name: "Ladies Long Sleeve",
      category: "women",
      demand: "1932",
    },
    {
      id: 7,
      img: "https://raindropsstore.com/wp-content/uploads/2021/03/3015-600x600.jpg",
      name: "Ladies Crop Top",
      category: "women",
      demand: "1560",
    },
  ];




  const highDemandCategory1 = {
    color: "#872323",
    icon: "https://img.icons8.com/raincoat.png",
    title: "Jacket",
    number: "111238",
    dataKey: "sales",
    percentage: 45,
    chartData: [
      { name: "1", sales: 300 },
      { name: "2", sales: 100 },
      { name: "3", sales: 50 },
      { name: "4", sales: 60 },
      { name: "5", sales: 20 },
      { name: "6", sales: 400 },
      { name: "7", sales: 800 },
    ],
  };

  const highDemandCategory2 = {
    color: "#453AC8",
    icon: "https://img.icons8.com/shirt.png",
    title: "long Sleeve Shirts",
    number: "23888",
    dataKey: "sales",
    percentage: 21,
    chartData: [
      { name: "1", sales: 400 },
      { name: "2", sales: 600 },
      { name: "3", sales: 200 },
      { name: "4", sales: 700 },
      { name: "5", sales: 400 },
      { name: "6", sales: 500 },
      { name: "7", sales: 450 },
    ],
  };

  const highDemandCategory3 = {
    color: "#1c2866",
    icon: "https://img.icons8.com/windows/32/boots.png",
    title: "Shoe",
    number: "56432",
    dataKey: "sales",
    percentage: -12,
    chartData: [
      { name: "1", sales: 400 },
      { name: "2", sales: 600 },
      { name: "3", sales: 500 },
      { name: "4", sales: 700 },
      { name: "5", sales: 400 },
      { name: "6", sales: 500 },
      { name: "7", sales: 450 },
    ],
  };
  
  const highDemandCategory4 = {
    color: "#9fab2e",
    icon: "https://img.icons8.com/jeans.png",
    title: "Denim",
    number: "2600",
    dataKey: "sales",
    percentage: 12,
    chartData: [
      { name: "1", sales: 200 },
      { name: "2", sales: 300 },
      { name: "3", sales: 500 },
      { name: "4", sales: 700 },
      { name: "5", sales: 300 },
      { name: "6", sales: 500 },
      { name: "7", sales: 750 },
    ],
  };

  module.exports = {
    highDemandProducts, 
    highDemandCategory1, 
    highDemandCategory2, 
    highDemandCategory3, 
    highDemandCategory4
  }