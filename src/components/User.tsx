import { useParams } from 'react-router-dom';

export function User() {
  const { user } = useParams<{ user: string }>();
  return (
    <>User: {user}</>
  );
}
