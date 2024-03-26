const express = require("express");
const router = express.Router();
const { Comments, Posts } = require("../models"); 

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const comments = await Comments.findAll({
      where: { postId: postId }, 
      include: [{ model: Posts, as: 'post' }], // Use o mesmo alias definido na associação (no caso, 'post')
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const comment = req.body;
  try {
    await Comments.create(comment);
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;

  try {
    await Comments.destroy({
      where: {
        id: commentId
      }
    });

    res.json("Deletado com sucesso");
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar o comentário" });
  }
});


module.exports = router;
