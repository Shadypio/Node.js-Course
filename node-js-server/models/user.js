const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	cart: {
		items: [
			{
				productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
				quantity: { type: Number, required: true },
			},
		],
	},
});

// this is used to create a method that can be used by all instances of the model
userSchema.methods.addToCart = function (product) {
	const cartProductIndex = this.cart.items.findIndex(cp => {
		return cp.productId.toString() === product._id.toString();
	});
	let newQuantity = 1;
	const updatedCartItems = [...this.cart.items];

	if (cartProductIndex >= 0) {
		newQuantity = this.cart.items[cartProductIndex].quantity + 1;
		updatedCartItems[cartProductIndex].quantity = newQuantity;
	} else {
		updatedCartItems.push({
			productId: product._id,
			quantity: newQuantity,
		});
	}
	const updatedCart = {
		items: updatedCartItems,
	};
	this.cart = updatedCart;
	return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
	console.log(productId);
	const updatedCartItems = this.cart.items.filter(item => {
		return item.productId.toString() !== productId.toString();
	});
	this.cart.items = updatedCartItems;
	return this.save();
};

userSchema.methods.clearCart = function () {
	this.cart = { items: [] };
	return this.save();
};

module.exports = mongoose.model("User", userSchema);

/* const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const ObjectId = mongodb.ObjectId;

class User {

	getOrders() {
		const db = getDb();
		return db
			.collection("orders")
			.find({ "user._id": new ObjectId(this._id) })
			.toArray();
	}

	static findById(userId) {
		const db = getDb();
		return db
			.collection("users")
			.findOne({ _id: new ObjectId(userId) })
			.then(user => {
				console.log(user);
				return user;
			})
			.catch(err => {
				console.log(err);
			});
	}
}

module.exports = User;
 */
