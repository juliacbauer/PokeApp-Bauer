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
          return res.status(200).json({ word: addedWord })
        } catch (error) {
          return res.status(400).json({ error: error.message })
        }
      case 'DELETE':
        try {
          //delete word from vocab list
          const word = req.body
          const deletedWord = await db.vocab.removeWord(userId, word.id)
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