//- Select the names of all the products in the store.
db.products.aggregate([{ $unwind : "$products" } , {$project : {  _id:0 ,  "products.name" : 1}} , {$replaceRoot :{newRoot : "$products"}}])
db.products.aggregate([{ $unwind : "$products" } , {$project : { _id:0 , name : "$products.name"}}])
//- Select the names and the prices of all the products in the store.
db.products.aggregate([{ $unwind : "$products" } ,  {$project : { _id:0 , name : "$products.name" , price : "$products.price"}}])
//- Select the name of the products with a price less than or equal to $200.
db.products.aggregate([{ $unwind : "$products" } , {$match:{"products.price" :{$lte: 200}}} , {$project : { _id:0 , name : "$products.name" , price : "$products.price"}}])
//- Select all the products with a price between $60 and $120.
db.products.aggregate([{ $unwind : "$products" } , {$match:{"products.price" :{$gte: 60 ,$lte: 120}}} , {$project : { _id:0 , name : "$products.name" , price : "$products.price"}}])
//- Select the name and price in cents (i.e., the price must be multiplied by 100).
db.products.aggregate([{ $unwind : "$products" }  , {$project : { _id:0 , name : "$products.name" , price : {$multiply: ["$products.price" , 100]}}}])
//- Compute the average price of all the products.
db.products.aggregate([{ $unwind : "$products" }  ,  {$group:{ _id:0  , price : {$avg: "$products.price"}}}])
//- Compute the average price of all products with manufacturer code equal to 2.
db.products.aggregate([{ $unwind : "$products" }  , {$match:{code : 2}} , {$group:{ _id:0 ,  price : {$avg: "$products.price"}}}])
//- Compute the number of products with a price larger than or equal to $180.
db.products.aggregate([{ $unwind : "$products" } , {$match:{"products.price" :{$gte: 180}}} , {$project : { _id:0 , name : "$products.name" , price : "$products.price"}}])
//- Select the name and price of all products with a price larger than or equal to $180, and sort first by price (in descending order), and then by name (in ascending order).
db.products.aggregate([{ $unwind : "$products" } , {$match:{"products.price" :{$gte: 180}}} , { $sort: { "products.price": 1 ,  "products.name": -1 } } , {$project : { _id:0 , name : "$products.name" , price : "$products.price"}}])
//- Select all the data from the products, including all the data for each product's manufacturer.
db.products.find()
//- Select the product name, price, and manufacturer name of all the products.
db.products.aggregate([{ $unwind : "$products" }  , {$project : { _id:0 , code : 1, name : 1 , products: "$products.name" , price : "$products.price" }}])
//- Select the average price of each manufacturer's products, showing only the manufacturer's code.
db.products.aggregate([{ $unwind : "$products" } ,{$group:{ _id:"$code"   , price : {$avg: "$products.price"}}}])
//- Select the average price of each manufacturer's products, showing the manufacturer's name.
db.products.aggregate([{ $unwind : "$products" } ,{$group:{ _id:"$name"   , price : {$avg: "$products.price"}}}])
//- Select the names of manufacturer whose products have an average price larger than or equal to $150.
db.products.aggregate([{ $unwind : "$products" } , {$match:{"products.price" :{$gte: 150}}} , {$project : { _id:0 , name : 1 , price : "$products.price"}}])
//- Select the name and price of the cheapest product.
db.products.aggregate([{ $unwind : "$products" } , { $sort: { "products.price": 1 }}, {$limit : 1} , {$project : { _id:0 , name : "$products.name" , price : "$products.price"}}])
//- Select the name of each manufacturer along with the name and price of its most expensive product.
db.products.aggregate([{ $unwind : "$products" } ,{ $sort: { "products.price": -1 }}, {$limit: 1} ,{$project : { _id:0 ,name: 1 ,  products : "$products.name" , price : "$products.price"}}])
//- Add a new product: Loudspeakers, $70, manufacturer 2.
db.products.updateOne({_id: ObjectId("6385e9197176f905fd113eec")}, {$push : {products: {code : 2 , name: 'Loudspeakers' , price: 70}}})
//- Update the name of product 8 to "Laser Printer".
db.products.updateOne({_id: ObjectId("6385e9197176f905fd113ee7")}, {$set : {products: { code: 8, name: 'Laser Printer', price: 270 }}})