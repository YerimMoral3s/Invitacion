import React from 'react';
import styled from 'styled-components';
import Container from './Container';
import Button from './Button';
import Text from './Text';
import Letter from './Letter';
import Tel from './Tel';
import Hotel from './Hotel';
import Resort from './Resort';

const StyledPlacesToStay = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  max-width: 800px;

  a {
    text-decoration: none;
    font-size: 1rem;
  }

  h3 {
    font-family: rosarivo-italic;
    font-size: 2rem;
    margin: 1rem 0;
  }
`;

type place = {
  // name: 'Hotel 1';
  name: string;
  // image: 'https://via.placeholder.com/150';
  image: string;
  // website: 'https://www.google.com';
  website: string;
  // address: 'Dirección 1';
  address?: string;
  // phone: '1234567890';
  phone?: string;
  // email: 'email@test.com';
  email?: string;
  // airbnb: 'https://www.airbnb.com',
  airbnb?: string;
  // type: 'hotel',
  type?: 'hotel' | 'resort';
  // | 'hostel' | 'cabin' | 'camping' | 'other';
};

type PlacesToStayProps = {
  places: place[];
} & React.HTMLAttributes<HTMLHeadingElement>;

export default function PlacesToStay(props: PlacesToStayProps) {
  return (
    <StyledPlacesToStay>
      {props.places.map((place, idx) => (
        <Place
          key={place.name.replace(/\s/g, '') + '_' + idx}
          place={place}
          className={idx % 2 === 0 ? 'even' : 'odd'}
        />
      ))}
    </StyledPlacesToStay>
  );
}

const StyledPlace = styled.div`
  p {
    font-family: rosarivo-italic;
    font-size: 1rem;
    margin: 0.5rem 0;
  }
`;

type PlaceProps = {
  place: place;
} & React.HTMLAttributes<HTMLDivElement>;

const Place = (props: PlaceProps) => {
  return (
    <StyledPlace
      style={{
        height: '500px',
        width: '100%',
        backgroundImage: `url(${props.place.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        {props.place.type ? (
          <>
            {props.place.type === 'hotel' ? (
              <Hotel width="50px" height="50px" />
            ) : null}

            {props.place.type === 'resort' ? (
              <Resort width="40px" height="40px" />
            ) : null}
          </>
        ) : null}

        <Text text={props.place.name} as="h3" style={{ color: 'white' }} />

        {props.place.email && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '.5rem',
            }}
          >
            <Letter width="30px" height="30px" />
            <a href={`mailto:${props.place.email}`}>
              <Text
                text={props.place.email}
                as="p"
                style={{ color: 'white', margin: '0 0 0 10px' }}
              />
            </a>
          </div>
        )}

        {props.place.phone && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '.5rem',
            }}
          >
            <Tel width="30px" height="30px" />
            <a href={`tel:${props.place.phone}`}>
              <Text
                text={props.place.phone}
                as="p"
                style={{ color: 'white', margin: '0 0 0 10px' }}
              />
            </a>
          </div>
        )}

        {props.place.address && (
          <Button
            text={'Ver dirección'}
            href={props.place.address}
            target="_blank"
            style={{
              textAlign: 'center',
              margin: '1rem 0',
              maxWidth: '200px',
            }}
          />
        )}

        {props.place.website && (
          <Button
            text={'Ver sitio web'}
            href={props.place.website}
            target="_blank"
            style={{
              textAlign: 'center',
              maxWidth: '200px',
            }}
          />
        )}

        {props.place.airbnb && (
          <Button
            text={'Ver en Airbnb'}
            href={props.place.airbnb}
            target="_blank"
            style={{
              textAlign: 'center',
              margin: '1rem 0',
              maxWidth: '200px',
            }}
          />
        )}
      </Container>
    </StyledPlace>
  );
};
