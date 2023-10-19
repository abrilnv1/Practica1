import { Injectable } from "@angular/core";
import { Task } from "src/app/core/tasks/entities/task";
import { TaskRepository } from "src/app/core/tasks/interfaces/task.repository";
import { Preferences } from "@capacitor/preferences";

const COLLECTION = 'TASK';

@Injectable({providedIn: 'root'})

export class TaskStorageService implements TaskRepository{
    // CREA UNA NUEVA TAREA
    async  createTask(task: Task) {
        await Preferences.set({
            key: COLLECTION + "-" + task.id , 
            value: JSON.stringify(task)
        });
    }
    // TRAE TODAS LAS TAREAS
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
    // TRAE UNA SOLA TAREA
    async  getTaskById(id: string): Promise<Task | null> {
        throw new Error("Method not implemented.");
    }
    // EDITA UNA TAREA
    updateTask(id: string, updatedTask: Task): boolean {
        const tasks = COLLECTION + "-" + id;
        const taskData = JSON.stringify(updatedTask);

        Preferences.set({
            key: tasks,
            value: taskData
        });
    
        return true;
    }
    // ELIMINA UNA TAREA
    deleteTask(id: string): boolean {
        const tasks = COLLECTION + "-" + id;
        Preferences.remove({ key: tasks });
        return true;
    }
    
}