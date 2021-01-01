const express = require("express");
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send(
        { response: "I am alive" }
    );
    // console.log("Hello")
})

module.exports = router;
