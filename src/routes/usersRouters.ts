import express, { NextFunction } from "express";
import { UserControler } from "../controllers/userController";

import { authorizeMiddleware, authorizeMiddlewareAdmin, isSuperAdmin } from "../middlewares/SuperAdmin";
import { artistAuth } from "../middlewares/isArtist";
import { auth } from "../middlewares/auth";
import { Appointment } from "../models/Appointment";
import { createAppointments, getAllApointments } from "../controllers/AppointmentController";


const router = express.Router();


// endpoint registro
router.post("/register",UserControler.register);

// endpoint login
router.post("/login", UserControler.login);

// endpoint ver todos los usuarios
router.get("/getall",auth,authorizeMiddlewareAdmin(["Admin"]), UserControler.getAll);

// endpoint ver  por usuario
router.get("/profile",auth,authorizeMiddleware(["Client","Artist","Admin"]), UserControler.getLogedUser);


router.put('/profile/update', UserControler.updateLogedUser);


// endpoint ver todos los artistas 
router.get("/artists/list");




// crear artistas 
router.post("/artists/create");

// eliminar 
router.delete("/artists/delete",artistAuth);








export default router;

