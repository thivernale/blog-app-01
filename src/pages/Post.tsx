import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';
import { type Post, storageService } from '../appwrite/storage';
import { authSlice } from '../store/authSlice';
import { Container } from '../components/container/Container';
import { Button } from '../components/Button';

export function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();
  const userData = useSelector(authSlice.selectors.userData);

  const isAuthor = post && userData && post.userId === userData.$id;

  const deletePost = async () => {
    if (!post || !post.$id) return;
    storageService
      .deletePost(post.$id)
      .then((status) => {
        if (status && post.featuredImage)
          storageService.deleteFile(post.featuredImage);
      })
      .then(() => navigate('/posts'));
  };

  useEffect(() => {
    if (slug) {
      storageService.getPost(slug).then((value) => {
        if (value) {
          setPost(value);
        } else {
          navigate('/');
        }
      });
    }
  }, [slug, navigate]);

  if (!post) return null;

  return (
    <div className={`py-8 ${isAuthor && !post.active && 'contrast-50'}`}>
      <Container>
        <div className="relative mb-4 flex w-full justify-center rounded-xl border p-2">
          {post.featuredImage && (
            <img
              src={storageService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-xl object-cover"
            />
          )}
          {isAuthor && (
            <div className="absolute top-6 right-6">
              <Link to={`/posts/${post.$id}/edit`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button onClick={deletePost} type="button" bgColor="bg-red-500">
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="mb-6 w-full">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="browser-css">{parse(post.content)}</div>
        </div>
      </Container>
    </div>
  );
}
