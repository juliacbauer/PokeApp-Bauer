import User from '../models/user'
import dbConnect from '../connection'

//get user saved vocab list
export async function getVocab(userId) {
  await dbConnect()
  const user = await User.findById(userId).lean()
  //const user = (await User.findById(userId)).toObject({flattenMaps:true})
  console.log(user.vocabularyList)
  if (!user) return null
  return JSON.parse(JSON.stringify(user.vocabularyList))
  //return user.vocabularyList
}

//add word to vocab list
export async function addToVocab(userId, word) {
  await dbConnect()
  //check for user
  const user = await User.findById(userId);
  if (!user) {
  return null
  }
  //console.log(userId, word)
  //prevent duplicate words
  const existingWord = user.vocabularyList.find(
    (vocabWord) => vocabWord.word === word.word
  );
  if (existingWord) {
    console.log("Word already in vocab:", existingWord)
    return false
  }
  await User.findByIdAndUpdate(
    userId,
    { $addToSet: { vocabularyList: word } },
    { new: true }
  )
  return word;
}

//remove word from vocab list
export async function removeWord(userId, wordId) {
  console.log("Word ID from API route", wordId);
  await dbConnect()
  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { vocabularyList: { _id: wordId } } },
    { new: true }
  )
  if (!user) return null
  return true
}