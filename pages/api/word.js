//routes to call db and connect action button functions to db CRUD - POST, DELETE, etc.
//WIP

import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../config/session"
import db from '../../db'

export default withIronSessionApiRoute(
  async function handler(req, res) {
    if(!req.session.user) {
      return res.status(401).end()
    }
    switch(req.method) {
      case 'POST':
        //add word to vocab list
        try {
          const word = JSON.parse(req.body)
          const addedWord = await db.word.add(req.session.user.id, word)
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
          const word = JSON.parse(req.body)
          const deletedWord = await db.word.remove(req.session.user.id, word.id)
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