const express = require("express")
const fs = require("fs")
const bodyParser = require("body-parser")
const cors = require("cors")

const router = express.Router()
router.use(bodyParser.json())
router.use(cors())

router.get("/", (req, res) => {
    fs.readFile("./data.json", {encoding: 'utf8'}, (err, data) => {
        if (err){
            return err
        }
        res.send(data)
    })
})

router.post("/", (req, res) => {
    fs.readFile("./data.json", "utf-8", (err, data) => {
        if (err){
            return err
        }
        obj = JSON.parse(data)
        obj.data.push(req.body)
        fs.writeFile("./data.json", JSON.stringify(obj), (err) => {
            if (err){
                return err
            }
        })
    })
    res.sendStatus(200)
})

router.delete("/", (req, res) => {
    fs.readFile("./data.json", "utf-8", (err, data) => {
        if (err){
            return err
        }
        obj = JSON.parse(data)
        obj.data.splice(req.body, 1)
        fs.writeFile("./data.json", JSON.stringify(obj), (err) =>{
            if (err){
                return err
            }
        })
    })
    res.sendStatus(200)
})

module.exports = router