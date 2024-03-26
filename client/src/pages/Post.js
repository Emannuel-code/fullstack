import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams();
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
  }, []);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3001/comments",
        {
          commentBody: newComment,
          postId: id,
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };


  const editPost = (option) => {
    if (option === "title") {
        let newTitle = prompt("Digite Seu Novo Titulo!");
        axios.put("http://localhost:3001/posts/title", {newTitle: newTitle, id: id});

        setPostObject({...postObject, title: newTitle});
    } else {
      let newPostText = prompt("Digite Sua Nova Anotação!");
      axios.put("http://localhost:3001/posts/postText", {newText: newPostText, id: id});

      setPostObject({...postObject, postText: newPostText});
    }
  }

  const deletePost = (id) => {
    axios.delete(`http://localhost:3001/posts/${id}`).then(() =>{
      navigate("/")
    })
  }

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`)
      .then(() => {
        setComments(
          comments.filter((value) => {
            return value.id != id;
          })
        );
      });
  };


  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title" onClick={() => {editPost("title")}}> {postObject.title} </div>
          <div className="body" onClick={() => {editPost("body")}}>{postObject.postText}</div>
          <div className="footer"><button onClick={() =>{deletePost(postObject.id)}}>Apagar Nota</button></div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Adicione um Comentário..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}> Adicionar </button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <button  onClick={() =>{deleteComment(comment.id)}}>X</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;