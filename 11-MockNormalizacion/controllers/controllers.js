import { request, response } from "express";
import { faker } from '@faker-js/faker';

const getProductsTest = ( req = request, res = response ) => {
    try {
        const products = []

        for (let i = 1; i <= 5; i++) {
            products.push({
                id: i,
                title: faker.commerce.productName(),
                price: faker.finance.amount(500, 10000)
            })
        }

        products.map(element => {
            element.url = faker.image.imageUrl(320, 240, element.title, true)
        })

        res.render( "main.hbs", {layout: "products.hbs", products} )

    } catch (error) {
        res
        .status(error.statusCode ? error.statusCode : 500)
        .json({ error: error.message });
    }
}

export default getProductsTest