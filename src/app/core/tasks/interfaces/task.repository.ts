import { Injectable } from '@angular/core';
import { Task } from './../entities/task';

@Injectable({providedIn: 'root'})


export abstract class TaskRepository {

    abstract createTask(task: Task): Promise<void>; 
    abstract getTask(): Promise<Task[]>;
    abstract getTaskById(id: string): Promise <Task | null>; 
    abstract updateTask(id: string, updatedTask: Task): boolean;
    abstract deleteTask(id: string):boolean; 

  }
