import { ChevronUpDownIcon } from '@heroicons/react/24/solid'
import React from 'react'

function TableHeading({queryParams, children, fn = ()=>{}, columnName}) {
    
  return (
    <>
    <th  className=' px-3 py-2 border-2 border-gray-500'>
  <div className=' flex justify-between items-center'>
  {children} <ChevronUpDownIcon  onClick={(e)=> fn(columnName)} className={`w-6 cursor-pointer ${(queryParams?.sort_field ==columnName) && ((queryParams?.sort_direction == "asc")? " bg-green-400 ml-1 rounded text-gray-200 border-t-2 border-red-400" : " bg-green-400 ml-1 rounded text-gray-200 border-b-4 border-red-400")} `}/> 
  </div>
   </th>
    </>
  )
}

export default TableHeading
