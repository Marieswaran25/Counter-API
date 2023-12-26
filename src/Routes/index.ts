import { Express,Router } from "express";
import view from "./view";

const router=Router();

export default ()=>{
    view(router)
    return router
}