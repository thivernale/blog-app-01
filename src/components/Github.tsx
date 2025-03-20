import { useLoaderData } from 'react-router-dom';

type GithubUserInfo = { [key: string]: unknown };

export function Github() {
  const data = useLoaderData();
  /*const [data, setData] = useState<GithubUserInfo | null>(null);
  useEffect(() => {
    const url = `https://api.github.com/users/actions`;
    fetch(url)
      .then(res => res.json())
      .then(res => setData(res));
  }, [setData]);
  console.log(data);
  if (!data) {
    return null;
  }*/

  return (
    <div className="text-center bg-gray-600 m-4 text-white p-4 text-3xl">
      Github followers {data.followers as string}
      <img src={data.avatar_url as string} alt="" width={300} />
    </div>
  );
}

export const githubInfoLoader: () => Promise<GithubUserInfo> = async () => {
  const url = `https://api.github.com/users/actions`;
  const response = await fetch(url);
  return response.json();
};
