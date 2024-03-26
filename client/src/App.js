import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import Post from './pages/Post'


const App = () => {
  return (
    <Router> 
      <div className='navbar'>
      <Link to="/createpost" className='navbar'> Criar Nota</Link>
      <Link to="/" className='navbar'> Pagina Inicial</Link>
     </div>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post />} />
       
      </Routes>
    </Router>
  );
};


export default App;
