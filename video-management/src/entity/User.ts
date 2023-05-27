import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne} from "typeorm";
import { Loans } from "./Loans";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    firstName: string;

    @Column({type: 'text'})
    lastName: string;

    @Column({type: 'text'})
    phone:string;

    @Column({type: 'text'})
    personalId:string;

    @Column()
    zipCode:number;

    @Column({type: 'text'})
    city:string;

    @Column({type: 'text'})
    street:string;

    @Column()
    age: number;

    @Column({type: 'text'})
    email: string;

    @OneToMany(type => Loans, loan => loan.loaner)
    loans: Loans[];

}
