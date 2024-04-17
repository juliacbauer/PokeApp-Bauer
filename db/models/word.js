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
    audio: String,
  }],
  sourceUrls: [String],
  license: {
    name: String,
    url: String,
  },
});

export default wordSchema;