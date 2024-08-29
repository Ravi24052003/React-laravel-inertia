import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import TextAreaInput from '@/Components/TextAreaInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import React, { useState } from 'react'
import SelectInput from '@/Components/SelectInput'

function Edit({auth, user}) {
    const {data, setData, errors, reset, put} = useForm({
        name: user?.data?.name || "",
        old_password: "",
        password: "",
        password_confirmation: ""
    });

    const onSubmit = function(e){
        e.preventDefault();
        
        put(route("user.update", user?.data?.id));
    }

  return (
    <AuthenticatedLayout
    user={auth?.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Edit User "{user?.data?.name}"</h2>}
    >

<Head title='Edit User' />

    <div className="py-12">
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
    <div className="p-6 text-gray-900 dark:text-gray-100">

    {
        errors?.unauthorized && <InputError message={errors?.unauthorized} className=' mt-2 text-center text-2xl' />
    }

 {/* form starts here */}
 <form onSubmit={onSubmit} className=' p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg'>


<div className=' mt-4'>
<InputLabel htmlFor="user_name" value="Name"/>

    <TextInput 
    id="user_name"
    type="text" 
    name="name"
    value={data?.name}
    className=" mt-1 block w-full"
    
    onChange={e => setData("name", e.target.value)}
    />

    <InputError message={errors?.name} className=' mt-2' />

</div>


<div className=' mt-4'>
<InputLabel htmlFor="old_password" value="Old Password"/>

    <TextInput 
    id="old_password"
    type="text" 
    name="old_password"
    value={data?.old_password}
    className=" mt-1 block w-full"
    
    onChange={e => setData("old_password", e.target.value)}
    />

    <InputError message={errors?.old_password} className=' mt-2' />

</div>

<div className=' mt-4'>
<InputLabel htmlFor="user_password" value="New Password"/>

    <TextInput 
    id="user_password"
    name="password"
    value={data?.password}
    className=" mt-1 block w-full"
   
    onChange={e => setData("password", e.target.value)}
    />

    <InputError message={errors?.password} className=' mt-2' />

</div>


<div className=' mt-4'>
<InputLabel htmlFor="user_conf_password" value="Confirm password"/>

    <TextInput 
    id="user_conf_password"
    name="password_confirmation"
    value={data?.password_confirmation}
    className=" mt-1 block w-full"
   
    onChange={e => setData("password_confirmation", e.target.value)}
    />

    <InputError message={errors?.password_confirmation} className=' mt-2' />

</div>



<div className=' mt-4 text-right'>
<Link href={route("user.index")} className=' bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-2'>Cancel</Link>

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
