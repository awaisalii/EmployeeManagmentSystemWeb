import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { TaskListGridComponent } from '../components/library/task-list-grid/task-list-grid.component';
import { PlanningTaskListComponent } from '../pages/planning-task-list/planning-task-list.component';
import { PlanningTaskDetailsComponent } from '../pages/planning-task-details/planning-task-details.component';

const routes: Routes = [
  {
    path:'',
    component:TasksComponent
  },
  {
    path:'overview/:id',
    component:PlanningTaskDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
