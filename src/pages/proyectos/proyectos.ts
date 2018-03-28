import { RegisterPage } from './../register/register';
import { DireccionServer } from './../global';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import {Storage} from '@ionic/storage';
import { ChatRoomPage } from '../chat-room/chat-room';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';

/**
 * Generated class for the ProyectosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-proyectos',
  templateUrl: 'proyectos.html',
})
export class ProyectosPage 
{

  proyectos:any;
  miembro:any;
  proyectosUrl:string=this.Url.Url+'proyectos/';
  constructor(public loadingCtrl:LoadingController, public Url:DireccionServer, private storage:Storage,public navCtrl: NavController, public navParams: NavParams, private http:Http,public alertCtrl: AlertController) 
  {
    this.storage.get('member').then(
      val=>
      {
        this.miembro=val;
        this.consultarProyectos(val['id']);
      }
    );
  }

  goToChatRoom(projectId)
  {
    this.navCtrl.push(ChatRoomPage, {data:projectId, nickName:this.miembro['username']});
    
  }

  consultarProyectos(id:number)
  {
    let loader = this.loadingCtrl.create({
      content: "Espera.."
    });
    loader.present();
console.log(this.proyectosUrl+id);
    this.http.get(this.proyectosUrl+id)
    .toPromise()
    .then(respuesta=>
      {
        this.proyectos=respuesta.json();
        loader.dismiss();
      });

    
  }
  


}