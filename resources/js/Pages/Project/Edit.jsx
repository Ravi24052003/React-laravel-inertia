import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import TextAreaInput from '@/Components/TextAreaInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import SelectInput from '@/Components/SelectInput'

function Edit({auth, project}) {
    const {data, setData, errors, reset, post} = useForm({
        image: "",
        name: project?.data?.name || "",
        status: project?.data?.status || "",
        description: project?.data?.description || "",
        due_date: project?.data?.due_date || "",
        _method: 'PUT'
    });

    const [imageUrl, setImageUrl] = useState("");

    console.log("project", project);

    const onSubmit = function(e){
        e.preventDefault();
        
        post(route("project.update", project?.data?.id));
    }

  return (
    <AuthenticatedLayout
    user={auth?.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit Project "{project?.data?.name}"</h2>}
    >

<Head title='Edit Project' />

    <div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
    <div className="p-6 text-gray-900 dark:text-gray-100">

 {/* form starts here */}
<form onSubmit={onSubmit} className=' p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>

{
   (imageUrl || project?.data?.image_path ) && 
        <div className=' mb-4'>
        <img src={imageUrl || project?.data?.image_path} width={200} />
        </div>
}


<div>
<InputLabel htmlFor="project_image" value="Project Image"/>

    <TextInput 
    id="project_image"
    type="file" 
    name="image"
    accept="image/*"
    className=" mt-1 block w-full"
    onChange={e =>{

     if(e.target.files.length > 0){
        setImageUrl(URL.createObjectURL(e.target.files[0]));

     }else{
        setImageUrl("");
     }


     setData("image", "");

    return setData("image", e.target.files[0]);
     
    }
    }
    />

    <InputError message={errors?.image} className=' mt-2' />

</div>


<div className=' mt-4'>
<InputLabel htmlFor="project_name" value="Project Name"/>

    <TextInput 
    id="project_name"
    type="text" 
    name="name"
    value={data?.name}
    className=" mt-1 block w-full"
    
    onChange={e => setData("name", e.target.value)}
    />

    <InputError message={errors?.name} className=' mt-2' />

</div>



<div className=' mt-4'>
<InputLabel htmlFor="project_description" value="Project Description"/>

    <TextAreaInput 
    id="project_description"
    name="description"
    value={data?.description}
    className=" mt-1 block w-full"
   
    onChange={e => setData("description", e.target.value)}
    />

    <InputError message={errors?.description} className=' mt-2' />

</div>


<div className=' mt-4'>
<InputLabel htmlFor="project_due_date" value="Project Deadline"/>

    <TextInput 
    id="project_due_date"
    type="date" 
    name="due_date"
    value={data?.due_date}
    className=" mt-1 block w-full"
    
    onChange={e => setData("due_date", e.target.value)}
    />

    <InputError message={errors?.due_date} className=' mt-2' />

</div>


<div className=' mt-4'>
<InputLabel htmlFor="project_status" value="Project Status"/>

    <SelectInput value={data?.status} name="status" id="project_status" className="mt-1 block w-full" onChange={e=> setData("status", e.target.value)}>
        <option value=""></option>
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
    </SelectInput>

    <InputError message={errors?.status} className=' mt-2' />

</div>


<div className=' mt-4 text-right'>
<Link href={route("project.index")} className=' bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2'>Cancel</Link>

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

export default Edit
