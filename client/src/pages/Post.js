import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Post.css"; // Importe o arquivo de estilos CSS

function Post() {
  const { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    axios
      .post("http://localhost:3001/comments", {
        commentBody: newComment,
        postId: id,
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const editPost = (option) => {
    const newContent = prompt(
      option === "title" ? "Digite Seu Novo Título!" : "Digite Sua Nova Anotação!"
    );
    if (newContent) {
      const endpoint = option === "title" ? "title" : "postText";
      axios.put(`http://localhost:3001/posts/${endpoint}`, {
        newText: newContent,
        id: id,
      });
      setPostObject({ ...postObject, [endpoint]: newContent });
    }
  };

  const deletePost = () => {
    axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
      navigate("/");
    });
  };

  const deleteComment = (commentId) => {
    axios.delete(`http://localhost:3001/comments/${commentId}`).then(() => {
      setComments(comments.filter((comment) => comment.id !== commentId));
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title" onClick={() => editPost("title")}>
                {postObject.title}
              </h5>
              <p className="card-text" onClick={() => editPost("body")}>
                {postObject.postText}
              </p>
              <button className="btn btn-danger btn-sm" onClick={deletePost}>
                Apagar Nota
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="add">
            <input
              type="text"
              className="form-control"
              placeholder="Adicione um Comentário..."
              autoComplete="off"
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
            />
          </div>
          <button className="btn btn-primary btn-sm mb-3" onClick={addComment}>
            Adicionar
          </button>
          <div className="list-group">
            {comments.map((comment, key) => (
              <div key={key} className="list-group-item">
                {comment.commentBody}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteComment(comment.id)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
