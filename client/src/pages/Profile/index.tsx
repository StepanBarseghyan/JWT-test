import { useState } from "react";
import s from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import AuthApi from "../../services/authService";
import UserApi from "../../services/userService";
import { Post } from "../../types/types";

const Profile = () => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  const fetchUserPosts = async () => {
    try {
      const posts = await UserApi.fetchPosts();
      setUserPosts(posts);
    } catch (error) {}
  };

  const handlePostsButtonClick = async () => {
    await fetchUserPosts();
  };

  const handleLogout = async () => {
    await AuthApi.logoutUser();
    navigate("/auth/login");
  };

  return (
    <main className={s.profile}>
      <div className={s.buttons}>
        <button onClick={handlePostsButtonClick}>Posts</button>
        <button onClick={handleLogout}>Log Out</button>
      </div>
      <ul className={s.list}>
        {userPosts.map((post) => (
          <li key={post?.id}> {post.title}</li>
        ))}
      </ul>
    </main>
  );
};

export default Profile;
