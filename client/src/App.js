import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Post from "./components/Post";
import Indexpage from "./pages/Indexpage"
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPages from "./pages/PostPages";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout />} >
         <Route path="/" element={<Indexpage />} />

      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/create" element={<CreatePost/>}/>
      <Route path="/post/:id" element={<PostPages/>}/>
      <Route path="/edit/:id" element={<EditPost/>}/>
      </Route>
     
    </Routes></UserContextProvider>
  );
}

export default App;
