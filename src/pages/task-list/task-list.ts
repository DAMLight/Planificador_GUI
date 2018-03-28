import { DireccionServer } from './../global';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http,Headers } from '@angular/http';


/**
 * Generated class for the TaskListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {
  private headers = new Headers({'Content-Type': 'application/json; charset=utf-8;'});
  tareas:any;
  tareasUrl:string=this.Url.Url+'proyectos/objetivos/tareas/';
  objetivo:any;
  miembro:any;
  proyecto:any;
  leader:boolean;

  constructor(public Url:DireccionServer, private storage:Storage, private http:Http, public navCtrl: NavController, public navParams: NavParams) 
  {
    this.storage.get('member').then(
      member=>
      {
        this.miembro=member;
        this.proyecto=this.navParams.get('proyecto');
        if(this.miembro['id']===this.proyecto['leader'])
        {
          this.leader=true;
        }
        else
        {
          this.leader=false;
        }
      });

      


  }

  obtenerTareas(id_objetivo:number)
  {
    this.http.get(this.tareasUrl+id_objetivo)
    .toPromise()
    .then(
      respuesta=>
      {
        this.tareas=respuesta.json();
        console.log(this.tareas);
      }
    );
  }

  verificar(i:number)
  {
    if(this.tareas[i].complete===1)
    {
      return true;
    }

    else return false;
  }

  completarTarea(tarea:any)
  {
    this.http.post(this.Url.Url+'proyectos/objetivos/tareas/completar',JSON.stringify(tarea), {headers: this.headers})
    .toPromise()
    .then(response=>{ this.tareas=response.json();});
    
  }

  ionViewWillLoad()
  {
    this.objetivo=this.navParams.get('data');
    this.obtenerTareas(this.objetivo['id']);
  }


}
