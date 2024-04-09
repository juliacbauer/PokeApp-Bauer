//db CRUD with user info 
//WIP

import User from '../models/user'
import { dbConnect } from './util'

//get user saved vocab list
export async function getVocab(userId) {
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null
    return user.vocabularyList.map(word => word.id)
  }

//add word to vocab list
export async function addWord(userId, word) {
    await dbConnect()
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { vocabularyList: word } },
      { new: true }
    )
    if (!user) return null
    return res.status(200).json({ message: "Word added to vocabulary list!" });
  }
 
//remove word from vocab list
export async function remove(userId, wordId) {
    await dbConnect()
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { vocabularyList: {_id: wordId } } },
      { new: true }
    )
    if (!user) return null
    return res.status(200).json({ message: "Word removed from vocabulary list." });
  }