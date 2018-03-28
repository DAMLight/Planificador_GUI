import { Injectable } from '@angular/core';

@Injectable()
export class DireccionServer {
  public UrlOnline:string = 'ftp://home724684784.1and1-data.host/planificador-backend/public/'; 
  public UrlLocal:string='http://192.168.250.30/planificador-backend/public/';
  
  
  //public Url:string= 'http://192.168.250.30/planificador-backend/public/';
  public Url:string= 'http://prodactivos.com/planificador-backend/public/index.php/';
}



