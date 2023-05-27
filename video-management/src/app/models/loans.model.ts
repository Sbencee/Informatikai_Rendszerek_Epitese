import { Video } from "./videos.model";
import { User } from "./user.model";

export interface Loans {
    id:number;
    issueDate:Date;
    dueDate:Date;
    returnDate:Date;
    status:string;
    loaners:User;
    videos:Video[];
}