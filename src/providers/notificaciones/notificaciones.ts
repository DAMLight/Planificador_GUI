
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class NotificacionesProvider {

  mensajes = [];
  mensaje = null;
  autocompleteObserver: any;
  constructor(public http: HttpClient,
    public storage: Storage
   ) {
     this.autocompleteObserver = Observable.create(observer => {
      this.mensaje = observer;
  });
    console.log('Hello NotificacionesProvider Provider');
  }

  
  almacenarChat(data)
  {
    this.mensajes.push(data.mensaje);
   // this.storage.set('chat'+data.id_proyect, data.mensaje);
   console.log(this.mensajes);
    console.log(data);
    console.log(typeof(data));
    this.mensaje.next(data);
   
  }

  cargarMensajes()
  {
    return this.mensajes;
  }

}
