import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { ChevronUpDownIcon} from '@heroicons/react/24/solid';
import TableHeading from '@/Components/TableHeading';

function Index({auth, projects, queryParams=null, success = null}) {
    queryParams = queryParams || {}

    console.log("qeuraparams", queryParams, projects);

const searchFieldChanged = (name, value)=>{
  console.log("value and status", name, value);
if(value){
  queryParams[name] = value;
}
else{
  delete queryParams[name];
}

router.get(route('project.index'), queryParams);
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

router.get(route('project.index'), queryParams);
}


const deleteProject = function(id){
  if(!confirm("Are you sure you want to delete this project ?")){
  return ;
  }
 
router.delete(route("project.destroy", id));

}

  return (
<AuthenticatedLayout
user={auth.user}
header={
  <div className=' flex justify-between w-[90%] mx-auto items-center'>
<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Projects</h2>

<Link href={route("project.create")} className='font-semibold bg-green-400 rounded px-2 py-1 text-white'>Add new</Link>
  </div>
}
>

<Head title='Projects'/>

{
  success && <div className=' my-2 bg-emerald-500 py-2 px-4 text-white rounded w-[50%] mx-auto text-center'>{success} </div>
}

<div className="py-12">
<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">


{
  (projects?.data?.length == 0)? 
  
  <h2 className=' text-center dark:text-white'>No projects are currently available. Please click the green button in the top right corner to create one</h2>

  :

<div className="p-6 text-gray-900 dark:text-gray-100">



{/* table div starts here */}
<div className='overflow-auto'>
<table className=' w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
<thead className=' text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
<tr className=' text-nowrap'>

   <TableHeading queryParams={queryParams} columnName="id" fn={sortChanged} >ID</TableHeading>

<th  className=' px-3 py-2 border-2 border-gray-500'>Image</th>

<TableHeading queryParams={queryParams} columnName="name" fn={sortChanged} >Name</TableHeading>


<TableHeading queryParams={queryParams} columnName="status" fn={sortChanged} >Status</TableHeading>


<TableHeading queryParams={queryParams} columnName="created_at" fn={sortChanged} >Create Date</TableHeading>

<TableHeading queryParams={queryParams} columnName="due_date" fn={sortChanged} >Due Date</TableHeading>

<th  className=' px-3 py-2 border-2 border-gray-500'>Created By</th>

<th className=' px-3 py-2 border-2 border-gray-500 text-right'>Actions</th>
</tr>
</thead>


<thead className=' text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
<tr className=' text-nowrap'>
<th className=' px-3 py-2 border-2 border-gray-500'></th>
<th className=' px-3 py-2 border-2 border-gray-500'></th>
<th className=' px-3 py-2 border-2 border-gray-500'>
  <TextInput className="w-[320px] max-[768px]:w-[300px] max-[450px]:w-[200px] border-2 border-gray-900 dark:border-gray-200"  placeholder="Project Name"
  defaultValue={queryParams?.name || ""}
   onBlur={e => searchFieldChanged('name', e.target.value)}
   onKeyPress={e=> onKeyPress('name', e)}
   />
</th>
<th className=' px-3 py-2 border-2 border-gray-500'>
  <SelectInput 
  defaultValue={queryParams?.status || ""}
  className="w-full border-2 border-gray-800 dark:border-gray-200" onChange={e=> searchFieldChanged('status', e.target.value)}>
    <option value="">Select Status</option>
    <option value="pending">Pending</option>
    <option value="in_progress">In Progress</option>
    <option value="completed">Completed</option>
     </SelectInput>
</th>
<th className=' px-3 py-2 border-2 border-gray-500'></th>
<th className=' px-3 py-2 border-2 border-gray-500'></th>
<th className=' px-3 py-2 border-2 border-gray-500'></th>
<th className=' px-3 py-2 border-2 border-gray-500 text-right'></th>
</tr>
</thead>


<tbody>
{projects?.data?.length > 0 && projects?.data?.map((elem)=>(
<tr key={elem?.id} className=' bg-white dark:bg-gray-800 dark:border-gray-700'>
<td className=' px-3 py-2 border border-gray-500' >{elem?.id}</td>

<td className=' px-3 py-2 border border-gray-500' >
<img src={elem?.image_path} alt="" width={60} />
</td>

<td className=' px-3 py-2 border hover:underline cursor-pointer dark:text-white border-gray-500' >

  <Link href={route("project.show",  elem?.id)}>{elem?.name}</Link>
</td>

<td className= ' text-nowrap px-3 py-2 border border-gray-500' > 
  <span className={` inline-block px-3 py-1 rounded text-white ${PROJECT_STATUS_CLASS_MAP[elem?.status]}`}>
  {PROJECT_STATUS_TEXT_MAP[elem?.status]}
  </span>
  </td>

<td className=' text-nowrap px-3 py-2 border border-gray-500' >{elem?.created_at}</td>
<td className=' text-nowrap px-3 py-2 border border-gray-500' >{elem?.due_date}</td>
<td className=' text-nowrap px-3 py-2 border border-gray-500' >{elem?.createdBy?.name}</td>

<td className=' px-3 py-2 border border-gray-500'>
<Link href={route('project.edit', elem?.id)}
className=' font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'
>
Edit
</Link>


<button onClick={()=>deleteProject(elem?.id)} className=' font-medium text-red-600 dark:text-red-500 hover:underline mx-1'>Delete</button>
</td>
</tr>
))}

</tbody>
</table>
</div>
{/* table div ends here */}

<Pagination links={projects?.meta?.links} />


</div>
}

</div>
</div>
</div>

</AuthenticatedLayout>
  )
}

export default Index
