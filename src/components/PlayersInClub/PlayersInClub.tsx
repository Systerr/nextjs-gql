'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { PlayerCard, type Player } from '../PlayerCard';
import { useQuery } from '@apollo/client';
import { ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react';

import { LoadingSpinner } from '../ui/spinner';

import { playersByClub } from '@/queries/players';
import { Button } from '../ui/button';

type SortField = 'fullName' | 'nationality';
type SortOrder = 'asc' | 'desc';

interface SortCriteria {
  field: SortField;
  order: SortOrder;
}

interface PlayersByClubData {
  players: Player[];
}

interface PlayersInClubProps {
  clubId: number;
}

export const PlayersInClub = ({ clubId }: PlayersInClubProps) => {
  const [isRetired, setIsRetired] = useState(false);
  const [isAcademy, setIsAcademy] = useState(false);
  const [sortBy, setSortBy] = useState<SortCriteria[]>([]);

  const variables: {
    clubId: number;
    isRetired?: boolean;
    isAcademy?: boolean;
    orderBy?: { [key: string]: SortOrder }[];
  } = {
    clubId: Number(clubId),
  };

  if (isRetired) {
    variables.isRetired = false;
  }

  if (isAcademy) {
    variables.isAcademy = false;
  }

  if (sortBy.length > 0) {
    variables.orderBy = sortBy.map((criteria) => ({
      [criteria.field]: criteria.order,
    }));
  }

  const { data, loading, error } = useQuery<PlayersByClubData>(playersByClub, {
    variables,
  });

  const players = data?.players || [];

  const handleSort = (field: SortField) => {
    setSortBy((prevSortBy) => {
      const existingCriteriaIndex = prevSortBy.findIndex(
        (criteria) => criteria.field === field,
      );

      if (existingCriteriaIndex !== -1) {
        const existingCriteria = prevSortBy[existingCriteriaIndex];
        if (existingCriteria.order === 'asc') {
          return prevSortBy.map((criteria, index) =>
            index === existingCriteriaIndex
              ? { ...criteria, order: 'desc' }
              : criteria,
          );
        } else {
          const newSortBy = [...prevSortBy];
          newSortBy.splice(existingCriteriaIndex, 1);
          return newSortBy;
        }
      } else {
        return [...prevSortBy, { field, order: 'asc' }];
      }
    });
  };

  return (
    <div className="w-full p-4">
      <div className="flex flex-col gap-2">
        <div className="items-top flex space-x-2">
          <Checkbox
            id="isRetired"
            checked={isRetired}
            onCheckedChange={() => {
              setIsRetired(!isRetired);
            }}
          />
          <div className="grid cursor-pointer gap-1.5">
            <label
              htmlFor="isRetired"
              className="cursor-pointer text-sm font-medium"
            >
              Hide retired
            </label>
          </div>
        </div>
        <div className="items-top flex space-x-2">
          <Checkbox
            id="isAcademy"
            checked={isAcademy}
            onCheckedChange={() => {
              setIsAcademy(!isAcademy);
            }}
          />
          <div className="grid cursor-pointer gap-1.5">
            <label
              htmlFor="isAcademy"
              className="cursor-pointer text-sm font-medium"
            >
              Hide academy players
            </label>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleSort('fullName')}
            className="flex items-center gap-1"
          >
            Sort by Name
            {sortBy.find((criteria) => criteria.field === 'fullName') &&
              (sortBy.find((criteria) => criteria.field === 'fullName')
                ?.order === 'asc' ? (
                <ArrowUpWideNarrow className="h-4 w-4" />
              ) : (
                <ArrowDownWideNarrow className="h-4 w-4" />
              ))}
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSort('nationality')}
            className="flex items-center gap-1"
          >
            Sort by Nationality
            {sortBy.find((criteria) => criteria.field === 'nationality') &&
              (sortBy.find((criteria) => criteria.field === 'nationality')
                ?.order === 'asc' ? (
                <ArrowUpWideNarrow className="h-4 w-4" />
              ) : (
                <ArrowDownWideNarrow className="h-4 w-4" />
              ))}
          </Button>
        </div>
      </div>
      <div className="relative mt-1">
        {loading && (
          <div className="starting:opacity-0 absolute inset-0 flex items-center justify-center bg-black/50">
            <LoadingSpinner />
          </div>
        )}
        {players.length > 0 ? (
          <div className="grid w-full grid-cols-1 justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-4">
            {players.map((player: Player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        ) : (
          <div className="h-24 text-center">
            {error ? <p>Error: {error.message}</p> : <p>No players found.</p>}
          </div>
        )}
      </div>
    </div>
  );
};
