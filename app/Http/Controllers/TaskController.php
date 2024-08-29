<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use App\Http\Resources\UserResource;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        $sortField = request("sort_field", "id");
        $sortDirection = request("sort_direction", "asc");

        if(request("name")){
            $query->where("name", "like", "%".request("name")."%");
        }
        if(request("status")){
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return Inertia::render("Task/Index", [
        "tasks"=>TaskResource::collection($tasks),
        "queryParams"=> request()->query() ?: null,
        "success" => session("success")
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $projects = Project::all();
        $users = User::all();

        return Inertia::render("Task/Create", [
            "projects" => ProjectResource::collection($projects),
            "users" => UserResource::collection($users)
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
       $image = $data["image"] ?? null;

        $data["created_by"] = Auth::id();
        $data["updated_by"] = Auth::id();

        if($image){
            $path = $image->store("images", "public");
           
            // $data["image_path"] = "http://localhost:8000/storage/".$path;
            $data["image_path"] = Storage::url($path);
        }

        Arr::forget($data, "image");

        Task::create($data);

        return to_route("task.index")->with("success", "Task is created");
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {

        return Inertia::render("Task/Show", [
         "task" => new TaskResource($task)
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $projects = Project::all();
        $users = User::all();

        return inertia("Task/Edit", [
            "task" => new TaskResource($task),
            "projects" => ProjectResource::collection($projects),
            "users" => UserResource::collection($users)
           ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $data["updated_by"] = Auth::id();

        if($request->hasFile("image")){
            if(!empty($task->image_path)){

                $oldImagePath = public_path().$task->image_path;

                if(file_exists($oldImagePath)){
                 unlink($oldImagePath);
                // Storage::disk("public")->delete($task->image_path);
                }
            }

            $image = $data["image"];
            $newImagePath = $image->store("images", "public");

            $data["image_path"] = Storage::url($newImagePath);
        }

        Arr::forget($data, "image");

       $task->update($data);

       return to_route("task.index")->with("success", "Task is updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $name = $task->name;

        if(!empty($task->image_path)){
            $oldImagePath = public_path().$task->image_path;

            if(file_exists($oldImagePath)){
                unlink($oldImagePath);
                // Storage::disk("public")->delete($task->image_path);
            }
        }

        $task->delete();

        return to_route("task.index")->with("success", "Task \"$name\" deleted successfully");
    }

    public function myTasks(){
        $currentUserId = Auth::id();

        $query = Task::query();

        $sortField = request("sort_field", "id");
        $sortDirection = request("sort_direction", "asc");

        if(request("name")){
            $query->where("name", "like", "%".request("name")."%");
        }
        if(request("status")){
            $query->where("status", request("status"));
        }

        $query->where("assigned_user_id", $currentUserId);

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return Inertia::render("Task/Index", [
        "tasks"=>TaskResource::collection($tasks),
        "queryParams"=> request()->query() ?: null,
        "success" => session("success"),
        "myTasks" => true
        ]);
    }
}
