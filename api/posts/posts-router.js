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

router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const postFromClient = req.body
        if(!postFromClient.title || !postFromClient.contents) {
            res.status(400).json({ message: "Please provide title and contents for the post" })
        } else {
            const newPost = await Posts.insert(req.body)
            res.status(201).json(await Posts.findById(newPost.id))
        }
    } catch {
        res.status(500).json({ message: "There was an error while saving the post to the database" })
    }
})

router.put('/:id', async (req, res) => {
    try {
        if (!req.body.title || !req.body.contents) {
            res.status(400).json({ message: "Please provide title and contents for the post" })
        } else {
            const updatedPost = await Posts.update(req.params.id, req.body)
            !updatedPost ? res.status(404).json({ message: "The post with the specified ID does not exist" }) 
            : res.status(200).json(await Posts.findById(req.params.id))
        }
    } catch {
        res.status(500).json({ message: "The post information could not be modified" })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const deletedPostContents = await Posts.findById(req.params.id)
        const deletedPost = await Posts.remove(req.params.id)
        if(!deletedPost) {res.status(404).json({ message: "The post with the specified ID does not exist"})}
        else res.status(200).json(deletedPostContents)
    } catch {
        res.status(500).json({ message: "The post could not be removed" })
    }
})

router.get('/:id/comments', async (req, res) => {
    try {
        const postComments = await Posts.findPostComments(req.params.id)
        postComments.length === 0 ? res.status(404).json({ message: "The post with the specified ID does not exist" })
        : res.status(200).json(postComments)
    } catch {
        res.status(500).json({ message: "The comments information could not be retrieved" })
    }
})

module.exports = router