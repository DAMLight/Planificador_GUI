import { Storage } from '@ionic/storage';
import { DireccionServer } from './../global';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the ProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-project',
  templateUrl: 'project.html',
})
export class ProjectPage 
{

  proyecto:any;
  id:number;
  name:string;
  miembro:any;
  leader:boolean;
  constructor(private storage:Storage, private server:DireccionServer, private http:Http, public navCtrl: NavController, public navParams: NavParams) 
  {
    this.proyecto={};
    this.miembro={};
    this.leader=false;

  }

  ionViewWillLoad()
  {
    this.id=this.navParams.get('id');
    this.obtenerProyecto(this.id);
  }

  obtenerProyecto(id:number)
  {
    this.storage.get('leader')
    .then(
      res=>
      {
        this.leader=res;
      }
    )
    this.http.get(this.server.UrlLocal+'proyecto/'+id)
    .toPromise()
    .then(respuesta=>
    {
      this.proyecto=respuesta.json();
    });
  }



}
