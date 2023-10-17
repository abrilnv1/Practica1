import { Task } from "../entities/task";
import { TaskRepository } from "../interfaces/task.repository";

class GetTaskUseCase {
   constructor (
    private repository : TaskRepository
   ) {}

   async execute () : Promise <Task[]> {
    const task = await this.repository.getTask();
    return task;
   }
   
  }
  