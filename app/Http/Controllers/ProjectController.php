<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {  
        $query = Project::query();

        $sortField = request("sort_field", "id");
        $sortDirection = request("sort_direction", "asc");

        if(request("name")){
            $query->where("name", "like", "%".request("name")."%");
        }
        if(request("status")){
            $query->where("status", request("status"));
        }

        $projects = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return Inertia::render("Project/Index", [
        "projects"=>ProjectResource::collection($projects),
        "queryParams"=> request()->query() ?: null,
        "success"=>session("success")
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
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

        Project::create($data);

        return to_route("project.index")->with("success", "Project is created");
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {

        $query = $project->tasks();
        $sortField = request("sort_field", "id");
        $sortDirection = request("sort_direction", "asc");

        if(request("name")){
            $query->where("name", "like", "%".request("name")."%");
        }
        if(request("status")){
            $query->where("status", request("status"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return Inertia::render("Project/Show", [
         "project" => new ProjectResource($project),
         "tasks" => TaskResource::collection($tasks),
         "queryParams" => request()->query() ?: null
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia("Project/Edit", [
         "project" => new ProjectResource($project)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    { 
        // files can only be uploaded using post request in php/laravel if you still want to use put/patch request send _method: "PUT" property in payload/request data with post request however request body not containing file will work normally no need to specify _method: "PUT" directly use put request

        $data = $request->validated();
        $data["updated_by"] = Auth::id();

        if($request->hasFile("image")){
            if(!empty($project->image_path)){

                $oldImagePath = public_path().$project->image_path;

                if(file_exists($oldImagePath)){
                 unlink($oldImagePath);
                // Storage::disk("public")->delete($project->image_path);
                }
            }

            $image = $data["image"];
            $newImagePath = $image->store("images", "public");

            $data["image_path"] = Storage::url($newImagePath);
        }

        Arr::forget($data, "image");

       $project->update($data);

       return to_route("project.index")->with("success", "Project is updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $name = $project->name;
        
        // Task::where("project_id", $project->id)->delete();
        $tasks = $project->tasks()->get();

        foreach ($tasks as $task) {
            if (!empty($task->image_path)) {
                $taskImagePath = public_path($task->image_path);
    
                if (file_exists($taskImagePath)) {
                    unlink($taskImagePath);
                    // Storage::disk("public")->delete($task->image_path);
                }
            }
        }

        $project->tasks()->delete();

        if(!empty($project->image_path)){
            $oldImagePath = public_path().$project->image_path;

            if(file_exists($oldImagePath)){
                unlink($oldImagePath);
                // Storage::disk("public")->delete($project->image_path);
            }
        }

        $project->delete();

        return to_route("project.index")->with("success", "Project \"$name\" deleted successfully");
    }
}
