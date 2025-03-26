import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Post, storageService } from '../appwrite/storage';
import { useSelector } from 'react-redux';
import { authSlice } from '../store/authSlice';
import { Container } from '../components/container/Container';
import { PostForm } from '../components/form/PostForm';

export function EditPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();
  const userData = useSelector(authSlice.selectors.userData);

  useEffect(() => {
    if (slug) {
      storageService.getPost(slug).then((post) => {
        if (post && userData && post.userId === userData.$id) {
          setPost(post);
        } else {
          navigate('/');
        }
      });
    }
  }, [slug, navigate, userData]);

  if (!post) return null;

  return (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  );
}
