import * as express from 'express';
import { VideoController } from './controller/video.controller';
import { LoanController } from './controller/loan.controller';
import { UserController } from './controller/user.controller';
import cors from 'cors';

export function getRoutes() {
    const router = express.Router();
    const videoCtrl = new VideoController();
    const userCtrl = new UserController();
    const loanCtrl = new LoanController();
    router.use(cors());


    router.get('/api/video', videoCtrl.getAll);
    router.get('/api/video/search', videoCtrl.search);
    router.get('/api/video/:id', videoCtrl.getOne);
    router.post('/api/video', videoCtrl.create);
    router.put('/api/video', videoCtrl.update);

    router.get('/api/user', userCtrl.getAll);
    router.get('/api/user/search', userCtrl.search);
    router.get('/api/user/:id', userCtrl.getOne);
    router.post('/api/user', userCtrl.create);
    router.put('/api/user/:id', userCtrl.update);

    router.get('/api/loans', loanCtrl.getAll);
    router.get('/api/loans/:id', loanCtrl.getOne);
    router.post('/api/loans', loanCtrl.create);
    router.put('/api/loans/:id', loanCtrl.update);

    return router;
}