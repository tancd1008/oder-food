import React from 'react'
import { getDatabase, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
const ListProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const db = getDatabase();
      const productRef = ref(db, "products/");
      onValue(productRef, (snapshot) => {
        var newData = []
        snapshot.forEach((item)=>{
          newData.push(item.val())
        })
        setProducts(newData)
      });

    };
    getProducts();
  }, []);
  return (
    <div>
    <table className="table table-hover text-nowrap">
  <thead>
    <tr>
      <th scope="col" >STT</th>
      <th scope="col">Sản phảm</th>
      <th scope="col">Giá</th>
      <th scope="col">Nội dung</th>
      <th scope="col">Status</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    
    {
      products.map((product,index) => (
        <tr key={index}>
          <th>{index + 1}</th>
          <th>{product.name}</th>
          <th>{product.price}</th>
          <th>{product.desc}</th>
          <th>@</th>
          <th>@</th>
        </tr>
      ))
    }
   
  </tbody>
</table>

    </div>
  )
}

export default ListProducts