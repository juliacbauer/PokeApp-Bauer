//routes to call db and connect action button functions to db CRUD - POST, DELETE, etc.

import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session"
import db from '../../db';

export default withIronSessionApiRoute(
  async function handler(req, res) {
    if(!req.session.user) {
      return res.status(401).end()
    }
    const { id: userId } = req.session.user
    switch(req.method) {
      case 'POST':
        //add word to vocab list
        try {
          //are "word" and req.body correct? accessing the right thing?
          const word = req.body
          //think this is the problem, the "db" part
          //dbconnect is not a function error in inspect networks tab
          //add .controllers maybe? But gives a different error
          const addedWord = await db.vocab.addToVocab(userId, word)
          if(addedWord === null) {
            req.session.destroy() 
            return res.status(401)
          }
          return res.status(200).json({word: addedWord})
        } catch (error) {
          return res.status(400).json({error: error.message})
        }
      case 'DELETE':
        try {
        //delete word from vocab list
          const word = req.body
          const deletedWord = await db.vocab.removeWord(userId, word.id)
          if(deletedWord === null) {
            req.session.destroy()
            return res.status(401)
          }
          return res.status(200).json({word: deletedWord})
        } catch (error) {
          return res.status(400).json({error: error.message})
        }
      default:
        return res.status(404).end()
    }
  },
  sessionOptions
)