import { Injectable } from "@angular/core";
import { TaskRepository } from "../interfaces/task.repository";
import { Task } from '../entities/task';

@Injectable({providedIn: 'root'})

export class UpdateTaskUseCase {
    constructor (
        private repository : TaskRepository
    ) {}

    async execute(id: string, updatedTask: Task): Promise<void>{
        await this.repository.updateTask(id, updatedTask);
    }
}