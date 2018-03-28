import { DireccionServer } from './../global';
import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController,  } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { Member } from './member';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'page-home',
  templateUrl: 'register.html'
})
 export class RegisterPage 
{
	url:string=this.Url.Url+'addmember';
	Registro : FormGroup;
	member:Member=new Member();
	data:any={};
	private headers = new Headers({'Content-Type': 'application/json; charset=utf-8;'});
	@ViewChild('email') email;
	@ViewChild('password2') password2;
	@ViewChild('username') username;
	@ViewChild('password') password;
	@ViewChild('nombre') nombre;
	@ViewChild('apellido') apellido;
	@ViewChild('telefono') telefono;


  constructor(public Url:DireccionServer, public navCtrl: NavController, public alertCtrl: AlertController, private http: Http, public FB : FormBuilder) 
  {
	  this.Registro=this.createMyForm();
	  this.member=
	  {
		  id:null,
		  name:'',
		  username:'',
		  lastname:'',
		  email:'',
		  phonenumber:'',
		  password:'',
		  api_token:''
	  }
  }


  ionViewDidLoad()
  {
	console.log('inicio');
  }

  public DOtro()
  {
  	return this.password.value;
  }

  private createMyForm()
  {
	  return this.FB.group
	  ({
	    nombre: ['', [Validators.minLength(2), Validators.required]],
	    apellido: ['', Validators.required],
	    usuario: ['', Validators.required],
	    email: ['', Validators.email],
	    telefono: ['', Validators.required],
	    password: ['', Validators.minLength(8)],
	    passwordConfirmation: ['', Validators.required]
	   });
  }

public ValidarPass()
	{
		if(this.password.value===this.password2.value)
			return true;
		else return false;
	}



  private handleError(error: any): Promise<any> 
  {
	console.error('An error occurred', error._body); // for demo purposes only
	return Promise.reject(error.message || error);
  }

  addMember(member:Member): Promise <Member>
  {
    return this.http
    .post(this.url, JSON.stringify(member), {headers: this.headers})
    .toPromise()
    .then(res => this.Handle(res.status))
    .catch(this.handleError);
  }

  Handle(res:number)
  {
	if(res===201)
	{
		let alert = this.alertCtrl.create
		({
			title: 'Registro Exitoso',
			subTitle: 'Has sido registrado correctamente, inicia sesión para acceder a tu cuenta.',
			buttons: [{
				text:'Ok',
				handler: ()=>{this.navCtrl.pop();}
			}]
		});
		alert.present();
	}
	else if(res===209)
	{
		let alert = this.alertCtrl.create
		({
			title: 'Error',
			subTitle: 'El nombre de usuario, correo o teléfono que has ingresado, ya están ocupados, por favor ingresa los datos nuevamente.',
			buttons: ['Ok']
		});
		alert.present();
	}
  }
}


