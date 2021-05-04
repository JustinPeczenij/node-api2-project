// implement your posts router here
const router = require('express').Router();
const Posts = require('./posts-model');

router.get('/', (req, res) => {
    Posts.find()
    .then(posts => {
        console.log(posts)
        res.status(200).json(posts)
    })
    .catch(() => {
        res.status(500).json({ message: "The posts information could not be retrieved" })
    })
})

router.get('/:id', async (req, res) => {
   try {
       const post = await Posts.findById(req.params.id)
        if (!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        } else res.status(200).json(post)
    } catch{
        res.status(500).json({ message: "The post information could not be retrieved" })
    }
})

module.exports = router