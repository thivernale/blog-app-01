import { Route } from 'react-router-dom';
import App from '../App';
import { AuthLayout } from '../components/AuthLayout';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { AllPosts } from '../pages/AllPosts';
import { AddPost } from '../pages/AddPost';
import { Post } from '../pages/Post';
import { EditPost } from '../pages/EditPost';

export const routes = (
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route
      path="/login"
      element={
        <AuthLayout authentication={false}>
          <Login />
        </AuthLayout>
      }
    ></Route>
    <Route
      path="/signup"
      element={
        <AuthLayout authentication={false}>
          <Signup />
        </AuthLayout>
      }
    ></Route>
    <Route
      path="/posts"
      element={
        <AuthLayout authentication={true}>
          <AllPosts />
        </AuthLayout>
      }
    ></Route>
    <Route
      path="/posts/add"
      element={
        <AuthLayout authentication={true}>
          <AddPost />
        </AuthLayout>
      }
    />
    <Route
      path="/posts/:slug/edit"
      element={
        <AuthLayout authentication={true}>
          <EditPost />
        </AuthLayout>
      }
    />
    <Route
      path="/posts/:slug"
      element={
        <AuthLayout authentication={true}>
          <Post />
        </AuthLayout>
      }
    />
    <Route path="*" element={<div>Not Found</div>} />
  </Route>
);

export const links: { path: string; label: string }[] = [
  { path: '', label: 'Home' },
];
