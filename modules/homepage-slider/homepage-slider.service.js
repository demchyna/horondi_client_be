const { ObjectId } = require('mongoose').Types;
const HomePageSlider = require('./homepage-slider.model');
const { deleteFiles, uploadFiles } = require('../upload/upload.service');
const {
  SLIDE_NOT_FOUND,
  SLIDE_NOT_VALID,
  IMAGE_NOT_PROVIDED,
} = require('../../error-messages/home-page-slider.messages');

class HomePageSliderService {
  async getAllSlides({ skip, limit }) {
    const items = await HomePageSlider.find()
      .sort({ show: -1, order: 1 })
      .skip(skip)
      .limit(limit);

    const count = await HomePageSlider.find().countDocuments();
    return {
      items,
      count,
    };
  }

  async getSlideById(id) {
    if (!ObjectId.isValid(id)) {
      throw new Error(SLIDE_NOT_VALID);
    }
    const foundSlide = await HomePageSlider.findById(id);
    if (foundSlide) {
      return foundSlide;
    }
    throw new Error(SLIDE_NOT_FOUND);
  }

  async addSlide(data, upload) {
    if (upload) {
      const uploadResult = await uploadFiles([upload]);
      const imageResults = await uploadResult[0];
      data.images = imageResults.fileNames;
    }
    if (!upload) {
      throw new Error(IMAGE_NOT_PROVIDED);
    }
    return await new HomePageSlider(data).save();
  }

  async updateSlide({ id, slide, upload }) {
    const slideToUpdate = await HomePageSlider.findById(id);
    if (!slideToUpdate) {
      throw new Error(SLIDE_NOT_FOUND);
    }

    if (!upload) {
      return await HomePageSlider.findByIdAndUpdate(id, slide, { new: true });
    }
    const uploadResult = await uploadFiles([upload]);

    const imageResults = await uploadResult[0];

    const images = imageResults.fileNames;

    if (!images) {
      return await HomePageSlider.findByIdAndUpdate(id, slide);
    }
    const foundSlide = await HomePageSlider.findById(id).lean();
    deleteFiles(Object.values(foundSlide.images));

    return await HomePageSlider.findByIdAndUpdate(
      id,
      {
        ...slide,
        images,
      },
      {
        new: true,
      }
    );
  }

  async deleteSlide(id) {
    const foundSlide = await HomePageSlider.findByIdAndDelete(id).lean();
    if (!foundSlide) {
      throw new Error(SLIDE_NOT_FOUND);
    }

    const deletedImages = await deleteFiles(Object.values(foundSlide.images));
    if (await Promise.allSettled(deletedImages)) {
      return foundSlide;
    }
  }
}

module.exports = new HomePageSliderService();
