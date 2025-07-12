import { gql } from '@apollo/client';
export const clubById = gql`
  query Club($id: Int!) {
    getClub(where: { id: $id }) {
      id
      name
      description
      city
    }
  }
`;
