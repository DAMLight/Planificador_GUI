import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class DireccionServer {

  private headers = new Headers({'Content-Type': 'application/json; charset=utf-8;'});
  constructor(
    public http: Http
  )
  {

  }

  public UrlLocal:string='http://192.168.1.59/planificador-backend/public/';
  public UrlSendMessage= this.UrlLocal + 'proyecto/chats';
  public UrlGetMessages = this.UrlLocal + 'proyecto/chats/mensaje/';
  public UrlGetNewMessage = this.UrlLocal + 'proyecto/chats/newMensaje/';
  public UrlGetOldMessage = this.UrlLocal + 'proyecto/chats/getOldMessage';
  
  //public Url:string= 'http://192.168.250.30/planificador-backend/public/';
  public Url:string= 'http://192.168.1.59/planificador-backend/public/index.php/';

  Enviar(url, data)
  {
    return new Promise((resolve, reject) => {
      this.http.post(url,data,{headers: this.headers})
    .map(res => res.json())
    .subscribe(data =>
      {
        resolve(data);
        
      },
      error =>
      {
        console.log(data);
        reject(error);
      
      })
    });
  }

  Recibir(url)
  {
    
    return new Promise((resolve, reject) => {
        this.http.get(url,{headers: this.headers})
        .map(res=> res.json())
        .subscribe(data=>
          {
            resolve(data);
          },
          error =>
          {
            reject(error);
          })

    });
  }



}



