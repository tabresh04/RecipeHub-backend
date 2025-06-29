const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  description: {
    type: [String],
    required: true
  },
  time: {
    type: String,
    required: true
  },
  like: {
    type: Number,
    default: 0
  },
  photo: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("allRecipes", recipeSchema);
