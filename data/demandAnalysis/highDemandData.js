const highDemandProducts = [
    {
      id: 1,
      img: "https://www.beverlystreet.lk/media/catalog/product/cache/1/image/17f82f742ffe127f42dca9de82fb58b1/5/5/5594.jpg",
  
      username: "Ladies T-Shirt-Grey",
      email: "women",
      amount: "3668",
    },
    {
      id: 2,
      img: "https://www.beverlystreet.lk/media/catalog/product/cache/1/image/17f82f742ffe127f42dca9de82fb58b1/5/5/5575.jpg",
      username: "Ladies Long Sleeve ",
      email: "women",
      amount: "3256",
    },
    {
      id: 3,
      img: "https://www.beverlystreet.lk/media/catalog/product/cache/1/image/17f82f742ffe127f42dca9de82fb58b1/5/5/5586.jpg",
      username: "Ladies Crop Blouse",
      email: "women",
      amount: "2998",
    },
    {
      id: 4,
      img: "https://www.beverlystreet.lk/media/catalog/product/cache/1/image/17f82f742ffe127f42dca9de82fb58b1/5/5/5534.jpg",
      username: "Gents Linen Shirt",
      email: "men",
      amount: "2512",
    },
    {
      id: 5,
      img: "https://www.beverlystreet.lk/media/catalog/product/cache/1/image/17f82f742ffe127f42dca9de82fb58b1/5/5/5596.jpg",
      username: "Ladies Office Dress ",
      email: "female",
      amount: "2134",
    },
    {
      id: 6,
      img: "https://www.beverlystreet.lk/media/catalog/product/cache/1/image/17f82f742ffe127f42dca9de82fb58b1/5/5/5574.jpg",
      username: "Ladies Long Sleeve",
      email: "women",
      amount: "1932",
    },
    {
      id: 7,
      img: "https://www.beverlystreet.lk/media/catalog/product/cache/1/image/17f82f742ffe127f42dca9de82fb58b1/5/5/5576.jpg",
      username: "Ladies Crop Top",
      email: "women",
      amount: "1560",
    },
  ];




  const highDemandCategory1 = {
    color: "#872323",
    icon: "https://img.icons8.com/ios/50/standing-woman.png",
    title: "Women",
    number: "111238",
    dataKey: "users",
    percentage: 45,
    chartData: [
      { name: "Sun", users: 400 },
      { name: "Mon", users: 600 },
      { name: "Tue", users: 500 },
      { name: "Wed", users: 700 },
      { name: "Thu", users: 400 },
      { name: "Fri", users: 500 },
      { name: "Sat", users: 450 },
    ],
  };

  const highDemandCategory2 = {
    color: "#453AC8",
    icon: "https://img.icons8.com/ios/50/men-age-group-4.png",
    title: "Men",
    number: "23888",
    dataKey: "products",
    percentage: 21,
    chartData: [
      { name: "Sun", products: 400 },
      { name: "Mon", products: 600 },
      { name: "Tue", products: 500 },
      { name: "Wed", products: 700 },
      { name: "Thu", products: 400 },
      { name: "Fri", products: 500 },
      { name: "Sat", products: 450 },
    ],
  };

  const highDemandCategory3 = {
    color: "#1c2866",
    icon: "https://img.icons8.com/windows/32/boots.png",
    title: "Shoe",
    number: "56432",
    dataKey: "revenue",
    percentage: -12,
    chartData: [
      { name: "Sun", revenue: 400 },
      { name: "Mon", revenue: 600 },
      { name: "Tue", revenue: 500 },
      { name: "Wed", revenue: 700 },
      { name: "Thu", revenue: 400 },
      { name: "Fri", revenue: 500 },
      { name: "Sat", revenue: 450 },
    ],
  };
  
  const highDemandCategory4 = {
    color: "#9fab2e",
    icon: "https://img.icons8.com/fluency-systems-regular/48/tie.png",
    title: "Other",
    number: "2600",
    dataKey: "ratio",
    percentage: 12,
    chartData: [
      { name: "Sun", ratio: 400 },
      { name: "Mon", ratio: 600 },
      { name: "Tue", ratio: 500 },
      { name: "Wed", ratio: 700 },
      { name: "Thu", ratio: 400 },
      { name: "Fri", ratio: 500 },
      { name: "Sat", ratio: 450 },
    ],
  };

  module.exports = {
    highDemandProducts, 
    highDemandCategory1, 
    highDemandCategory2, 
    highDemandCategory3, 
    highDemandCategory4
  }