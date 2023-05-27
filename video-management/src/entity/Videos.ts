import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Loans } from "./Loans";

@Entity()
export class Video{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text'})
    isan: string;

    @Column({type: 'text'})
    title: string;

    @Column({type: 'text'})
    author: string;

    @Column()
    stock: number;

    @Column({type: 'text', nullable: true})
    imgUrl: string;

    @Column({type: 'text'})
    types: string;

    @ManyToMany(type => Loans, loan => loan.videos)
    loan: Loans[];
}