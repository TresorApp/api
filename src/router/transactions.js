import express from "express"
import { authMiddleware } from "./auth";
import * as TransactionService from "../service/transactions"
import Transaction from "../model/transactions"

const router = express.Router()
router.post('/', authMiddleware, (req, res, next) => {
    const transactions = Transaction(
        req.userId,
        req.body.info,
        req.body.amount,
        req.body.hashtag,
        req.body.type
    )    
    TransactionService.createTransaction(transactions)
    .then(() => {
        res.status(200).send({})
    })
})

export default router;