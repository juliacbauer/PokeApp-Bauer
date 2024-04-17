import { Schema } from 'mongoose';

const wordSchema = new Schema({
  word: String,
  phonetic: String,
  meanings: [{  
    partOfSpeech: String,
    definitions: [String],
    synonyms: [String],
    antonyms: [String]
  }],
  phonetics: [{
    text: String,
  }],
});

export default wordSchema;