// import { USER_STATUS_CLASS_MAP, USER_STATUS_TEXT_MAP } from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React from 'react'
import TasksTable from '../Task/TasksTable';

function Show({auth, user, tasks, queryParams}) {
    console.log("proejcts", user);

    console.log("tasks", tasks);

  return (
    <AuthenticatedLayout 
    user={auth?.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">{`User ${user?.data?.name}`}</h2>}
    >
  
   <Head title={`User ${user?.data?.name}`} />

    <div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">

    <div>
        <img src={user?.data?.image_path}
         alt="" 
        className=' w-full h-64 object-cover'
        />
    </div>

    <div className="p-6 text-gray-900 dark:text-gray-100">
    

   <div className=' grid gap-1 grid-cols-2 mt-2 max-md:grid-cols-1'>
    <div>
   <div>
    <label className=' font-bold text-lg'>User ID</label>
    <p className=' mt-1'>{user?.data?.id}</p>
   </div>

   <div className=' mt-4'>
    <label className=' font-bold text-lg'>User Name</label>
    <p className=' mt-1'>{user?.data?.name}</p>
   </div>

   <div className=' mt-4'>
    <label className=' font-bold text-lg'>User Status</label>
    <p className=' mt-1'>
        <span className={`px-2 py-1 rounded text-white`} >{user?.data?.status}</span>
    </p>
   </div>

   <div className=' mt-4'>
    <label className=' font-bold text-lg'>Created By</label>
    <p className=' mt-1'>{user?.data?.createdBy?.name}</p>
   </div>

    </div>

    <div>
    <div>
    <label className=' font-bold text-lg'>Due Date</label>
    <p className=' mt-1'>{user?.data?.due_date}</p>
   </div>

   <div className=' mt-4'>
    <label className=' font-bold text-lg'>Create Date</label>
    <p className=' mt-1'>{user?.data?.created_at}</p>
   </div>

   <div className=' mt-4'>
    <label className=' font-bold text-lg'>Updated By</label>
    <p className=' mt-1'>{user?.data?.updatedBy?.name}</p>
   </div>
    </div>

   </div>

   <div className=' mt-5'>
    <label className=' font-bold text-lg'>User Description</label>
    <p className=' mt-1'>{user?.data?.description}</p>
   </div>

    </div>
    </div>
    </div>
    </div>




    <div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
    <div className="p-6 text-gray-900 dark:text-gray-100">
     
   <TasksTable user={user} tasks={tasks} queryParams={queryParams} showUserIdAndNameCol={false} insideShowComponent = {true}/>

    </div>
    </div>
    </div>
    </div>

    </AuthenticatedLayout>
  )
}

export default Show
