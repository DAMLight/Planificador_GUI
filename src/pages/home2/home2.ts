import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChatRoomPage} from '../chat-room/chat-room';
import {ProyectosPage} from '../proyectos/proyectos';
import {Storage} from '@ionic/storage';
import {Member} from '../register/member';
import {ProjectRegisterPage} from '../project-register/project-register';
import {HomePage} from '../home/home';


@Component({
  selector: 'page-home2',
  templateUrl: 'home2.html',
})
export class Home2Page 
{

	@ViewChild('nombre') nombre;
	public id:string;
	public nom:string;
  public ema:string;
  nickname='';
  constructor(public navCtrl: NavController, public storage:Storage) 
  {
    this.storage.get('member').then(val=>this.nom=val['name']);
  }




  LogOut()
  {
    this.storage.clear();
    this.navCtrl.setRoot(HomePage);
  }


 

  goToProjectForm()
  {
    this.navCtrl.push(ProjectRegisterPage);
  }

  IrAProyectos()
  {
    var json =
    {
      id:this.id
    }
    this.navCtrl.push(ProyectosPage, json);
  }
}
/*
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import {ChatRoomPage} from '../chat-room/chat-room';

/**
 * Generated class for the PreChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
/*
@IonicPage()
@Component({
  selector: 'page-pre-chat',
  templateUrl: 'pre-chat.html',
})
export class PreChatPage {
nickname='';

  constructor(public navCtrl: NavController, public navParams: NavParams, private socket:Socket) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PreChatPage');
  }
  joinChat() {
    this.socket.connect();
    this.socket.emit('set-nickname', this.nickname);
    this.navCtrl.push('ChatRoomPage', { nickname: this.nickname });
  }

}*/



