const express = require('express');
const router = express.Router();
const { Posts } = require("../models");


router.get("/", async (req, res) => {
   const listOfPosts = await Posts.findAll()
   res.json(listOfPosts);
});

router.get('/byId/:id', async (req, res) => {
    const id = req.params.id
    const post = await Posts.findByPk(id);
    res.json(post);
})


router.post("/", async (req, res) => {
    const post = req.body
    await Posts.create(post);
    res.json(post);
});

router.put("/title", async (req, res) => {
    const { newTitle, id } = req.body
    await Posts.update({ title: newTitle }, {where: { id: id } })
    res.json(newTitle);
});

router.put("/postText", async (req, res) => {
    const { newText, id } = req.body
    await Posts.update({ postText: newText }, {where: { id: id } })
    res.json(newText);
});

router.delete("/:postId", async (req, res) => {
    const postId = req.params.postId;
  
    await Posts.destroy({
      where: {
        id: postId
      }
    });
  
    res.json("deletado");
  });


module.exports = router;