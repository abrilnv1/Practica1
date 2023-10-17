import { Component, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';

interface tarea {
  id: string;
  nombre: string,
  descripcion: string,
  prioridad: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal)modal!: IonModal;
  tareas: tarea[] = [];

  tareaEditada: tarea | null = null;
  nombre: string = "";
  descripcion: string = "";
  prioridad: string = "";
  
  constructor() {}

  cancelModal() {
    this.modal.dismiss(null, 'cancel');
  }

  confirmModal() {

    if (this.tareaEditada) {
      this.tareaEditada.nombre = this.nombre;
      this.tareaEditada.descripcion = this.descripcion;
      this.tareaEditada.prioridad = this.prioridad;
    }
    else {
    const uid = new Date().toString();
    const tarea = {
      id: uid,
      nombre: this.nombre,
      descripcion: this.descripcion,
      prioridad: this.prioridad
    };

    this.tareas.push(tarea);
    }

    //LIMPIAR LOS DATOS
    this.nombre = "";
    this.descripcion= "";
    this.prioridad="";

    this.modal.dismiss(null, 'confirm');
  }

  eliminarTarea(item: any) {
    const index = this.tareas.indexOf(item)
    this.tareas.splice(index, 1);
  }


  editarTarea(item: tarea) {
    this.tareaEditada = item;
    this.nombre = item.nombre;
    this.descripcion = item.descripcion;
    this.prioridad = item.prioridad;
    this.modal.present();
   
  }


}
