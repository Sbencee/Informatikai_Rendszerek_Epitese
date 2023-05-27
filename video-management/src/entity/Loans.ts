import { userInfo } from "os";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Video } from "./Videos";

@Entity()
export class Loans{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    issueDate: string;

    @Column({ type: 'date' })
    dueDate: string;

    @Column({ type: 'date', nullable: true })
    returnDate: string;

    @Column({ type: 'text'})
    status: string;

    @ManyToMany(type => Video, video => video.loan, {
        eager: true})
    @JoinTable()
    videos: Video[];

    @ManyToOne(type => User, user => user.loans, {
        eager: true,

    })
    loaner: User;
}