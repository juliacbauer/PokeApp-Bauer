import { Schema } from 'mongoose';

const wordSchema = new Schema({
  word: String,
  meanings: [{
    partOfSpeech: String,
    definitions: [{
      definition: String,
    }],
    synonyms: [String],
    antonyms: [String]
  }]
});

export default wordSchema;