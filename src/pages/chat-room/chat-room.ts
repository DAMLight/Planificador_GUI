import { DireccionServer } from './../global';
import { ProjectPage } from './../project/project';
import { Component, ViewChild } from '@angular/core';
import { PopoverController ,NavController, IonicPage, NavParams, ToastController, Content } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import {Storage} from '@ionic/storage';
import { UsersListPage} from '../users-list/users-list';
import { ObjectivesListPage} from '../objectives-list/objectives-list';
import { SubMenuPage } from '../sub-menu/sub-menu';
import { Http, Headers } from '@angular/http';
 

@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {
  public messages = [];
  nickname = '';
  message = '';
 projectId:number;
 name:string;
 leader:boolean;
 leaderId:number;
 member:any;
 private headers = new Headers({'Content-Type': 'application/json; charset=utf-8;'});

 @ViewChild('content') content:Content;
 @ViewChild('input') input;

  constructor(public Url:DireccionServer, public http:Http, private popCtrl:PopoverController, private storage:Storage, private navCtrl: NavController, private navParams: NavParams, private socket: Socket, private toastCtrl: ToastController) 
  {
    this.leader=false;
    this.nickname = this.navParams.get('nickname');
    this.name=this.navParams.get('data')['name'];
    this.leaderId=this.navParams.get('data')['leader'];
    this.storage.get('member').then(
      res=>
      {
        this.member=res;

        if(this.leaderId===this.member['id'])
        {
          this.leader=true;
          this.storage.set('leader', true);
        }
        else
        {
          this.leader=false;
          this.storage.set('leader', false);
        }

      }

    );
    this.name=this.name.toUpperCase();
    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.focus(this.input);

   
  }

  VerMensajes(id)
  {
    this.http.get(this.Url.Url+'/proyecto/chats/mensaje/'+id)
    .toPromise()
    .then(respuesta=>{this.messages=respuesta.json();
      this.scrollDown();

    });
    
  }


  verObjetivos()
  {
    this.navCtrl.push(ObjectivesListPage, {id:this.projectId, data:this.navParams.get('data')});
  }

  verEncargados()
  {
    this.navCtrl.push(UsersListPage, {id:this.projectId, data:this.navParams.get('data')});
  }

  focus(input)
  {
    setTimeout(()=>{
      this.input.setFocus();
      }, 0);
  }
 
  sendMessage(input) 
  {  
    let json=JSON.stringify({text:this.message, chat_id:this.projectId, from:this.nickname});
    console.log(json);
    this.http.post(this.Url.Url+'proyecto/chats',json ,{headers: this.headers})
    .toPromise()
    .then(
      res=>
      {
        this.socket.emit('add-message', { text: this.message });
        this.message = '';
        
        
      }
    );
    this.focus(input);

  }

 

  scrollDown()
  {
    this.content.scrollToBottom(250);
  }
 
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
    
    
    return observable;
  }
 
  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
 
  ionViewWillLeave() {
    this.socket.disconnect();
  }
 
  joinChat() 
  {
    this.socket.connect();
    this.socket.emit('set-nickname', {projectName:this.projectId, nickName:this.nickname});
  }

  ionViewDidLoad() 
  {

    this.projectId=this.navParams.get('data')['id_proyecto'];
    this.VerMensajes(this.projectId);

    this.nickname=this.navParams.get('nickName');
    this.joinChat();
    this.scrollDown();
    
  }
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  popover()
  {
    let subMenu=this.popCtrl.create(SubMenuPage,{id:this.projectId});
    subMenu.present();
  }
  
}