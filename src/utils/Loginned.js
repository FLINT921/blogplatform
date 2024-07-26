import { useSelector } from 'react-redux';

export function useAuth() {
  const { username, email, token, image } = useSelector((state) => state.user);

  return {
    inAuth: !!username,
    username,
    email,
    token,
    image,
  };
}
