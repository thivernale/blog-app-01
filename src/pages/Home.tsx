import { useSelector } from 'react-redux';
import { authSlice } from '../store/authSlice';
import { Container } from '../components/container/Container';
import { Link } from 'react-router-dom';

export function Home() {
  const userData = useSelector(authSlice.selectors.userData);

  return (
    <div className="py-8">
      <Container>
        {userData ? (
          <div>
            <h2 className="py-8 text-lg">Hello, {userData.name}</h2>
            <p>
              <Link to={'/posts'} className="underline">
                Check out all posts
              </Link>{' '}
              or{' '}
              <Link to={'/posts/add'} className="underline">
                create a new one
              </Link>
            </p>
          </div>
        ) : (
          <div>
            <h2 className="py-8 text-lg">Hello, Guest</h2>
            <p>
              <Link to={'/login'} className="underline">
                Sign in
              </Link>{' '}
              or{' '}
              <Link to={'/signup'} className="underline">
                Sign up
              </Link>{' '}
              to view and create posts
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}
