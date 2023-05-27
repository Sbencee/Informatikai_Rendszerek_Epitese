import { getRepository } from "typeorm";
import { User } from "../entity/User";
import { Controller } from "./base.controller";

export class UserController extends Controller {
    repository = getRepository(User);

    search = async (req, res) => {
        const query = req.query.search || '';
        
        try {
        const user = await this.repository.createQueryBuilder('user')
            .where("title LIKE CONCAT('%', :param, '%')", { param: query})
            .getMany();
        } catch(err) {
            res.status(500).json({message: err.message});
        }
    }
    
}