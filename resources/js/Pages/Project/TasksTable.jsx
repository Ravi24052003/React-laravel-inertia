import Pagination from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';
import { Link, router } from '@inertiajs/react';
import React, { useEffect } from 'react';
import TableHeading from '@/Components/TableHeading';

function TasksTable({project = {}, tasks, queryParams = null, showProjectIdAndNameCol = true, insideShowComponent = false}) {
  // insideShowComponent belongs to Project/Show.jsx file
  
  queryParams = queryParams || {}

  const searchFieldChanged = (name, value)=>{
    sessionStorage.setItem('scrollPosition', window.scrollY);
   
  if(value){
    queryParams[name] = value;
  }
  else{
    delete queryParams[name];
  }
  
  if(insideShowComponent){
    router.get(route("project.show", project?.data?.id), queryParams);
  }
  else{
    router.get(route('task.index'), queryParams);
  }

  
  }
  
  
  const onKeyPress = (name, e)=>{
  if(e.key !== 'Enter') return;
  
  searchFieldChanged(name, e.target.value);
  }
  
  
  const sortChanged = (name)=>{
    sessionStorage.setItem('scrollPosition', window.scrollY);
  
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
  
    if(insideShowComponent){
      router.get(route("project.show", project?.data?.id), queryParams);
    }
    else{
      router.get(route('task.index'), queryParams);
    }
 
  }

  const deleteTask = function(id){
    if(!confirm("Are you sure you want to delete this task ?")){
    return ;
    }
   
  router.delete(route("task.destroy", id));
  
  }


  useEffect(() => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
    }
  }, []);


  return (
  <>
    
    <div className='overflow-auto'>
    <table className=' w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
    <thead className=' text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
    <tr className=' text-nowrap'>
    
       <TableHeading queryParams={queryParams} columnName="id" fn={sortChanged} >ID</TableHeading>
    
    <th  className=' px-3 py-2 border-2 border-gray-500'>Image</th>
    
    {
      showProjectIdAndNameCol &&    <th  className=' px-3 py-2 border-2 border-gray-500'>Project Id and Project Name</th>
    }
 

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

{
  showProjectIdAndNameCol && <th className=' px-3 py-2 border-2 border-gray-500'></th>
}

    
    <th className=' px-3 py-2 border-2 border-gray-500'>
      <TextInput className=" w-full"  placeholder="Task Name"
      defaultValue={queryParams?.name || ""}
       onBlur={e => searchFieldChanged('name', e.target.value)}
       onKeyPress={e=> onKeyPress('name', e)}
       />
    </th>
    <th className=' px-3 py-2 border-2 border-gray-500'>
      <SelectInput 
      defaultValue={queryParams?.status || ""}
      className="w-full" onChange={e=> searchFieldChanged('status', e.target.value)}>
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
    {tasks?.data?.length > 0 && tasks?.data?.map((elem)=>(
    <tr key={elem?.id} className=' bg-white dark:bg-gray-800 dark:border-gray-700'>
    <td className=' px-3 py-2 border' >{elem?.id}</td>
    
    <td className=' px-3 py-2 border' >
    <img src={elem?.image_path} alt="" width={60} />
    </td>

    {
    showProjectIdAndNameCol && 
    <td className=' px-3 py-2 border' >
      <div className=' flex justify-between items-start'>
        <span className=' font-bold text-white text-lg'> {elem?.project?.id})</span>

        <span className=' ml-2'> {elem?.project?.name}</span>
      </div>

    </td>
    }
    
    <td className=' px-3 py-2 border hover:underline cursor-pointer text-white' >
    <Link href={route("task.show",  elem?.id)}>{elem?.name}</Link>
    </td>
    <td className= 'px-3 py-2 border' > 
      <span className={` inline-block px-3 py-1 rounded text-white ${TASK_STATUS_CLASS_MAP[elem?.status]}`}>
      {TASK_STATUS_TEXT_MAP[elem?.status]}
      </span>
      </td>
    <td className=' px-3 py-2 border' >{elem?.created_at}</td>
    <td className=' px-3 py-2 border' >{elem?.due_date}</td>
    <td className=' px-3 py-2 border' >{elem?.createdBy?.name}</td>
    
    <td className=' px-3 py-2 border'>
    <Link href={route('task.edit', elem?.id)}
    className=' font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1'
    >
    Edit
    </Link>
    
    <button onClick={()=>deleteTask(elem?.id)} className=' font-medium text-red-600 dark:text-red-500 hover:underline mx-1'>Delete</button>
    </td>
    </tr>
    ))}
    
    </tbody>
    </table>
    </div>
    
    
    <Pagination links={tasks?.meta?.links} />

    </>

  )
}

export default TasksTable
