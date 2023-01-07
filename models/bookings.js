/*Load Mongoose module */
const mongoose = require("mongoose");

/*Create database schema as an instance of Mongoose schema */
const bookingSchema = new mongoose.Schema({
  licenseNumber: String,
  initialCost: String,
  customerNotes: String,
  category: String,
  bookingDate: String,
  bookingStatus: String,
  mechanicAssigned: String,
  userDetail: {
    firstName: String,
    lastName: String,
    address: String,
    email: String,
    phoneNumber: String,
  },
  vehicleDetail: {
    make: String,
    model: String,
    engineType: String,
    engineSize: String,
  },
  paymentDetail: {
    paypal: Boolean,
    stripe: Boolean,
    creditCard: Boolean,
    creditCardNumber: String,
  },
  registeredUserData: {
    name: String,
    email: String,
  },
  additionalParts: [
    {
      name: String,
      price: String,
      manufacturer: String
    }
  ]
});

bookingSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Booking", bookingSchema);

/*Mongoose is an Object Document Mapper (ODM) that translates MongoDB documents into program objects, 
thereby making data access and manipulation in MongoDB easier. Mongoose also employs a principle called 
Object Relational Mapping (ORM or O/RM). This principle is based on having strict models or schemas. 
You have to define your schema structure, unlike in the case of MongoDB, which doesn't need any fixed schema. 
You can insert or update as per your requirements.*/