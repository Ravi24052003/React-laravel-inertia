import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import React from 'react'
import TasksTable from '../Task/TasksTable';

function Show({auth, project, tasks, queryParams}) {
    console.log("proejcts", project?.id);

    console.log("tasks", tasks);

  return (
    <AuthenticatedLayout 
    user={auth?.user}
    header={
    <div className=' flex justify-between w-[90%] mx-auto items-center max-md:flex-wrap max-md:gap-3'>
    <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{`Project "${project?.data?.name}"`}</h2>

    <Link href={route('project.edit', project?.data?.id)}
className='font-semibold bg-green-400 rounded px-3 py-1 text-white'
>
Edit
</Link>

    </div>
    
    }

    >
  
   <Head title={`Project ${project?.data?.name}`} />

    <div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

    <div>
        <img src={project?.data?.image_path}
         alt="" 
        className=' w-full h-64 object-cover max-md:px-2 max-md:pt-2'
        />
    </div>

    <div className="p-6 text-gray-900 dark:text-gray-100">
    

   <div className=' grid gap-1 grid-cols-2 mt-2 max-md:grid-cols-1'>
    <div>
   <div>
    <label className=' font-bold text-lg'>Project ID</label>
    <p className=' mt-1'>{project?.data?.id}</p>
   </div>

   <div className=' mt-5'>
    <label className=' font-bold text-lg'>Project Name</label>
    <p className=' mt-1'>{project?.data?.name}</p>
   </div>

   <div className=' mt-5'>
    <label className=' font-bold text-lg'>Project Status</label>
    <p className=' mt-1'>
        {
            console.log(PROJECT_STATUS_CLASS_MAP[project?.data?.status], "ele")
        }
        <span className={`px-2 py-1 rounded text-white ${PROJECT_STATUS_CLASS_MAP[project?.data?.status]}`} >{PROJECT_STATUS_TEXT_MAP[project?.data?.status]}</span>
    </p>
   </div>

   <div className=' mt-5'>
    <label className=' font-bold text-lg'>Created By</label>
    <p className=' mt-1'>{project?.data?.createdBy?.name}</p>
   </div>

    </div>

    <div className=' max-md:mt-5'>
    <div>
    <label className=' font-bold text-lg'>Due Date</label>
    <p className=' mt-1'>{project?.data?.due_date}</p>
   </div>

   <div className=' mt-5'>
    <label className=' font-bold text-lg'>Create Date</label>
    <p className=' mt-1'>{project?.data?.created_at}</p>
   </div>

   <div className=' mt-5'>
    <label className=' font-bold text-lg'>Updated By</label>
    <p className=' mt-1'>{project?.data?.updatedBy?.name}</p>
   </div>
    </div>

   </div>

   <div className=' mt-5'>
    <label className=' font-bold text-lg'>Project Description</label>
    <p className=' mt-1'>{project?.data?.description}</p>
   </div>

    </div>
    </div>
    </div>
    </div>




    <div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
    <div className="p-6 text-gray-900 dark:text-gray-100">
     
   <TasksTable project={project} tasks={tasks} queryParams={queryParams} showProjectIdAndNameCol={false} insideShowComponent = {true}/>

    </div>
    </div>
    </div>
    </div>

    </AuthenticatedLayout>
  )
}

export default Show
