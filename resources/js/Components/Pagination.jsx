import { Link } from '@inertiajs/react'
import React from 'react'

function Pagination({links}) {

  console.log("links", links);
  
  return (
    <>
    <nav className=' text-center mt-4 mb-2 max-md:flex max-md:justify-between max-md:flex-wrap max-md:items-start'>
        {
        links?.length > 0 && links?.map((link, index)=>(
        <Link preserveScroll href={link?.url || ""} className={`inline-block py-2 px-3 rounded-lg dark:text-gray-200 text-xs ${(link?.active)? "dark:bg-gray-950 bg-gray-300 " : " " } ${(!link.url)? " !text-gray-500 cursor-not-allowed " : " hover:bg-gray-950"}`} dangerouslySetInnerHTML={{__html: link.label}} key={index}>
        </Link>
        ))
        }
    </nav>
    </>
  )
}

export default Pagination
