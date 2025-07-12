import Image from 'next/image';

interface ClubInfoProps {
  clubId: string;
  clubDescription: string;
  clubName: string;
}

export const ClubInfo = ({
  clubId,
  clubDescription,
  clubName,
}: ClubInfoProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center md:flex-row md:items-start">
        <div>
          <Image
            src={`https://d3e6sjvah93o4t.cloudfront.net/badges/${clubId}.svg`}
            alt={`Badge for club ${clubId}`}
            width={100}
            height={100}
          />
        </div>
        <div className="mt-2 w-full grow">
          <h2 className="font-bold">{clubName}</h2>
          <p>{clubDescription}</p>
        </div>
      </div>
    </div>
  );
};
