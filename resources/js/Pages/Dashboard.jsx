import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth, myPendingTasks, totalPendingTasks, myInprogressTasks, totalInprogressTasks, myCompletedTasks, totalCompletedTasks, activeTasks }) {
    
    console.log("acitvrTasks", activeTasks);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col items-center justify-between md:grid md:grid-cols-3 gap-3">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className=' text-amber-500 text-xl font-semibold'>Pending tasks</h3>
                            <p>{myPendingTasks}/{totalPendingTasks}</p>
                        </div>
                    </div>


                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className=' text-blue-500 text-xl font-semibold'>In Progress Tasks</h3>
                            <p>{myInprogressTasks}/{totalInprogressTasks}</p>
                        </div>
                    </div>


                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className=' text-green-500 text-xl font-semibold'>completed Tasks</h3>
                            <p>{myCompletedTasks}/{totalCompletedTasks}</p>
                        </div>
                    </div>


                </div>

                <div className=' max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4'>
                <div className=' bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg '>
                 <div className=' p-6 text-gray-900 dark:text-gray-100'>
                  <h3 className=' text-gray-200 text-xl font-semibold'>
                {
                (activeTasks?.data?.length == 10)? <span className=' text-black dark:text-gray-100'>Top 10 My Active Tasks</span> : <span className=' text-black dark:text-gray-100'>My Active Tasks</span> 
                } 

                 {
                    (activeTasks?.data?.length == 0)? 
                    <div>
                     <h3 className=' text-black dark:text-gray-100'>Currently there are no active tasks assigned to you</h3>
                    </div>

                    : 


               
                    

                  <div className=' overflow-auto'>

                    <table className=' w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                        <thead className=' text-xs text-gray-900 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                            <tr className=' text-nowrap'>
                                <th className='  px-3 py-2 border-2 border-gray-500'>ID</th>
                                <th className='  px-3 py-2 border-2 border-gray-500'>Project ID and Name</th>
                                <th className='  px-3 py-2 border-2 border-gray-500'>Name</th>
                                <th className='  px-3 py-2 border-2 border-gray-500'>Status</th>
                                <th className='  px-3 py-2 border-2 border-gray-500'>Due Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                             activeTasks?.data?.length > 0 && activeTasks?.data?.map((ele)=> (
                                <tr key={ele?.id}>
                                    <td className='  px-3 py-2 border-2 border-gray-500'>{ele?.id}</td>
                                    <td className='  px-3 py-2 border-2 border-gray-500 dark:text-white font-bold hover:underline'>
                                        <Link href={route("project.show", ele?.project?.id)}>
                                        {ele?.project?.id}) {" "} {ele?.project?.name}
                                        </Link>
                                    
                                        </td>
                                    <td className='  px-3 py-2 border-2 border-gray-500 dark:text-white font-bold hover:underline'>
                                    <Link href={route("task.show", ele?.id)}>
                                         {ele?.name}
                                        </Link>
                                        </td>
                                    <td className='  text-nowrap px-3 py-2 border-2 border-gray-500'>
                                    <span className={` inline-block px-3 py-1 rounded text-white ${TASK_STATUS_CLASS_MAP[ele?.status]}`}>
      {TASK_STATUS_TEXT_MAP[ele?.status]}
      </span>
                                    </td>

                                    <td className=' text-nowrap px-3 py-2 border-2 border-gray-500'>{ele?.due_date}</td>
                                </tr>
                             ))  
                            }
                        </tbody>
                    </table>

                    </div>
  }

                  </h3>
                 </div>
                </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
