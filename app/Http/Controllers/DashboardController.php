<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(){
        $user_id = Auth::id();

        $totalPendingTasks = Task::query()->where("status", "pending")->count();
        $totalInprogressTasks = Task::query()->where("status", "in_progress")->count();
        $totalCompletedTasks = Task::query()->where("status", "completed")->count();
        
        $myPendingTasks = Task::query()->where("status", "pending")->where("assigned_user_id", $user_id)->count();

        $myInprogressTasks = Task::query()->where("status", "in_progress")->where("assigned_user_id", $user_id)->count();

        $myCompletedTasks = Task::query()->where("status", "completed")->where("assigned_user_id", $user_id)->count();

        $activeTasks = Task::query()->whereIn('status', ['pending', 'in_progress'])->where("assigned_user_id", $user_id)->limit(10)->get();
        
        $activeTasks = TaskResource::collection($activeTasks);

        return inertia('Dashboard', compact('totalPendingTasks', 'myPendingTasks', 'totalInprogressTasks', 'myInprogressTasks', 'totalCompletedTasks', 'myCompletedTasks', 'activeTasks'));
    }
}
