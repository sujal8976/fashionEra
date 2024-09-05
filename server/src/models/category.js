import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  catName: {
    type: String,
    required: true,
  },
  catDescription: {
    type: String,
  },
  image: {
    type: String,
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
});

export default mongoose.model("Category", categorySchema);
