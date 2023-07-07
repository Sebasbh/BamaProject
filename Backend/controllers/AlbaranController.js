//importamos el metodo
import AlbaranModel from "../models/AlbaranModel.js";

// Metodos para el CRUD

//Mostrar todos los Albarans

export const getAllAlbaranes = async(req, res) =>{
   try {
      const Albarans = await AlbaranModel.find()
      res.status(200).json(Albarans)

   }catch (error){
      res.json ({message: error.message})
   }
} 


//Mostrar un Albaran

export const getAlbaran = async(req, res) =>{
   try {
      const id = req.params.id
      await AlbaranModel.findById( {_id:id}).then ( (Albaran) => {
         res.status(200).json(Albaran)
      })  
   }catch (error){
      res.json ({message: error.message})
   }
} 

//Crear un Albaran

export const createAlbaran = async (req,res) => {
   try {
      await AlbaranModel.create(req.body)
      res.status(200).json({
         "message":"¡Albaran creado correctamente"
      })
   } catch (error) {
      res.json ({message: error.message})
   }
}

//Actualizar un Albaran

export const updateAlbaran= async (req,res) => {
   try {
      const id = req.params.id

      await AlbaranModel.updateOne( {_id:id}, req.body).then(res =>{
         console.log(res)
      })
      res.status(200).json({
         "message":"¡Albaran actualizado correctamente!"
      })
   } catch (error) {
      res.json({message: error.message})
   }
}

//Eliminar un Albaran

export const deleteAlbaran = async(req, res) => {
   try {
      const id = req.params.id
      await AlbaranModel.deleteOne ({_id:id}).then (res =>{
         console.log(res)
      })
      res.status(200).json({
         "message":"¡ Albaran eliminado correctamente!"
      })
      
   } catch (error) {
      res.json({message: error.message}) 
   }
}
