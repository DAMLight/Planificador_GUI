import { DireccionServer } from './../global';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
/**
 * Generated class for the UsersListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-users-list',
  templateUrl: 'users-list.html',
})
export class UsersListPage 
{
  encargadosUrl:string=this.Url.Url+'proyectos/miembros/';
  encargados:any;
  projectId:number;
  name:string;

  constructor(public Url:DireccionServer, public navCtrl: NavController, public navParams: NavParams, public http:Http) 
  {
    this.name=this.navParams.get('data')['name'];
  }

  ionViewDidLoad() 
  {
    this.projectId=this.navParams.get('id');
    this.obtenerMiembros(this.projectId);
  }

  obtenerMiembros(proyecto:number)
  {
    this.http.get(this.encargadosUrl+proyecto)
    .toPromise()
    .then(respuesta=>
    {
      this.encargados=respuesta.json();
    });
  }

}
