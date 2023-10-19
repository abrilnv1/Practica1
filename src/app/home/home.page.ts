import { CreateTaskUseCase } from './../core/tasks/use-cases/create-task.use-case';
import { GetTaskUseCase } from './../core/tasks/use-cases/get-task.use-case';
import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';


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
    this.tareas.splice(index, 1);
  }

  editarTareas(item: tarea){
    this.tareaEditada = item;
    this.nombre = item.nombre;
    this.descripcion = item.descripcion;
    this.prioridad = item.prioridad;
    this.modal.present();
  }


}
