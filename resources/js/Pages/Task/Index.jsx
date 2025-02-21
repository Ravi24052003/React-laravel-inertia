import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import React, { useEffect } from 'react';
import TasksTable from './TasksTable';

function Index({auth, tasks, queryParams=null, success = null, myTasks = false}) {
    queryParams = queryParams || {}

  return (
<AuthenticatedLayout
user={auth.user}
header={<div className=' flex justify-between w-[90%] mx-auto items-center'>
  <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Tasks</h2>
  
  <Link href={route("task.create")} className='font-semibold bg-green-400 rounded px-2 py-1 text-white'>Add new</Link>
    </div>
}
>

<Head title='Tasks'/>
{
  success && <div className=' my-2 bg-emerald-500 py-2 px-4 text-white rounded w-[50%] mx-auto text-center'>{success} </div>
}

<div className="py-12">
<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
<div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
<div className="p-6 text-gray-900 dark:text-gray-100">

<TasksTable tasks={tasks} queryParams={queryParams} myTasks={myTasks} />

</div>
</div>
</div>
</div>

</AuthenticatedLayout>
  )
}

export default Index
