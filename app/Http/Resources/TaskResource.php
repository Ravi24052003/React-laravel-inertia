<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'description'=>$this->description,
            'created_at'=>(new Carbon($this->resource->created_at))->format('Y-m-d'),
            'due_date'=>(new Carbon($this->due_date))->format('Y-m-d'),
            'status'=>$this->resource->status,
            'priority'=> $this->priority,
            'image_path'=>$this->resource->image_path,
            'assignedUser'=>new UserCrudResource($this->assignedUser),
            'project'=> new ProjectResource($this->project),
            'createdBy'=>$this->resource->createdBy,
            'updatedBy'=>$this->resource->updatedBy,
            ];
    }
}
