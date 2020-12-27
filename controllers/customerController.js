const Customers = require('../models/Customers');

// getAll
exports.list = async (req, res) => {
    try {
        const customers = await Customers.find({}); //await espera nuestro proceso.
        res.json(customers);
    } catch (error) {
        console.log(error);
        res.send(error);
        next();
    }
};

//add
exports.add = async(req, res, next) => {
    const customer = new Customers(req.body);
    try {
        await Customers.save();
        res.json({ message: 'Nuevo cliente agregado'})
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            res.status(400).json({
                message: `El cliente con el correo: ${req.body.email}, ya existe en la bdd`
            });
        }
        res.send(error);
        next();
    }
};

//find by id
exports.show = async(req, res, next) => {
   
    try {
        const customer = await Customers.findById(req.params.id);
        if(!customer){
            res.status(404).json({
                message: 'El cliente no existe'
            });
        }
        res.json(customer);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
};

//update
exports.update = async(req, res, next) => {
     try {
         const customer = await Customers.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
         res.status(200).json({
             message: 'Cliente modificado correctamente'
         })
     } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                message: `El correo ingresado ya existe en la bdd: ${req.body.email}`
            });
        }
        console.log(error);
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
     }
 };

 //delete
exports.delete = async(req, res, next) => {
    try {
        await Customers.findOneAndDelete({ _id: req.params.id});
        res.status(200).json({
            message: 'Eliminado Correctamente'
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
};