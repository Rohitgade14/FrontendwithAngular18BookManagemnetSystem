
import { User } from './user';
export class Book {
    id:number=0;
    title:string="";
    author:string="";
    price:number=0;
    users: User[] = [];
}
