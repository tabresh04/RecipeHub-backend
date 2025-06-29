const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user', 
  },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'allrecipes',
  },
  name: String,
  photo: String,
  time: String,
  description: [String],
  ingredients: [String],
  like: Number,
}, { timestamps: true });

module.exports = mongoose.model("Favourite", favouriteSchema);
