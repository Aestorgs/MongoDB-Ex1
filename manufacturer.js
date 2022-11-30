//- Select the names of all the products in the store.
db.manufacturer.find({} , {_id : 0 , name: 1})
//- Select the names and the prices of all the products in the store.
db.manufacturer.find({} , {_id : 0 , name: 1 , price : 1})
//- Select the name of the products with a price less than or equal to $200.
db.manufacturer.aggregate([{$match:{"price" :{$lte: 200}}} , {$project : { _id:0 , name : 1 , price : 1}}])
//- Select all the products with a price between $60 and $120.
db.manufacturer.aggregate([{$match:{"price" :{$gte : 60 ,$lte: 120}}} , {$project : { _id:0 , name : 1 , price : 1}}])
//- Select the name and price in cents (i.e., the price must be multiplied by 100).
db.manufacturer.aggregate([{$project : { _id:0 , name : 1 , price : {$multiply: ["$price" , 100]}}}])
//- Compute the average price of all the products.
db.manufacturer.aggregate([{$group:{ _id:0  , price : {$avg: "$price"}}}])
//- Compute the average price of all products with manufacturer code equal to 2.
db.manufacturer.aggregate([{ $unwind : "$manufacturer" }  , {$match:{"manufacturer.code" : 2}} , {$group:{ _id:0 ,  price : {$avg: "$price"}}}])
//- Compute the number of products with a price larger than or equal to $180.
db.manufacturer.aggregate([{$match:{"price" :{$gte : 180}}} , {$project : { _id:0 , name : 1 , price : 1}}])
//- Select the name and price of all products with a price larger than or equal to $180, and sort first by price (in descending order), and then by name (in ascending order).
db.manufacturer.aggregate([{$match:{"price" :{$gte : 180}}} , { $sort: { price: 1 ,  name: -1 } } , {$project : { _id:0 , name : 1 , price : 1}}])
//- Select all the data from the products, including all the data for each product's manufacturer.
db.manufacturer.find()
//- Select the product name, price, and manufacturer name of all the products.
db.manufacturer.aggregate([{ $unwind : "$manufacturer" }  , {$project:{ _id:0 , manufacturer: "$manufacturer.name" ,  name: 1 , price : 1 }}])
//- Select the average price of each manufacturer's products, showing only the manufacturer's code.
db.manufacturer.aggregate([{ $unwind : "$manufacturer" } ,{$group:{ _id:"$manufacturer.code", price : {$avg: "$price"}}}])
//- Select the average price of each manufacturer's products, showing the manufacturer's name.
db.manufacturer.aggregate([{ $unwind : "$manufacturer" } ,{$group:{ _id:"$manufacturer.name", price : {$avg: "$price"}}}])
//- Select the names of manufacturer whose products have an average price larger than or equal to $150.
db.manufacturer.aggregate([{ $unwind : "$manufacturer" } , {$match:{"price" :{$gte: 150}}} , {$project : { _id:0 , name : '$manufacturer.name' , price : "$price"}}])
//- Select the name and price of the cheapest product.
db.manufacturer.aggregate([{ $sort: { "price": 1 }}, {$limit : 1} , {$project : { _id:0 , name : 1 , price : 1}}])
//- Select the name of each manufacturer along with the name and price of its most expensive product.
db.manufacturer.aggregate([{ $unwind : "$manufacturer" } ,{ $sort: { "price": -1 }}, {$limit: 1} ,{$project : { _id:0 ,name: 1  ,manufacturer : "$manufacturer.name", price : 1}}])
//- Add a new product: Loudspeakers, $70, manufacturer 2.
db.manufacturer.insert({code : 2 , name: 'Loudspeakers' , price: 70})
//- Update the name of product 8 to "Laser Printer".
db.manufacturer.updateOne({_id: ObjectId("638779c5e8dcfb771d87ad83")}, {$set:{code: 8 , name: 'Laser Printer', price: 270 }})