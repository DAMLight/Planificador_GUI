import { DireccionServer } from './../global';
import { Component, ViewChild } from '@angular/core';
import { Nav, AlertController, LoadingController, NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { RegisterPage } from '../register/register'
import { Home2Page } from '../home2/home2';
import { Member } from '../register/member';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({

  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage 
{
	posts:any={};
  data:any={};
	@ViewChild('username') username;
  @ViewChild('password') password;

  loginUrl:string=this.Url.Url+'member/login';
  private headers = new Headers({'Content-Type': 'application/json; charset=utf-8;'});
  


  constructor(public Url:DireccionServer, 
    public loadingCtrl:LoadingController,
    public alertCtrl: AlertController,
     public http: Http, 
     private storage:Storage,
     public navctrl: NavController) 
  {
    
    this.storage.get('member').then(
      member=>
      {
        if(member!=null)
        {
          this.navctrl.setRoot(Home2Page);
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
        this.navctrl.setRoot(Home2Page);
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
     this.navctrl.push(RegisterPage);
  }
}
