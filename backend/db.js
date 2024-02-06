const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://dk00070007:Deepak0336@cluster0.n99ibbo.mongodb.net/Foodie?retryWrites=true&w=majority";


const mongoDB = async() => {

    await mongoose.connect(
        mongoURI, { useNewUrlParser: true }, async(err, result) => {
            if (err) console.log("---", err)
            else {
                console.log("Connected");
                const fetched_data = await mongoose.connection.db.collection("food_items");
                fetched_data.find({}).toArray(async function(err, data) {
                    const foodcategory = await mongoose.connection.db.collection("foodCategory");
                    foodcategory.find({}).toArray(function(err, catData) {
                        if (err) console.log(err);
                        else {
                            global.food_items = data;
                            global.foodCategory = catData;
                        }
                    })
                })

            }
        }
    );

}

module.exports = mongoDB;