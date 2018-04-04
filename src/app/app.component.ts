import { NgModule,Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private oneSignal: OneSignal,
    private alertCtrl: AlertController) {
    platform.ready().then(() => 
    {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    //  this.handlerNotifications();
    });
  }

  private handlerNotifications(){
    this.oneSignal.startInit('8db98f2b-922c-41a6-89d0-e56635524b52', '131085071582');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationOpened()
    .subscribe(jsonData => {
      
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
    this.oneSignal.endInit();




    window["plugins"].OneSignal.getIds(function(ids) {
      var notificationObj = { contents: {en: "message with image"},
                        include_player_ids: [ids.userId]
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
}

