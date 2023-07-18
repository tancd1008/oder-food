import React from 'react'

const ListProducts = () => {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 300,
      desc: " Siêu ngon"

    },
    {
      id: 2,
      name: "Product 2",
      price: 300,
      desc: " Siêu ngon"

    }
  ]
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