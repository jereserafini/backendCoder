import { Router } from "express";
import getProducts from "../controllers/controllers.js";

const routes = Router()

routes.get( '/products-test', getProducts )

export default routes