'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useApolloClient } from '@apollo/client';
import { clubById } from '@/queries/club';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/spinner';

interface IFormState {
  clubId?: number;
}

export const ClubSearch = ({ noInitialText = false }) => {
  const router = useRouter();
  const client = useApolloClient();

  const submitFormAction = async (
    initialState: IFormState,
    formData: FormData,
  ): Promise<IFormState> => {
    const clubId = formData.get('clubId') as string;
    const parsedClubId = clubId ? +clubId : undefined;

    if (!parsedClubId) {
      toast.error('Please enter a valid club ID.');
      return { clubId: undefined };
    }

    try {
      const { data } = await client.query({
        query: clubById,
        variables: { id: Number(clubId) },
      });

      if (data && data.getClub) {
        router.push(`/club/${clubId}`);
      } else {
        toast.error(`No club found with ID: ${clubId}`);
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred.';
      toast.error(`Error searching for club: ${errorMessage}`);
      console.error('Apollo query error:', error);
    }

    return { clubId: parsedClubId };
  };

  const [state, formAction, isPending] = useActionState(submitFormAction, {
    clubId: undefined,
  });
  return (
    <>
      {isPending && (
        <div className="starting:opacity-0 absolute inset-0 flex items-center justify-center bg-black/50">
          <LoadingSpinner />
        </div>
      )}

      {!noInitialText && <h2> Please enter your club id to continue</h2>}
      <form
        action={formAction}
        className="flex w-full max-w-sm flex-col space-y-2 p-4 text-black md:flex-row md:space-x-2"
      >
        <Input
          type="number"
          name="clubId"
          defaultValue={state.clubId}
          placeholder="Club id"
        />
        <Button type="submit" className="cursor-pointer">
          Go To your club
        </Button>
      </form>
    </>
  );
};
