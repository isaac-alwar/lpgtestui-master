import React, {useEffect, useState} from 'react'
import { DataGrid } from '@material-ui/data-grid'
import Axios from 'axios';



export default function ProductGrid() {

const [products, setProducts] = useState([])
useEffect(()=>{fetchProductList();}, [])
useEffect(()=>{console.log(products)},[products])

const fetchProductList= async () => {
  const response = await Axios('http://localhost:8080/api/products/');
  setProducts(response.data)
}

const columns = [
    { field: 'id', headerName: 'id', width: 50 },
    { field: 'name', headerName: 'name', width: 180 },
    { field: 'description', headerName: 'description', width: 280 },
    { field: 'categoryId', headerName: 'categoryId', width: 150 },
    { field: 'createdOn', headerName: 'createdOn', width: 250 },
  ];
  
  
const rows = products;


    return (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      );
}


