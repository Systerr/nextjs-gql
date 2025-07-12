import { query } from '../../ApolloServerClient';
import { clubById } from '../../../queries/club';

import { ClubSearch } from '@/components/ClubSearch';
import { ClubInfo } from '@/components/ClubInfo';
import { PlayersInClub } from '@/components/PlayersInClub';

export default async function Club({
  params,
}: Readonly<{
  params: Promise<{ clubId: string }>;
}>) {
  const { clubId } = await params;

  const club = await query({
    query: clubById,
    variables: { id: Number(clubId) },
  }).catch((e) => {
    console.error(e);
  });

  if (!club) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center text-center text-red-500">
        <span> Club not found. Try so search it </span>
        <ClubSearch noInitialText />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start">
      <ClubInfo
        clubId={clubId}
        clubDescription={club.data.getClub.description}
        clubName={club.data.getClub.name}
      />
      <PlayersInClub clubId={Number(clubId)} />
    </div>
  );
}
