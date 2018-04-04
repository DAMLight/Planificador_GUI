import { DireccionServer } from './../global';
import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { RegisterPage } from '../register/register'
import { Home2Page } from '../home2/home2';
import { Member } from '../register/member';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { OneSignal } from '@ionic-native/onesignal';

@Component({

  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{
  a:string;
	posts:any={};
  data:any={};
	@ViewChild('username') username;
  @ViewChild('password') password;
  loginUrl:string=this.Url.Url+'member/login';
  private headers = new Headers({'Content-Type': 'application/json; charset=utf-8;'});
  


  constructor(public notificacion: OneSignal ,public Url:DireccionServer, public loadingCtrl:LoadingController,public navCtrl: NavController, public alertCtrl: AlertController, public http: Http, private storage:Storage, private oneSignal: OneSignal) 
  {
    this.storage.get('member').then(
      member=>
      {
        if(member!=null)
        {
         // this.navCtrl.setRoot(Home2Page);
        }
      }

    );
  }

  ionViewDidLoad()
  {
    

  }

  Login()
  {
    var datos =
    {
      username:this.username.value,
      password:this.password.value
    }

    this.LoginMember(datos);
  }
  
  objetenerTag(){

    
    //window['plugins'].OneSignal.getIds((ids)=>this.a=JSON.stringify(ids));
    
   /* window['plugins'].OneSignal.setEmail("coco@hotmail.com", function() {
      console.log("Successfully set email");
  }, function(error) {
      alert("Encountered an error setting email: \n" + JSON.stringify(error, null, 2));
  });
   alert("Email synced");*/ // para asignar un correo
   window["plugins"].OneSignal.getIdsAvailable((ids)=>this.a=JSON.stringify(ids));
  //window["plugins"].OneSignal.getEmail((email)=>this.a=JSON.stringify(email));
     // window['plugins'].OneSignal.getTags((tags)=>this.a=JSON.stringify(tags)); //si funciona
  }

  borrarTag(){
      this.notificacion.deleteTags(["key", "another_key"]); //si funciona
  }

  asignarTag()
  {
    this.notificacion.sendTags({key: "hola",another_key: "hola4"}); //si funciona
    
   window["plugins"].OneSignal.getIds(function(ids) {
      var notificationObj = { contents: {en: "message with image"},
                          include_email_tokens: [ids.userId],

                     



                        big_picture: "https://cdn.pixabay.com/photo/2017/09/16/16/09/sea-2755908_960_720.jpg",
                        
                        ios_attachments: {id1: "https://cdn.pixabay.com/photo/2017/09/16/16/09/sea-2755908_960_720.jpg"}
                        };

      window["plugins"].OneSignal.postNotification(notificationObj,
        function(successResponse) {
            console.log("Notification Post Success:", successResponse);
        },
        function (failedResponse) {
            console.log("Notification Post Failed: ", failedResponse);
            alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
        }
      );
  });


  }


  LoginMember(member:any)
  {
    let loader = this.loadingCtrl.create({
      content: "Espera.."
    });
    loader.present();
    return this.http
    .post(this.loginUrl, JSON.stringify(member), {headers: this.headers})
    .toPromise()
    .then(res => 
      { 
        this.Handle(res);
        loader.dismiss();
      })
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> 
  {
	console.error('An error occurred', error); 
	return Promise.reject(error.message || error);
  }


  Handle(res:any)
  {
    if(res.status===200)
    {
        this.storage.set('member', res.json());
        this.navCtrl.setRoot(Home2Page);
    }
    else if(res.status===210)
    {
      let alert = this.alertCtrl.create
      ({
        title: 'Error',
        subTitle:res.json()['error'],
        buttons: ['Ok']
      });
      alert.present();
    }
    /*else if(res.status===209)
    {
      let alert = this.alertCtrl.create
      ({
        title: 'Error',
        subTitle: 'El nombre de usuario, correo o teléfono que has ingresado, ya están ocupados, por favor ingresa los datos nuevamente.',
        buttons: ['Ok']
      });
      alert.present();
    }*/
  }
  GoToRegister()
  {
     this.navCtrl.push(RegisterPage);
  }
}
