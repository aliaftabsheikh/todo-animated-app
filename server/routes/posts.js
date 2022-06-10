const express = require("express");
const Posts = require("../models/Posts");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find();
    res.json(posts);
  } catch (error) {
    res.json({ message: error });
  }
});

router.post("/", async (req, res) => {
  const post = new Posts({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const savedPosts = await post.save();
    res.json(savedPosts);
  } catch (error) {
    res.json({ message: {error} });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.postId);
    res.json(post);
  } catch (error) {
      res.json({ message : {error}})
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const removedpost = await Posts.remove({_id: req.params.postId});
    res.json(removedpost);
  } catch (error) {
      res.json({ message : error})
  }
});
router.patch("/:postId", async (req, res) => {
  try {
    const updatedpost = await Posts.updateOne({_id: req.params.postId}, {$set: {title: req.body.title, description: req.body.description}});
    res.json(updatedpost);
  } catch (error) {
      res.json({ message : error})
  }
});

module.exports = router;
