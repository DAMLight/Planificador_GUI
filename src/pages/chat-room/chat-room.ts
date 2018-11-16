import { NotificacionesProvider } from './../../providers/notificaciones/notificaciones';
import { DireccionServer } from './../global';
import { ProjectPage } from './../project/project';
import { Component,NgZone , ViewChild, ChangeDetectorRef  } from '@angular/core';
import { PopoverController ,App, NavController, IonicPage, NavParams, ToastController, Content } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Storage} from '@ionic/storage';
import { UsersListPage} from '../users-list/users-list';
import { ObjectivesListPage} from '../objectives-list/objectives-list';
import { SubMenuPage } from '../sub-menu/sub-menu';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Injectable()
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
 cargado:boolean;
 private headers = new Headers({'Content-Type': 'application/json; charset=utf-8;'});

 @ViewChild('content') content:Content;
 @ViewChild('input') input;

  constructor(public global :DireccionServer, 
    public http:Http,
    private popCtrl:PopoverController, 
    private storage:Storage, 
    private navCtrl: NavController, 
    private navParams: NavParams,
    private toastCtrl: ToastController,
    private cdRef : ChangeDetectorRef,
    public app: App,
    public notificacion: NotificacionesProvider,
    public ngZone: NgZone) 
  {
   
    this.notificacion.autocompleteObserver.subscribe((data) =>{
      ngZone.run(()=>
      {
        this.recibirMensaje(data);
      })
     
    });
    this.cargado = false;
    this.nickname = this.navParams.get('nickname');
    this.projectId=this.navParams.get('data')['id_proyecto'];
    this.VerMensajes(this.projectId);

    this.leader=false;
    
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
 /*    this.getMessages().subscribe(message => {
      this.messages.push(message);
    }); */
   
  }

  VerMensajes(id)
  {
    this.global.Recibir (this.global.UrlGetMessage+id)
    .then(result =>{
      this.asignarMensajes(result)
      .then(res =>
        {
          console.log(res);
          
        })    
    },
    reject =>
    {
      console.log(reject)
    })
  
    
  }

  asignarMensajes(mensajes)
  {
    return new Promise((resolve, reject)=>
    {
      this.messages= mensajes as Array<any>;
      resolve("asignados");
    })
  }


  verObjetivos()
  {
    this.navCtrl.push(ObjectivesListPage, {id:this.projectId, data:this.navParams.get('data')});
  }

  verEncargados()
  {
    this.navCtrl.push(UsersListPage, {id:this.projectId, data:this.navParams.get('data')});
  }

  
  sendMessage() 
  {  
    //this.input.setFocus();
    this.global.Enviar(this.global.UrlSendMessage,
      JSON.stringify({text:this.message, 
        chat_id:this.projectId, 
        from:this.nickname}))
        .then(result =>
          {
            console.log(result);
            this.messages.push({chat:this.projectId, from:this.nickname,text: this.message});
            this.message='';
            
           this.scrollDown(300);
          },
          error=>
          {
            console.log(error);
          })
  }

  recibirMensaje(mensaje)
  {
 
    this.messages.push({chat: mensaje.chat, from: mensaje.from ,text: mensaje.text});
    this.scrollDown(300);
  }




  scrollDown(tiempo)
  {
    this.cargado = true;
    this.cdRef.detectChanges();  
    let contentEnd = document.getElementById("end").offsetTop;
   
    this.content.scrollTo(0,contentEnd,tiempo);
  
  }
 

 
  getUsers() {
  /*   let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable; */
  }
 
  ionViewWillLeave() {
    
  }
 
  joinChat() 
  {
  /*   this.socket.connect();
    this.socket.emit('set-nickname', {projectName:this.projectId, nickName:this.nickname}); */
  }

  ionViewDidLoad() 
  {
    
    this.content.ionScroll.subscribe((data)=>{
      console.log("termino")
      console.log(data);
    });
    console.log(this.nickname);

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