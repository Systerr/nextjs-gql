import Image from 'next/image';

export interface Player {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  nationality: string;
  isRetired: boolean;
  isTraining: boolean;
  isAcademy: boolean;
  imageUrls: {
    player: string;
    card: string;
    thumb: string;
  };
}

const PlayerCard = ({ player }: { player: Player }) => {
  return (
    <div className="w-full overflow-hidden rounded bg-white shadow-2xl dark:bg-gray-800">
      <Image
        src={player.imageUrls.card}
        alt={player.fullName}
        width={245}
        height={400}
        className="w-full object-cover"
      />
      <div className="px-6 py-4">
        <div className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
          {player.fullName}
        </div>
        <p className="text-base text-gray-700 dark:text-gray-300">
          <strong>Nationality:</strong> {player.nationality}
        </p>
        <p className="text-base text-gray-700 dark:text-gray-300">
          <strong>Retired:</strong> {player.isRetired ? 'Yes' : 'No'}
        </p>
        <p className="text-base text-gray-700 dark:text-gray-300">
          <strong>Training:</strong> {player.isTraining ? 'Yes' : 'No'}
        </p>
        <p className="text-base text-gray-700 dark:text-gray-300">
          <strong>Academy:</strong> {player.isAcademy ? 'Yes' : 'No'}
        </p>
      </div>
    </div>
  );
};

export { PlayerCard };
