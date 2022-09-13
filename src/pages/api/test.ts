import { prisma } from "../../server/database/client";

const Test = async (req, res) => {
  const users = await prisma.user.findMany();

  return res.json(users);
};

export default Test;
