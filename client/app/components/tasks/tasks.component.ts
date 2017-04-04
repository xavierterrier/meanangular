import { Component } from '@angular/core';
import { TaskService } from '../../services/tasks.service';
import { ITask } from '../../../../common/model/itask';

@Component({
 // moduleId: module.id,
  selector: 'my-tasks',
  templateUrl: '/app/components/tasks/tasks.component.html',
})
export class TasksComponent  {
  tasks: ITask[];

  constructor(private taskService:TaskService) {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

}
