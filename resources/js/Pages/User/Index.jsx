import Pagination from '@/Components/Pagination';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { ChevronUpDownIcon} from '@heroicons/react/24/solid';
import TableHeading from '@/Components/TableHeading';

function Index({auth, users, queryParams=null, success = null}) {
    queryParams = queryParams || {}

    console.log("qeuraparams", queryParams, users);

const searchFieldChanged = (name, value)=>{
  console.log("value and status", name, value);
if(value){
  queryParams[name] = value;
}
else{
  delete queryParams[name];
}

router.get(route('user.index'), queryParams);
}


const onKeyPress = (name, e)=>{
if(e.key !== 'Enter') return;

searchFieldChanged(name, e.target.value);
}


const sortChanged = (name)=>{

  if(name === queryParams.sort_field){
   if(queryParams.sort_direction === "asc"){
    queryParams.sort_direction = "desc";
   }
   else{
    queryParams.sort_direction = "asc";
   }
  }
  else{
    queryParams.sort_field = name;
    queryParams.sort_direction = "asc";
  }

router.get(route('user.index'), queryParams);
}


const deleteUser = function(id){
  if(!confirm("Are you sure you want to delete this user ?")){
  return ;
  }
 
router.delete(route("user.destroy", id));

}

  return (
<AuthenticatedLayout
user={auth.user}
header={
//   <div className=' flex justify-between w-[90%] mx-auto items-center'>
// <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Users</h2>

// <Link href={route("user.create")} className='font-semibold bg-green-400 rounded px-2 py-1 text-white'>Add new</Link>
//   </div>

<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Users</h2>
}
>

<Head title='Users'/>

{
  success && <div className=' my-2 bg-emerald-500 py-2 px-4 text-white rounded w-[50%] mx-auto text-center'>{success} </div>
}

<div className="py-12">
<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
<div className="p-6 text-gray-900 dark:text-gray-100">

<div className='overflow-auto'>
<table className=' w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
<thead className=' text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
<tr className=' text-nowrap'>
   <TableHeading queryParams={queryParams} columnName="id" fn={sortChanged} >ID</TableHeading>

<TableHeading queryParams={queryParams} columnName="name" fn={sortChanged} >Name</TableHeading>

<TableHeading queryParams={queryParams} columnName="email" fn={sortChanged} >Email</TableHeading>

<TableHeading queryParams={queryParams} columnName="created_at" fn={sortChanged} >Create Date</TableHeading>

<th className=' px-3 py-2 border-2 border-gray-500 text-right'>Actions</th>
</tr>
</thead>


<thead className=' text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
<tr className=' text-nowrap'>
<th className=' px-3 py-2 border-2 border-gray-500'></th>

<th className=' px-3 py-2 border-2 border-gray-500'>
  <TextInput className="w-[320px] max-[768px]:w-[300px] max-[450px]:w-[200px] border-2 border-gray-800 dark:border-gray-200"  placeholder="User Name"
  defaultValue={queryParams?.name || ""}
   onBlur={e => searchFieldChanged('name', e.target.value)}
   onKeyPress={e=> onKeyPress('name', e)}
   />
</th>

<th className=' px-3 py-2 border-2 border-gray-500'>
<TextInput className="w-[320px] max-[768px]:w-[300px] max-[450px]:w-[200px] border-2 border-gray-800 dark:border-gray-200"  placeholder="User email"
  defaultValue={queryParams?.email || ""}
   onBlur={e => searchFieldChanged('email', e.target.value)}
   onKeyPress={e=> onKeyPress('email', e)}
   />
</th>

<th className=' px-3 py-2 border-2 border-gray-500'></th>
<th className=' px-3 py-2 border-2 border-gray-500'></th>

</tr>
</thead>


<tbody>
{users?.data?.length > 0 && users?.data?.map((elem)=>(
<tr key={elem?.id} className=' bg-white dark:bg-gray-800 dark:border-gray-700'>
<td className=' px-3 py-2 border border-gray-500' >{elem?.id}</td>

<td className=' text-nowrap px-3 py-2 border dark:text-white border-gray-500' >
{elem?.name}
</td>

<td className= 'px-3 py-2 border text-nowrap border-gray-500' > 
  {elem?.email}
  </td>

<td className=' px-3 py-2 border text-nowrap border-gray-500' >{elem?.created_at}</td>


<td className=' px-3 py-2 border text-nowrap border-gray-500'>
  {
    (auth?.user?.id == elem?.id) &&
<Link href={route('user.edit', elem?.id)}
className=' font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'
>
Edit
</Link>
  }

</td>
</tr>
))}

</tbody>
</table>
</div>

<Pagination links={users?.meta?.links} />

</div>
</div>
</div>
</div>

</AuthenticatedLayout>
  )
}

export default Index
