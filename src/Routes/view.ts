import { Router } from "express";
import { ViewController } from "../controllers/viewController";


const View_Controller={...ViewController()}

export default (router:Router)=>{
    router.get('/sites',View_Controller.getAllSites)
    router.post('/sites',View_Controller.createSite)
    router.get('/sites/:id',View_Controller.getSitesById)
    router.patch('/sites/:key',View_Controller.updateViewByKey)
}
