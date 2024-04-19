import { Schema } from 'mongoose';

const wordSchema = new Schema({
  word: String,
  //phonetic: String,
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