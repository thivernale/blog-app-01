import { Container } from '../components/container/Container';
import { PostForm } from '../components/form/PostForm';

export function AddPost() {
  return (
    <div className="py-8">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
}
