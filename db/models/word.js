import { Schema } from 'mongoose';

const wordSchema = new Schema({
  word: String,
  meanings: [{
    partOfSpeech: String,
    definitions: [String],
    synonyms: [String],
    antonyms: [String],
  }],
});

export default wordSchema;