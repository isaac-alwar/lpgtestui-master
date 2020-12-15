import React, {useMemo, useEffect, useState}from 'react'
import {useTable, useSortBy, useGlobalFilter} from 'react-table'
import {COLUMNS} from './columns'
import Axios from 'axios'
import './table.css'
import {GlobalFilter} from './GlobalFilter'


export const BasicTable = () => {
 
    const [products, setProducts] = useState([])
    useEffect(()=>{fetchProductList();}, [])
    
    const fetchProductList= async () => {
      const response = await Axios('http://localhost:8080/api/products/');
      setProducts(response.data)
        }

    useEffect(()=>{localStorage.setItem("offlineData", JSON.stringify(products))},[products])    


    /* That Gotcha Moment I was hoping to avoid 
    ** Try useContext fix the passing down of props & maybe redux sagas to manage the state 
    */
    // useEffect(()=>{const data = localStorage.getItem("offlineData");
    // if(data) {setProducts(JSON.parse(data));}
    // },[products]);

    const columns = useMemo(()=> COLUMNS, [])
    const data = useMemo(()=> products, [products])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter
        } = useTable({columns, data},
        useGlobalFilter, useSortBy) 
        
    const { globalFilter} = state    
    
    return (
        <>
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <table {...getTableProps()}>
           <thead>
               {headerGroups.map((headerGroup)=> (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column)=> (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())}> 
                            {column.render('Header')}
                            <span>
                                {column.isSorted ? (column.isSortedDesc ? ' <<|  ': '  |>>'): ''}
                            </span>
                        </th>
                ))}
            </tr>
            ))}
           </thead> 

        <tbody {...getTableBodyProps()}>
            { rows.map(row => {
                prepareRow(row)
                return (
                <tr {...row.getRowProps()}>
                    {
                       row.cells.map((cell)=> {
                           return <td {...cell.getCellProps()}>
                               {cell.render('Cell')}
                           </td>
                       }) 
                    }
                </tr>

                )
            })}

        </tbody>

        </table>
        </>
    )

}

