import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";
import { validateRoute } from "../../lib/auth";

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user) => {
    const playlistsCount = await prisma.playlist.count({
      where: {
        userId: user.id,
      },
    });

    res.json({ ...user, playlistsCount });
  }
);
