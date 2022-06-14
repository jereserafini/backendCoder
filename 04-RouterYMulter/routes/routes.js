const { Router } = require("express");

const route = Router()

let products = []

route.get( '/products', (req, res) => {
    res.json(products)
})

route.get( '/products/:id', (req, res) => {
    const {id} = req.params

    if (products.find(prod => prod.id == id)) {

        const product = products.find( prod => prod.id == id)
        res.json(product)
    
    } else {
        res.json(`El producto con el id: ${id} no existe`)
    }
})

route.post( '/products', (req, res) => {
    const { title, price, thumbnail } = req.body
    let id

    if (products.length == 0) {
        id = 1
    } else {
        id = products.length + 1
    }

    products.push({ id, title, price, thumbnail })

    res.json({ id, title, price, thumbnail })

})

route.put( '/products/:id', (req, res) => {
    const {id} = req.params

    if (products.find(prod => prod.id == id)) {

        const { title, price, thumbnail } = req.body

        products = products.filter(prod => prod.id != id)

        products.push({ id, title, price, thumbnail })

        res.json(products)
    
    } else {
        res.json(`El producto con el id: ${id} no existe`)
    }

})

route.delete( '/products/:id', (req, res) => {
    const {id} = req.params

    if (products.find(prod => prod.id == id)) {

        products = products.filter(prod => prod.id != id)
    
        res.json(products)
    
    } else {
        res.json(`El producto con el id: ${id} no existe`)
    }
})

module.exports = route