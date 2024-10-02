import { Activity } from './activities';
import { Task } from './task';
import { Opportunities } from './opportunities';
import { Notes } from './notes';

export const contactStatusList: any[] = [
  'Employee',
  'Trainee',
  'Intern'
];

export type ContactStatus = (typeof contactStatusList)[number];

type State = {
    stateShort: string;
};

export interface ContactBase {
  address: string;
  firstName: string;
  lastName: string;
  position: string;
  manager: string;
  company: string;
  phoneNumber: string;
  email: string;
  image: string;
  userName: string;
  country: string;
  birthDate: Date;
  hiredDate: Date;
  department: string;
  salaried: boolean;
  status: string;
  passwordHash: string;
  city:string;
  state: string,
  imagePath?:any,
}

export interface Contact extends ContactBase {
  id: string,
  name: string,

  company: string,
  notes:Notes[],
  activities: Activity[],
  zipCode: number
  opportunities: Opportunities,
  tasks: Task[],
  Role?:string
  token?:string
}


export const newContact: ContactBase = {
  firstName: '',
  lastName: '',
  position: '',
  manager: '',
  company: '',
  phoneNumber: '',
  email: '',
  image: '',
  address: '',
  userName:'',
  country:'',
  birthDate: new Date(),
  hiredDate: new Date(),
  department:'',
  salaried:false,
  status:'',
  passwordHash:'',
  city:'',
  state: '',
}
export interface MailData{
  emails:any[],
    subject:'',
    message:'',
}
