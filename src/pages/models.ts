import {Member} from './register/member';

export class Project
{
    name:string;
    benefits:string;
    comments:string;
    prev_inv:string;
    purpose:string;
    leader:number;
    begginingDate:Date;
    endDate:Date;
    objectives:Objective[];
    members:Member[];
}

export class Objective
{
    name:string;
    begginingDate:Date;
    endDate:Date;
    manager:Member;
    tasks:Task[];
}

export class Task
{
    name:string;
    manager:Member;
    
}