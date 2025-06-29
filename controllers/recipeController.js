//local modules
const recipeSchema = require('../models/recipeSchema');
const Favourite = require('../models/favouriteSchema');
const userSchema = require('../models/userSchema');

exports.getRecipes = async (req, res) => {
  try {
    const allRecipes = await recipeSchema.find();
    return res.json(allRecipes);
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getRecipe = async (req, res) => {
  try {
    const id = req.params.id;
    const recipe = await recipeSchema.findById(id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    return res.json(recipe);
  } catch (err) {
    console.error("Error fetching recipe:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getYourRecipes = async (req, res) => {
  try {
    const userId = req.params.userId;
    const recipes = await recipeSchema.find({ userId });
    if (!recipes) return res.status(404).json({ error: "Recipes not found" });
    return res.json(recipes);
  } catch (err) {
    console.error("Error fetching recipe:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await userSchema.find(); // or use: User.find();
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error while fetching users" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) return res.status(400).json({ error: "User ID not provided" });

    const deleteRecipes = await recipeSchema.findByIdAndDelete(userId); // delete users recipes
    const deletedUser = await userSchema.findByIdAndDelete(userId); // delete user 
    if (!deletedUser && !deleteRecipes) return res.status(404).json({ error: "User not found" });

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ error: "Server error while deleting user" });
  }
};


exports.addRecipe = async (req, res) => {
    try {
        const { name, ingredients, description, time, like, photo, userId } = req.body;

        const newRecipe = await recipeSchema.create({
            name,
            ingredients: Array.isArray(ingredients)
                ? ingredients
                : ingredients.split(',').map(i => i.trim()),

            description: Array.isArray(description)
                ? description
                : description.split(',').map(d => d.trim()),

            time,
            like,
            photo,
            userId
        });

        return res.status(201).json(newRecipe);
    } catch (err) {
        console.error("Error creating recipe:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};



exports.editRecipe = async (req, res) => {
  const { name, ingredients, description, time, like, photo } = req.body;
  const recipe = await recipeSchema.findById(req.params.id);
  if (recipe) {
    await recipeSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json({ name, ingredients, description, time, like, photo });
  }
  else {
    console.log("recipe not found")
  }
}

exports.deleteRecipe = async (req, res) => {
  const recipe = await recipeSchema.findById(req.params.id);
  if (recipe) {
    await recipeSchema.findByIdAndDelete(req.params.id);
  }
  else {
    console.log("recipe not found")
  }
}

exports.addFavourite = async (req, res) => {

  const { userId, recipeId, name, photo, time, description, ingredients, like } = req.body;

  try {
    const alreadyExists = await Favourite.findOne({ userId, recipeId });
    if (alreadyExists) {
      return res.status(409).json({ error: "Already added to favourites" });
    }

    const fav = new Favourite({
      userId,
      recipeId,
      name,
      photo,
      time,
      description,
      ingredients,
      like
    });

    await fav.save();
    res.status(201).json({ message: "Recipe added to favourites", fav });
  } catch (err) {
    console.error("Error adding to favourites:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getFavourites = async (req, res) => {
  const userId = req.params.userId;

  try {
    const favs = await Favourite.find({ userId });
    if (!favs.length) return res.status(404).json({ error: "No favourites found" });

    res.json(favs);
  } catch (err) {
    console.error("Error fetching favourites:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteFav = async (req, res) => {
  try{
    const recipeId = req.params.recipeId;
    if(!recipeId) return res.json({error: "Recipe not found"});
    await Favourite.findByIdAndDelete( recipeId );
  }catch(err){
    res.json({error: err})
  }
}


exports.incLike = async (req, res) => {
  try {
    const recipe = await recipeSchema.findById(req.params.id);
    if (!recipe) return res.status(404).send("Recipe not found");

    recipe.like += 1;
    await recipe.save();

  } catch (err) {
    console.log(err);
    res.status(500);
  }
}