const express = require('express')
const router = express()

router.route('/').get((req, res)=>{
    console.log('wassup')
})
router.route('/:id')

module.exports = router