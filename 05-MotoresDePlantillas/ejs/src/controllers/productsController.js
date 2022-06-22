let products = [];

const postProuct = (req, res) => {
    try {
        const { title, price, thumbnail } = req.body;
        let id;

        if (title !== '' && price !== '' && thumbnail !== '') {        
        (products.length == 0) ? (id = 1) : (id = products[products.length - 1].id + 1);
        
        products.push({ id, title, price, thumbnail });
    
        res.redirect('/products')
        } else {
        console.log('Complete all camps')
        }
    } catch (error) {
        res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ error: error.message });
    }  
}

const getProduct = (req, res) => {
    try {
        let hasAny
        if (products.length >0) {
        hasAny = true
        } else {
        hasAny = false
        }
        res.render('products.ejs', {products, hasAny})
    } catch (error) {
        res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ error: error.message });
    }
}

const getHome = (req, res) => {
    try {
      res.render('main.ejs')
    } catch (error) {
      res
      .status(error.statusCode ? error.statusCode : 500)
      .json({ error: error.message });
    }
}

module.exports ={
    postProuct,
    getProduct,
    getHome
}