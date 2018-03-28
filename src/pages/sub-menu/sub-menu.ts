import { ProjectPage } from './../project/project';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SubMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sub-menu',
  templateUrl: 'sub-menu.html',
})
export class SubMenuPage 
{

  projectId:number;

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {
    this.projectId=this.navParams.get('id');
  }

  verProyecto()
  {
    this.navCtrl.push(ProjectPage, {id:this.projectId});
  }

}
