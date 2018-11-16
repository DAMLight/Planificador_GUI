import { NotificacionesProvider } from './../providers/notificaciones/notificaciones';
import { NgModule,Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';
import 'rxjs/add/operator/map';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  

  constructor(platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
     public oneSignal: OneSignal,
     public chat: NotificacionesProvider
     ) {
    platform.ready().then(() => 
    {
    
      statusBar.styleDefault();
      splashScreen.hide();
      this.handlerNotifications();
    });
  }

   handlerNotifications()
  {
    let data = this.chat;
    this.oneSignal.startInit('8db98f2b-922c-41a6-89d0-e56635524b52', '131085071582')
    .handleNotificationReceived(function(jsonData) {
      console.log(JSON.stringify(jsonData.androidNotificationId));
     data.almacenarChat(jsonData.payload.additionalData);
      console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
    //  this.chat.recibirMensaje(jsonData.payload.additionalData);
      
    })
   
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationOpened()
    .subscribe(jsonData => {
      console.log("tercera cosa");
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
    this.oneSignal.endInit();
    
        

  }
}

