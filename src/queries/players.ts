import { gql } from '@apollo/client';

export const playersByClub = gql`
  query getPlayers(
    $clubId: Int!
    $isRetired: Boolean
    $isAcademy: Boolean
    $orderBy: [PlayerOrderByWithRelationInput!]
  ) {
    players(
      where: {
        clubId: { equals: $clubId }
        isRetired: { equals: $isRetired }
        isAcademy: { equals: $isAcademy }
      }
      orderBy: $orderBy
      take: 1000
    ) {
      id
      fullName
      firstName
      lastName
      nationality
      isRetired
      isTraining
      isAcademy
      imageUrls {
        player
        card
        thumb
      }
    }
  }
`;
