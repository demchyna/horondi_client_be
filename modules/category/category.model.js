const mongoose = require('mongoose');
const Language = require('../../models/Language').schema;
const ImageSet = require('../common/ImageSet').schema;

const CategorySchema = new mongoose.Schema({
  code: String,
  name: [Language],
  images: ImageSet,
  subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  ],
  isMain: Boolean,
  available: Boolean,
});

module.exports = mongoose.model('Category', CategorySchema);
