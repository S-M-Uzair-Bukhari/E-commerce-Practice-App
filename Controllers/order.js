const orderFunction = require('../functions/order');

const createOrder = async (req,res) => {
    try {
        console.log('Getting Your Order:');

        const { user, products} = req.body;
        console.log('Request Body:', req.body);

        // if (!user || !products ) {
        //     return res.status(400).json({ error: 'Missing required fields: user, products, or totalAmount' });
        // }

        let order = await orderFunction.createOrder(req);
        res.status(200).json({msg:'Your Order is Successful', order} );
    } catch (error) {
        console.error("Having Errors:", error);
        res.status(500).json({error: "Faild To Create Order"});
    }
};

const getOrder = async (req,res) =>{

};

module.exports= {
    createOrder,
    getOrder
}