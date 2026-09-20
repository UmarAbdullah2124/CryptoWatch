import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export interface ProfileSummary {
  id: string;
  name: string;
  email: string;
  image: string | null;
  provider: string;
  created_at: string;
  updated_at: string;
  watchlistCount: number;
}

export async function getProfileSummary(): Promise<ProfileSummary | null> {
  const session = await auth();

  if (!session?.user?.id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      accounts: {
        select: {
          provider: true,
        },
      },
      _count: {
        select: {
          watchlists: true,
        },
      },
    },
  });

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name ?? "Operative",
    email: user.email,
    image: user.image,
    provider: user.accounts[0]?.provider ?? "credentials",
    created_at: user.created_at.toISOString(),
    updated_at: user.updated_at.toISOString(),
    watchlistCount: user._count.watchlists,
  };
}
