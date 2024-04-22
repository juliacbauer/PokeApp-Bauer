import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session"
import db from '../../db';

export default withIronSessionApiRoute(
  async function handler(req, res) {
    console.log(req.session)
    if (!req.session.user) {
      return res.status(401).end()
    }
    const { _id: userId } = req.session.user
    switch (req.method) {
      case 'POST':
        //add word to vocab list
        try {
          const word = req.body
          const addedWord = await db.vocab.addToVocab(userId, word)
          console.log("worked", addedWord)
          if (addedWord === null) {
            req.session.destroy()
            return res.status(401).end()
          }
          if (addedWord === false) {
            return res.status(200).json({ message: "This word has already been added to your Vocabulary List." });
          }
          return res.status(200).json({ word: addedWord, message: "Word added to your Vocabulary List!" })
        } catch (error) {
          return res.status(400).json({ error: error.message })
        }
      case 'DELETE':
        try {
          //delete word from vocab list
          console.log("ID:", req.body);
          const { id: wordId } = JSON.parse(req.body)
          console.log("Word ID for remove", wordId);
          const deletedWord = await db.vocab.removeWord(userId, wordId)
          if (deletedWord === null) {
            req.session.destroy()
            return res.status(401).end()
          }
          return res.status(200).json({ word: deletedWord })
        } catch (error) {
          return res.status(400).json({ error: error.message })
        }
      default:
        return res.status(404).end()
    }
  },
  sessionOptions
)