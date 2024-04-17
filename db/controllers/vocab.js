import User from '../models/user'
import dbConnect  from '../connection'

//get user saved vocab list
export async function getVocab(userId) {
    await dbConnect()
    const user = await User.findById(userId).lean()
    if (!user) return null
    return user.vocabularyList.map(word => word.id)
  }

//add word to vocab list
export async function addToVocab(userId, word) {
    await dbConnect()
    console.log(userId, word)
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