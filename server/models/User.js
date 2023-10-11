const { default: mongoose}  =  require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: { type: "string", required: true},
    name: { type: "string", required: true },
    email: { type: "string", required: true},
    password: { type: "string", required: true},
    coursesPurchased: [],
    lastLogIn: { type: Date },
    preferredPayment: { type: "string" },
    cartItems: [],
    previousOrders: [],
})

const User = mongoose.model('User', userSchema)

module.exports = User;
