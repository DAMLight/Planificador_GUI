
import { ProjectPage } from './../pages/project/project';
import { DireccionServer } from './../pages/global';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {FirstPage} from '../pages/first/first';
import { HttpModule } from '@angular/http';
import { RegisterPage } from '../pages/register/register';
import { Home2Page } from '../pages/home2/home2';
import { ProjectRegisterPage } from '../pages/project-register/project-register';
import {ProyectosPage} from '../pages/proyectos/proyectos';

import { IonicStorageModule } from '@ionic/storage';
import { ChatRoomPage } from '../pages/chat-room/chat-room';
import { UsersListPage} from '../pages/users-list/users-list';
import { ObjectivesListPage} from '../pages/objectives-list/objectives-list';
import { TaskListPage } from '../pages/task-list/task-list';
import { ObjetivoPage} from '../pages/objetivo/objetivo';
import { SubMenuPage } from '../pages/sub-menu/sub-menu';
import { HttpClientModule } from '@angular/common/http';
import { OneSignal } from '@ionic-native/onesignal';
import { NotificacionesProvider } from '../providers/notificaciones/notificaciones';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FirstPage,
    RegisterPage,
    Home2Page,
    ProyectosPage,
    ProjectRegisterPage,
    ChatRoomPage,
    UsersListPage,
    ObjectivesListPage,
    TaskListPage,
    ObjetivoPage,
    SubMenuPage,
    ProjectPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon: 'arrow-back',
    }),
    HttpClientModule ,
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FirstPage,
    RegisterPage,
    Home2Page,
    ProyectosPage,
    ProjectRegisterPage,
    ChatRoomPage,
    UsersListPage,
    ObjectivesListPage,
    TaskListPage,
    ObjetivoPage,
    SubMenuPage,
    ProjectPage,
    
  ],
  providers: [
    OneSignal,
    StatusBar,
    SplashScreen,
    DireccionServer,
    ChatRoomPage,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NotificacionesProvider
  ]
})
export class AppModule {}
