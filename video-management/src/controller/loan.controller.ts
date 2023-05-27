import { getRepository } from "typeorm";
import { Loans } from "../entity/Loans";
import { Controller } from "./base.controller";

export class LoanController extends Controller {
    repository = getRepository(Loans);

    
}