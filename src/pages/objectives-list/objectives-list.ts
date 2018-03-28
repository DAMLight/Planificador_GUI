import { DireccionServer } from './../global';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { TaskListPage} from '../task-list/task-list';

/**
 * Generated class for the ObjectivesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-objectives-list',
  templateUrl: 'objectives-list.html',
})
export class ObjectivesListPage 
{

  objetivos:any;
  projectId:number;
  objetivosUrl:string= this.Url.Url + 'proyectos/objetivos/';
  tareasUrl:string= this.Url.Url+'proyectos/objetivos/tareas/';
  name:string;

  tareas:any;

  constructor(public Url:DireccionServer, private http:Http, public navCtrl: NavController, public navParams: NavParams, public direcciones:DireccionServer) 
  {
    this.name=this.navParams.get('data')['name'];
  }

  ionViewWillLoad()
  {
    this.projectId=this.navParams.get('id');
  }

  ionViewWillEnter()
  {

    this.obtenerObjetivos(this.projectId);
    //this.obtenerObjetivos(this.projectId);
  }

  

  obtenerObjetivos(proyecto:number)
  {
    this.http.get(this.objetivosUrl+proyecto)
    .toPromise()
    .then(
      respuesta=>{
        this.objetivos=respuesta.json();
      }
    );
  }

  verTareas(objetivo)
  {
    this.navCtrl.push(TaskListPage, {data:objetivo, proyecto: this.navParams.get('data')});
  }



}
