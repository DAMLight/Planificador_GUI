import { NotificacionesProvider } from './../../providers/notificaciones/notificaciones';
import { DireccionServer } from './../global';
import { ProjectPage } from './../project/project';
import { Component,NgZone , ViewChild, ChangeDetectorRef  } from '@angular/core';
import { PopoverController ,App, NavController, IonicPage, NavParams, ToastController, Content } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Observable  } from 'rxjs';
import {Storage} from '@ionic/storage';
import { UsersListPage} from '../users-list/users-list';
import { ObjectivesListPage} from '../objectives-list/objectives-list';
import { SubMenuPage } from '../sub-menu/sub-menu';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/interval';
import { Subscription } from "rxjs/Subscription";
 
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
  ultimoMensaje:number;
  primerMensaje:number;
  skipMessage = 10;
  MensajeNuevo: Subscription;
  estadoMensaje: String;

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
   
    /* this.notificacion.autocompleteObserver.subscribe((data) =>{
      ngZone.run(()=>
      {
      //  this.recibirMensaje(data);
      })
     
    }); */
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
    
  }

  VerMensajes(id)
  {
    this.global.Recibir (this.global.UrlGetMessages+id)
    .then(result =>{
      this.asignarMensajes(result)
      .then(res =>
        { 
            this.scrollDown(0);
            this.MensajeNuevo = Observable.interval(1500).subscribe(()=>{
            this.recibirMensajeNuevo();
            });
          
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
      if(Object.keys(mensajes).length>0)
      {
        this.messages= mensajes as Array<any>;
        this.primerMensaje = this.messages[0]['id'];
        this.ultimoMensaje = this.messages[this.messages.length - 1]['id'];
        resolve("asignados");

      }else
      resolve("no hay mensajes");
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
    this.input.setFocus();
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

  recibirMensajeNuevo()
  {
    this.global.Recibir(this.global.UrlGetNewMessage+this.projectId)
    .then(data =>
      {
        
          if(this.ultimoMensaje < data['id'])
          {
            let scrollbot = false;
            if(this.scrollEnFooter())
            {
              this.messages.push(data);
              this.scrollDown(300);
            }else
            this.messages.push(data);
               
            this.ultimoMensaje = data['id'];
            
          }
      })
  }


  scrollEnFooter()
  {
    let posicionScroll = (this.content.getContentDimensions().scrollHeight) - (this.content.scrollTop);
      if(posicionScroll < 360)
          return true;
        else
    return false
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
    this.MensajeNuevo.unsubscribe();
  }
 
  joinChat() 
  {
  /*   this.socket.connect();
    this.socket.emit('set-nickname', {projectName:this.projectId, nickName:this.nickname}); */
  }

  ionViewDidLoad() 
  {
    
  

  }

  cargarMensajesAnteriores(infiniteScroll)
  {
    
    console.log(this.skipMessage);
    this.global.Enviar(this.global.UrlGetOldMessage,
      {
        id:this.projectId,
        skip: this.skipMessage
      })
      .then(data=>
      {
        this.skipMessage +=5;
        let max =  Object.keys(data).length;

        if(max>0)
      { 
          setTimeout(() => {
          console.log(this.content.getContentDimensions());
          
          for(let i = max-1; i >= 0; i--)
          {
            this.messages.unshift(data[i]);    
          }
          console.log(this.primerMensaje);
          
          this.primerMensaje = data[0]['id'];
          infiniteScroll.complete();
          },500);
          
      }else
      infiniteScroll.complete();
      })

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