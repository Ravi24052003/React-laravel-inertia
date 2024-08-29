import { TASK_PRIORITY_CLASS_MAP, TASK_PRIORITY_TEXT_MAP, TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react'
import TasksTable from '../Task/TasksTable';

function Show({auth, task}) {
  console.log("show", task);

  return (
    <AuthenticatedLayout 
    user={auth?.user}
    header={<div className=' flex justify-between w-[90%] mx-auto items-center max-md:flex-wrap max-md:gap-3'>
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{`Project "${task?.data?.name}"`}</h2>
    
        <Link href={route('task.edit', task?.data?.id)}
    className='font-semibold bg-green-400 rounded px-3 py-1 text-white'
    >
    Edit
    </Link>
    
        </div>}
    >

        
  
   <Head title={`Task ${task?.data?.name}`} />

    <div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

    <div>
        <img src={task?.data?.image_path}
         alt="" 
        className=' w-full h-64 object-cover max-md:px-2 max-md:pt-2'
        />
    </div>

    <div className="p-6 text-gray-900 dark:text-gray-100">
    

   <div className=' grid gap-1 grid-cols-2 mt-2 max-md:grid-cols-1'>
    <div>
   <div>
    <label className=' font-bold text-lg'>Task ID</label>
    <p className=' mt-1'>{task?.data?.id}</p>
   </div>

 

   <div className=' mt-5'>
    <label className=' font-bold text-lg'>Task Name</label>
    <p className=' mt-1'>{task?.data?.name}</p>
   </div>

   <div className=' mt-5'>
    <label className=' font-bold text-lg'>Task Status</label>
    <p className=' mt-1'>
        {
            console.log(TASK_STATUS_CLASS_MAP[task?.data?.status], "ele")
        }
        <span className={`px-2 py-1 rounded text-white ${TASK_STATUS_CLASS_MAP[task?.data?.status]}`} >{TASK_STATUS_TEXT_MAP[task?.data?.status]}</span>
    </p>
   </div>


   <div className=' mt-5'>
    <label className=' font-bold text-lg'>Task Priority</label>
    <p className=' mt-1'>
      
        {
            // console.log([task?.data?.priority], "ele")
        }
        <span className={`px-2 py-1 rounded text-white ${TASK_PRIORITY_CLASS_MAP[task?.data?.priority]}`} >{TASK_PRIORITY_TEXT_MAP[task?.data?.priority]}</span>
    </p>
   </div>

   <div className=' mt-5'>
    <label className=' font-bold text-lg'>Created By</label>
    <p className=' mt-1'>{task?.data?.createdBy?.name}</p>
   </div>

    </div>

    <div className=' max-md:mt-5'>
    <div>
    <label className=' font-bold text-lg'>Due Date</label>
    <p className=' mt-1'>{task?.data?.due_date}</p>
   </div>

   <div className=' mt-5'>
    <label className=' font-bold text-lg'>Create Date</label>
    <p className=' mt-1'>{task?.data?.created_at}</p>
   </div>

   <div className=' mt-5'>
    <label className=' font-bold text-lg'>Updated By</label>
    <p className=' mt-1'>{task?.data?.updatedBy?.name}</p>
   </div>

   <div className=' mt-5'>
    <label className=' font-bold text-lg'>Assigned to</label>
    <p className=' mt-1'>{task?.data?.assignedUser?.name} <span className=' dark:text-gray-200 text-sm ml-3'>id: {task?.data?.assignedUser?.id}</span> </p>
   </div>

   <div className=' mt-5'>
    <label className=' font-bold text-lg'>Project</label>
    <p className=' mt-1 hover:underline cursor-pointer dark:text-white'><Link href={route("project.show",  task?.data?.project?.id)}>{task?.data?.project?.name} <span className=' dark:text-gray-200 text-sm ml-3'>id: {task?.data?.project?.id}</span> </Link> </p>
   </div>
   


    </div>

   </div>

   <div className=' mt-5'>
    <label className=' font-bold text-lg'>Task Description</label>
    <p className=' mt-1'>{task?.data?.description}</p>
   </div>

    </div>
    </div>
    </div>
    </div>


    </AuthenticatedLayout>
  )
}

export default Show
