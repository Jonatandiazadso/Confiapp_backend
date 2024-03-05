import Menor from "../models/menor.model.js";


export const getMenores = async (req, res) => {
    const menores = await Menor.find()
    res.json(menores)
};

export const createMenor = async (req, res) => {
    try {
      // Obtén el ID del tutor autenticado desde req.user.id
      const tutorId = req.user.id;
  
      const { nombres, apellidos, tipoIdentificacion, numeroIdentificacion, edad, telefono, correo } = req.body;
  
      const newMenor = new Menor({
        tutor: tutorId, // Asocia el menor con el tutor
        nombres,
        apellidos,
        tipoIdentificacion,
        numeroIdentificacion,
        edad,
        telefono,
        correo,
      });
  
      const savedMenor = await newMenor.save();
      res.status(201).json(savedMenor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

export const getMenor = async (req, res) => {

    const menor = await Menor.findById(req.params.id)
    if (!menor) return res.status(404).json ({ message: 'Menor no encontrado'})
    res.json(menor)

};

export const updateMenor = async (req, res) => { 

    const menor = await Menor.findByIdAndDelete(req.params.id)
    if (!menor) return res.status(404).json ({ message: 'Menor no encontrado'})
    res.json(menor)

 };

export const deleteMenor = async (req, res) => {

    const menor = await Menor.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    })
    if (!menor) return res.status(404).json ({ message: 'Menor no encontrado'})
    res.json(menor)

};
