db.products.insert([{title:"Remera",price:2500,url:"img1"},{title:"gorra",price:1500,url:"img2"},{title:"zapatilla",price:5000,url:"img3"},{title:"buzo",price:4500,url:"img4"},{title:"media",price:500,url:"img5"},{title:"campera",price:5000,url:"img6"},{title:"short",price:1000,url:"img7"},{title:"jean",price:4500,url:"img8"},{title:"boxer",price:700,url:"img9"},{title:"ojotas",price:1200,url:"img10"}])
db.chats.insert([{email:"test1@test.com",message:"test",date:"test"},{email:"test2@test.com",message:"test",date:"test"},{email:"test3@test.com",message:"test",date:"test"},{email:"test4@test.com",message:"test",date:"test"},{email:"test5@test.com",message:"test",date:"test"},{email:"test6@test.com",message:"test",date:"test"},{email:"test7@test.com",message:"test",date:"test"},{email:"test8@test.com",message:"test",date:"test"},{email:"test9@test.com",message:"test",date:"test"},{email:"test10@test.com",message:"test",date:"test"}])


db.products.insertOne({title:"Sandalia",price:1250,url:"img11"})
db.chats.insertOne({email:"test11@test.com",message:"test",date:"test"})

db.chats.find()
db.products.find()

db.chats.estimatedDocumentCount()
db.products.estimatedDocumentCount()

db.products.find({price: {$lt: 1000}})

db.products.find({$and: [{price: {$gte: 1000}}, {price: {$lte: 3000}}]})

db.products.find({price: {$gt: 3000}})

db.products.find({title: 1}).sort({price: 1}).limit(1).skip(2)

db.products.update({},{$set: {stock: 100}},{upsert:false,multi:true})

db.products.update({price: {$gt: 4000}},{$set: {stock: 0}},{upsert:false,multi:true})

db.products.deleteMany({price: {$lt: 1000}})

db.createUser(
    {
        user:"pepe",
        pwd:"asd456",
        roles: [
            {
                role:"read",
                db:"ecommerce"
            }
        ]
    }
)