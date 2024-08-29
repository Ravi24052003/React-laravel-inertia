<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCrudResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

use function Termwind\render;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {  
        
        $query = User::query();

        $sortField = request("sort_field", "id");
        $sortDirection = request("sort_direction", "asc");

        if(request("name")){
            $query->where("name", "like", "%".request("name")."%");
        }
        if(request("email")){
            $query->where("email", "like", "%".request("email")."%");
        }

        $users = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return Inertia::render("User/Index", [
        "users"=>UserCrudResource::collection($users),
        "queryParams"=> request()->query() ?: null,
        "success"=>session("success")
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("User/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
 
         User::create($data);
 
         return to_route("user.index")->with("success", "User is created");
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render("User/Edit", [
            "user"=> new UserCrudResource($user)
        ]);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        if (Auth::id() !== $user->id) {
            return redirect()->back()->withErrors(['unauthorized' => 'You are not authorized to update this user\'s data.']);
        }

        $data = $request->validated();

     if (Hash::check($data['old_password'], $user->password)) {

      $user->name = $data["name"];

      if(!empty($data["password"])){
       $user->password = $data["password"];
      }

      $user->save();

    return  to_route("user.index")->with("success", "User is updated successfully");
    } else {
        return redirect()->back()->withErrors(['old_password' => 'The provided old password is incorrect.']);
    }
    
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
