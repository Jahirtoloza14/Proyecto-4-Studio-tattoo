import { Request, Response } from "express";
import { Appointment } from "../models/Appointment";
export const createAppointments = async (req: Request, res: Response) => {
    try {
        const title = req.body.title;
        const user_id = req.body.user_id;
        const artist_id = req.body.artist_id;
        const start_time = req.body.start_time;
        const end_time = req.body.end_time;
      const location= req.body.location
        
    
        const newTattoo = await Appointment.create({
          title: title,
          user_id: user_id,
          artist_id: artist_id,
          start_time: start_time,
          end_time: end_time,
         location: location
          
        }).save();
    
        return res.json({
          success: true,
          message: "appointment created succesfully",
          data: newTattoo,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "appointment can't be created",
          error: error,
        });
      }

      
    };
    export const  getAllApointments= async (req:Request,res:Response) =>{
      try {
          const page = Number(req.query.page) || 1;
          const limit = Number(req.query.limit) || 10;

          const [jobdates,totalJobdates] = await Appointment.findAndCount(
              {
                  select:{
                    title: true,
                    user_id: true,
                    artist_id: true,
                    start_time: true,
                    end_time: true,
                   location: true
                  }
              }
          );
          
          res.json(jobdates);

      }catch(error){
          res.status(500).json({message:"Something went wrong"});
      }
  } ;
  export const update = async (req:Request,res:Response) =>{
    try {
        const id = Number(req.params.id);
        const {user_id,title,artist_id,start_time,end_time,location} = req.body;
        const appointmentDate = await Appointment.findOne({where:{id:id}});
            
        if(!appointmentDate){
            res.status(404).json({message:"Jobdate not found"});
            return;
        }
        appointmentDate.title = title;
        appointmentDate.user_id = user_id;
        appointmentDate.artist_id = artist_id;
        appointmentDate.start_time = start_time;
        appointmentDate.end_time = end_time;
        appointmentDate.location = location;

        await appointmentDate.save();
        res.json(appointmentDate);
    }catch(error){
        res.status(500).json({message:"Something went wrong"});
    }
};

export const deleteAppointment= async (req:Request,res:Response)=>{
  try {
      const id = Number(req.params.id);
      const appointmentDate = await Appointment.findOne({where:{id:id}});
      if(!appointmentDate){
          res.status(404).json({message:"Jobdate not found"});
          return;
      }
      await appointmentDate.remove();
      res.json({message:"Jobdate deleted"});
  }catch(error){
      res.status(500).json({message:"Something went wrong"});
  }
}