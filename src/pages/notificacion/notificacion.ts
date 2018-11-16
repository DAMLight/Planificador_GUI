import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OneSignal } from '@ionic-native/onesignal';


@IonicPage()
@Component({
  selector: 'page-notificacion',
  templateUrl: 'notificacion.html',
})
export class NotificacionPage {

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private onesignal: OneSignal) {
  }

  ionViewDidLoad() {
  
  }

    enviarNotificacion()
  {
    
  }

}
