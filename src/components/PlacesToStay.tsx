import React from 'react';
import styled from 'styled-components';
import Container from './Container';
import Button from './Button';
import Text from './Text';
import Letter from './Letter';
import Tel from './Tel';
import Hotel from './Hotel';
import Resort from './Resort';
import { Place, url, usePlaces } from './Sdk';

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

export default function PlacesToStay() {
  const { data: places, error, isLoading } = usePlaces();

  if (!places || error || isLoading) return null;

  return (
    <StyledPlacesToStay>
      {places.map((place, idx) => (
        <PlaceComponent
          key={place.attributes.name.replace(/\s/g, '') + '_' + idx}
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
  place: Place;
} & React.HTMLAttributes<HTMLDivElement>;

const PlaceComponent = (props: PlaceProps) => {
  return (
    <StyledPlace
      style={{
        height: '500px',
        width: '100%',
        backgroundImage: `url(${url + props.place.attributes.image.data.attributes.url})`,
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
        {/* chech if odd */}
        {props.place.id % 2 === 1 ? (
          <Hotel width="50px" height="50px" />
        ) : (
          <Resort width="40px" height="40px" />
        )}

        <Text
          text={props.place.attributes.name}
          as="h3"
          style={{ color: 'white' }}
        />

        {props.place.attributes.email && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '.5rem',
            }}
          >
            <Letter width="30px" height="30px" />
            <a href={`mailto:${props.place.attributes.email}`}>
              <Text
                text={props.place.attributes.email}
                as="p"
                style={{ color: 'white', margin: '0 0 0 10px' }}
              />
            </a>
          </div>
        )}

        {props.place.attributes.phone && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '.5rem',
            }}
          >
            <Tel width="30px" height="30px" />
            <a href={`tel:${props.place.attributes.phone}`}>
              <Text
                text={props.place.attributes.phone}
                as="p"
                style={{ color: 'white', margin: '0 0 0 10px' }}
              />
            </a>
          </div>
        )}

        {props.place.attributes.address && (
          <Button
            text={'Ver dirección'}
            href={props.place.attributes.address}
            target="_blank"
            style={{
              textAlign: 'center',
              margin: '1rem 0',
              maxWidth: '200px',
            }}
          />
        )}

        {props.place.attributes.website && (
          <Button
            text={'Ver sitio web'}
            href={props.place.attributes.website}
            target="_blank"
            style={{
              textAlign: 'center',
              maxWidth: '200px',
            }}
          />
        )}

        {props.place.attributes.airbnb && (
          <Button
            text={'Ver en Airbnb'}
            href={props.place.attributes.airbnb}
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
