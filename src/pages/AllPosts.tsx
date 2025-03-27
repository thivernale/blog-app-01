import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../store/hooks';
import { Query } from 'appwrite';
import { Post, storageService } from '../appwrite/storage';
import { Container } from '../components/container/Container';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export function AllPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const userData = useAppSelector(({ auth }) => auth.userData);

  useEffect(() => {
    storageService
      .getPosts([
        Query.or([
          Query.equal('active', true),
          Query.equal('userId', userData!.$id),
        ]),
      ])
      .then((posts) => {
        if (posts) {
          setPosts(posts);
        }
      });
  }, [userData]);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts?.map((post) => (
            <div
              className={`w-1/4 p-2 ${!post.active && 'contrast-50'}`}
              key={post.$id}
            >
              <Card {...post} />
            </div>
          ))}
          <div className="w-1/4 p-2">
            <Link to={'/posts/add'} className="w-full">
              <Button className="w-full">Add Post</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
