import { useSession } from "next-auth/react";

const Index = () => {
  const { data: session } = useSession();

  if (session) {
    return <div>Hello, {session.user.name}</div>;
  }

  return <div>Not authorized</div>;
};

export default Index;
