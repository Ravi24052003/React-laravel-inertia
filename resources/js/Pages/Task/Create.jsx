import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import TextAreaInput from '@/Components/TextAreaInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React from 'react'
import SelectInput from '@/Components/SelectInput'

function Create({auth, projects, users}) {
   const {data, setData, post, errors, reset} = useForm({
        image: "",
        name: "",
        status: "",
        description: "",
        due_date: "",
        priority: "",
        project_id: "",
        assigned_user_id: ""
    })

    const onSubmit = function(e){
        e.preventDefault();

        post(route("task.store"));
    }

    console.log("projecst", projects, users);

  return (
    <AuthenticatedLayout
    user={auth?.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Create new Task</h2>}
    >

<Head title='Create Task' />

    <div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
    <div className="p-6 text-gray-900 dark:text-gray-100">

 {/* form starts here */}
<form onSubmit={onSubmit} className=' p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>



<div>
<InputLabel htmlFor="project_id" value="Select Project Id"/>

    <SelectInput name="project_id" id="project_id" className="mt-1 block w-full" onChange={e=> setData("project_id", e.target.value)}>
        <option value=""></option>
        {
            projects?.data?.length > 0 && projects?.data?.map((project)=> <option key={project?.id} value={project?.id}>{project?.id} {")  "} {project?.name}</option> )
        }
    </SelectInput>

    <InputError message={errors?.project_id} className=' mt-2' />

</div>



<div className=' mt-4'>
<InputLabel htmlFor="task_image" value="Task Image"/>

    <TextInput 
    id="task_image"
    type="file" 
    name="image"
    accept="image/*"
    className=" mt-1 block w-full"
    onChange={e =>{
     setData("image", "");

    return setData("image", e.target.files[0]);
    }
    }
    />

    <InputError message={errors?.image_path} className=' mt-2' />

</div>


<div className=' mt-4'>
<InputLabel htmlFor="task_name" value="Task Name"/>

    <TextInput 
    id="task_name"
    type="text" 
    name="name"
    value={data?.name}
    className=" mt-1 block w-full"
    
    onChange={e => setData("name", e.target.value)}
    />

    <InputError message={errors?.name} className=' mt-2' />

</div>



<div className=' mt-4'>
<InputLabel htmlFor="task_description" value="Task Description"/>

    <TextAreaInput 
    id="task_description"
    name="description"
    value={data?.description}
    className=" mt-1 block w-full"
   
    onChange={e => setData("description", e.target.value)}
    />

    <InputError message={errors?.description} className=' mt-2' />

</div>


<div className=' mt-4'>
<InputLabel htmlFor="task_due_date" value="Task Deadline"/>

    <TextInput 
    id="task_due_date"
    type="date" 
    name="due_date"
    value={data?.due_date}
    className=" mt-1 block w-full"
    
    onChange={e => setData("due_date", e.target.value)}
    />

    <InputError message={errors?.due_date} className=' mt-2' />

</div>


<div className=' mt-4'>
<InputLabel htmlFor="task_status" value="Task Status"/>

    <SelectInput name="status" id="task_status" className="mt-1 block w-full" onChange={e=> setData("status", e.target.value)}>
        <option value=""></option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
    </SelectInput>

    <InputError message={errors?.status} className=' mt-2' />

</div>

<div className=' mt-4'>
<InputLabel htmlFor="task_priority" value="Task Priority"/>

    <SelectInput name="priority" id="task_priority" className="mt-1 block w-full" onChange={e=> setData("priority", e.target.value)}>
        <option value=""></option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
    </SelectInput>

    <InputError message={errors?.priority} className=' mt-2' />

</div>



<div className=' mt-4'>
<InputLabel htmlFor="user_id" value="Assign User Id"/>

    <SelectInput name="user_id" id="user_id" className="mt-1 block w-full" onChange={e=> setData("assigned_user_id", e.target.value)}>
        <option value=""></option>
        {
            users?.data?.length > 0 && users?.data?.map((user)=> <option key={user?.id} value={user?.id}>{user?.id} {")  "} {user?.name}</option> )
        }
    </SelectInput>

    <InputError message={errors?.assigned_user_id} className=' mt-2' />

</div>






<div className=' mt-4 text-right'>
<Link href={route("task.index")} className=' bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2'>Cancel</Link>

<button className=' bg-emerald-500 py-1 px-3 text-white rounded shadow transition-all hover:bg-emerald-600'>Submit</button>
</div>
</form>
{/* form ends here  */}

    </div>
    </div>
    </div>
    </div>

    </AuthenticatedLayout>
  )
}

export default Create
