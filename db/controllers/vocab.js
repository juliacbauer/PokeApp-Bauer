//db CRUD with user info 

import User from '../models/user'
//db not working?
//do i need util normalize?
//importing db correctly? no curly brackets?
import { dbConnect } from '../connection'

//get user saved vocab list
export async function getVocab(userId) {
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null
    return user.vocabularyList.map(word => word.id)
  }

//add word to vocab list
//where does "word" come from?
export async function addToVocab(userId, word) {
    await dbConnect()
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { vocabularyList: word } },
      { new: true }
    )
    if (!user) return null
    return true
  }
 
//remove word from vocab list
export async function removeWord(userId, wordId) {
    await dbConnect()
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { vocabularyList: {_id: wordId } } },
      { new: true }
    )
    if (!user) return null
    return true
  }