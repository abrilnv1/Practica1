import { CreateTaskUseCase } from './../core/tasks/use-cases/create-task.use-case';
import { GetTaskUseCase } from './../core/tasks/use-cases/get-task.use-case';
import { DeleteTaskUseCase } from './../core/tasks/use-cases/delete-task.use-case';
import { UpdateTaskUseCase } from './../core/tasks/use-cases/update-task.use-case';
import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Task } from '../core/tasks/entities/task';


interface tarea{
  id: string;
  nombre: string;
  descripcion: string;
  prioridad: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  @ViewChild(IonModal) modal!: IonModal;
  tareas: tarea[] = [];
  tareaEditada: tarea | null = null;
  nombre: string = "";
  descripcion: string = "";
  prioridad: string = "";
  

  constructor(
    private getTaskUseCase: GetTaskUseCase,
    private createTaskUseCase: CreateTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase,
    private updateTaskUseCase: UpdateTaskUseCase,
  ) {}

  async ngOnInit(){
    this.tareas = (await this.getTaskUseCase.execute());
  }

  cancel(){
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
      if (this.tareaEditada){
        this.tareaEditada.nombre = this.nombre;
        this.tareaEditada.descripcion = this.descripcion;
        this.tareaEditada.prioridad = this.prioridad;

        const updatedTask: Task = {
          id: this.tareaEditada.id,
          nombre: this.tareaEditada.nombre,
          descripcion: this.tareaEditada.descripcion,
          prioridad: this.tareaEditada.prioridad,
          estado: false
        };

        await this.updateTaskUseCase.execute(this.tareaEditada.id, updatedTask);
      }else{
        await this.createTaskUseCase.execute(this.nombre, this.descripcion, this.prioridad);
        this.tareas = (await this.getTaskUseCase.execute());
      }

    
    this.nombre = "";
    this.descripcion = "";
    this.prioridad = "";
    this.tareaEditada = null;
    this.modal.dismiss(this.modal, 'confirm');
  }


  eliminarTarea(item: any){
    const index = this.tareas.indexOf(item);
    if(index !== -1) {
      const tareaId = this.tareas[index].id;
      this.deleteTaskUseCase.execute(tareaId).then(() => {
        this.tareas.splice(index, 1);
      })
    }
  }

  editarTareas(item: tarea){
    this.tareaEditada = item;
    this.nombre = item.nombre;
    this.descripcion = item.descripcion;
    this.prioridad = item.prioridad;
    this.modal.present();
  }


}
