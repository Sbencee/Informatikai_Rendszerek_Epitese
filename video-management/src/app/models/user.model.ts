import { Loans } from "./loans.model";

export interface User {
    id:number;
    firstName:string;
    lastName:string;

    phone:string;
    personalId:string;
    zipCode:number;
    city:string;
    street:string;

    age:number;
    email:string;
}