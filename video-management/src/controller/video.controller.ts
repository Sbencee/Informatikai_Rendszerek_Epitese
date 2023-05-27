import { getRepository } from "typeorm";
import { Video } from "../entity/Videos";
import { Controller } from "./base.controller";

export class VideoController extends Controller {
    repository = getRepository(Video);

    search = async (req, res) => {
        const query = req.query.search || '';
        
        try {
        const video = await this.repository.createQueryBuilder('video')
            .where("title LIKE CONCAT('%', :param, '%')", { param: query})
            .getMany();
        } catch(err) {
            res.status(500).json({message: err.message});
        }
    }
}