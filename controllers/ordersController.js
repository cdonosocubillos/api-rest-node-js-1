const Orders = require('../models/Orders');

exports.add = async(req, res, next) => {
    try {
        const order = new Orders(req.body);
        await order.save();
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
}

exports.list = async (req, res, next) => {
    try {
        const orders = await Orders.find({}) //await espera nuestro proceso.
        .populate('customer')
        .populate({
            path: 'products.product',
            model: 'Products'
        })
        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
};

exports.show = async (req, res, next) => {
    try {
        console.log(`id de la orden ${req.params.id}`);
       const order = await Orders.findById(req.params.id)
       .populate('customer')
       .populate({
           path: 'products.product',
           model: 'Products'
       });

       if (!order) {
           res.status(404).json({message: 'La orden no existe'});
           next()
       }

       res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
}

exports.update = async (req, res , next) => {
    try {
        const order = await Orders.findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
        )
        .populate('customer')
        .populate({
            path: 'products.product',
            model: 'Products'
        })
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
}

 //delete
 exports.delete = async(req, res, next) => {
    try {
        await Orders.findOneAndDelete({ _id: req.params.id});
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

exports.findByCustomer = async (req, res, next) => {
    try {
        console.log('entre al metodo')
       const order = await Orders.find({ customer: req.params.id })
       .populate('customer')
       .populate({
           path: 'products.product',
           model: 'Products'
       })
       if (!order) {
           res.status(404).json({message: 'La orden no existe'});
           next()
       }
       res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: 'Error al procesar la peticion'
        });
    }
};