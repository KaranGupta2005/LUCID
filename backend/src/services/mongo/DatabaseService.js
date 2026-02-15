import mongoose from 'mongoose';

export class DatabaseService {
  async create(model, data) {
    const document = new model(data);
    return await document.save();
  }

  async findById(model, id) {
    return await model.findById(id);
  }

  async findOne(model, query) {
    return await model.findOne(query);
  }

  async findMany(model, query, options = {}) {
    return await model.find(query, null, options);
  }

  async update(model, id, data) {
    return await model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(model, id) {
    return await model.findByIdAndDelete(id);
  }
}
