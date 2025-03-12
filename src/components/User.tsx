import { useParams } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext.ts';

export function User() {
  const { user } = useParams<{ user: string }>();
  const { user: contextUser } = useUserContext();

  return (
    <div className="text-center">
      Route Params User: {user ?? 'not set'}<br />
      Context User: {contextUser?.username ?? 'not set'}
    </div>
  );
}
