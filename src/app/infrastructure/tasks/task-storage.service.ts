import { Injectable } from "@angular/core";
import { Task } from "src/app/core/tasks/entities/task";
import { TaskRepository } from "src/app/core/tasks/interfaces/task.repository";
import { Preferences } from "@capacitor/preferences";

const COLLECTION = 'TASK';

@Injectable({providedIn: 'root'})

export class TaskStorageService implements TaskRepository{
    async  createTask(task: Task) {
        await Preferences.set({
            key: COLLECTION + "-" + task.id , 
            value: JSON.stringify(task)
        });
    }
    async getTask(): Promise<Task[]> {
        const collection = await Preferences.keys();
        const tasks: Task[] = [];

        collection.keys.filter(key => key.startsWith(COLLECTION))
        .forEach(async key => {
            const data = (await Preferences.get({key})).value;
            if(data) tasks.push(JSON.parse(data));
        })
        return tasks;
    }
    async  getTaskById(id: string): Promise<Task | null> {
        throw new Error("Method not implemented.");
    }
    updateTask(id: string, updatedTask: Task): boolean {
        throw new Error("Method not implemented.");
    }
    deleteTask(id: string): boolean {
        throw new Error("Method not implemented.");
    }
    
}