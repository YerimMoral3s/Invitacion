import styled from 'styled-components';
import Container from './components/Container';
import { LoaderComponent } from './components/Loader';
import { useGuests, useUpdateGuest } from './components/sdk';
import { User } from './components/sdk/types';
import { colors } from './components/theme';
import { useRef, useState } from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import Copy from './components/copy/copy';

// Styled Components
const Input = styled.input`
  padding: 5px;
  border: 1px dotted ${colors.gray};
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
  outline: none;
`;

const Select = styled.select`
  padding: 5px;
  border: 1px dotted ${colors.gray};
  border-radius: 5px;
  outline: none;
`;

const StyledGuest = styled.div`
  margin: 0px 0px 10px 0;
  border: 1px dotted ${colors.gray};
  border-radius: 5px;
  padding: 10px;

  .info {
    margin-bottom: 10px;

    h3 {
      margin: 0 0 5px 0;
    }

    a {
      color: ${colors.blue};
      text-decoration: none;
    }
  }

  .weddings,
  .sub-guests {
    margin-top: 10px;

    .item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      p {
        margin: 0 10px 0 0;
      }

      input {
        width: 15px;
        height: 15px;
        cursor: pointer;
      }
    }
  }
`;

// Types
type Boda =
  | 'null'
  | 'religious_confirmation'
  | 'civil_confirmation'
  | 'ambas'
  | 'bloqueados'
  | 'ninguna';

// Main Directory Component
export default function Directory() {
  const guests = useGuests();
  const [search, setSearch] = useState('');
  const [boda, setBoda] = useState<Boda>('null');

  if (guests.error || guests.isLoading || !guests.data) {
    return <LoaderComponent />;
  }

  const guestList = guests.data.filter((guest) => {
    const name = guest.attributes.name.toLowerCase();
    const phone = guest.attributes.phone_number?.toLowerCase() || '';
    const query = search.toLowerCase();

    const matchesQuery = name.includes(query) || phone.includes(query);
    const { civil_confirmation, religious_confirmation, blocked } =
      guest.attributes;

    switch (boda) {
      case 'null':
        return matchesQuery;
      case 'ambas':
        return matchesQuery && civil_confirmation && religious_confirmation;
      case 'ninguna':
        return matchesQuery && !civil_confirmation && !religious_confirmation;
      case 'bloqueados':
        return matchesQuery && blocked;
      default:
        return matchesQuery && guest.attributes[boda];
    }
  });

  return (
    <Container style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
      {/* Search Input */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="search" style={{ marginRight: '5px' }}>
          Buscar:{' '}
        </label>
        <Input
          type="text"
          id="search"
          placeholder="Nombre o número de teléfono"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter Select */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="filter">Filtrar por: </label>
        <Select
          id="filter"
          value={boda}
          onChange={(e) => setBoda(e.target.value as Boda)}
        >
          <option value="null">Todos</option>
          <option value="civil_confirmation">Ceremonia Civil</option>
          <option value="religious_confirmation">Ceremonia Religiosa</option>
          <option value="ambas">Ambas</option>
          <option value="ninguna">Ninguna</option>
          <option value="bloqueados">Bloqueados</option>
        </Select>
      </div>

      {/* Guest List */}
      {guestList.length > 0 ? (
        guestList.map((guest) => <Guest guest={guest} key={guest.id} />)
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </Container>
  );
}

// Capitalize Each Word Utility
const capitalEachWord = (name: string) =>
  name
    .split(' ')
    .map((n) => n.charAt(0).toUpperCase() + n.slice(1).toLowerCase())
    .join(' ');

// Guest Component
const Guest = ({ guest }: { guest: User }) => {
  const loaderRef = useRef<LoadingBarRef>(null);
  const updateGuest = useUpdateGuest();
  const lastSeen = guest.attributes.seen
    ? new Date(guest.attributes.seen).toLocaleString()
    : 'N/A';

  const handleUpdate = async (
    state: boolean,
    id: number,
    type: 'user' | 'subGuest',
    key?: keyof User['attributes'],
  ) => {
    loaderRef.current?.continuousStart();
    const updates = key ? { [key]: state } : { confirmation: state };
    await updateGuest.mutateAsync({ id, type, updates });
    loaderRef.current?.complete();
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <LoadingBar color={colors.white} ref={loaderRef} />
      <StyledGuest>
        {/* Guest Info */}
        <div className="info">
          <h3>
            {capitalEachWord(guest.attributes.name)},{' '}
            <a href={`tel:+${guest.attributes.phone_number}`}>
              {guest.attributes.phone_number}
            </a>
          </h3>
          <div
            style={{
              display: 'flex',
            }}
          >
            <p>
              Invitación:{' '}
              <a
                rel="stylesheet"
                href={`https://irvin-sonia.wip-mx.com/?id=${guest.id}`}
                target="_blank"
              >
                https://irvin-sonia.wip-mx.com/?id={guest.id}
              </a>
            </p>
            <div
              style={{ marginLeft: '10px' }}
              onClick={() =>
                handleCopy(`https://irvin-sonia.wip-mx.com/?id=${guest.id}`)
              }
            >
              <Copy stroke="rgba(0,0,0, 0.8)" />
            </div>
          </div>
          <p>Última vista: {lastSeen}</p>
        </div>

        {/* Weddings */}
        <div className="weddings">
          <div className="item">
            <p>Bloqueado</p>
            <input
              type="checkbox"
              checked={!!guest.attributes.blocked}
              onChange={(e) =>
                handleUpdate(e.target.checked, guest.id, 'user', 'blocked')
              }
            />
          </div>
          <div className="item">
            <p>Boda Religiosa</p>
            <input
              type="checkbox"
              checked={!!guest.attributes.religious_confirmation}
              onChange={(e) =>
                handleUpdate(
                  e.target.checked,
                  guest.id,
                  'user',
                  'religious_confirmation',
                )
              }
            />
          </div>
          <div className="item">
            <p>Boda Civil</p>
            <input
              type="checkbox"
              checked={!!guest.attributes.civil_confirmation}
              onChange={(e) =>
                handleUpdate(
                  e.target.checked,
                  guest.id,
                  'user',
                  'civil_confirmation',
                )
              }
            />
          </div>
        </div>

        {/* Sub-Guests */}
        {guest.attributes.sub_guests.data.length > 0 && (
          <div className="sub-guests">
            <h3>Colados:</h3>
            {guest.attributes.sub_guests.data.map((sub) => (
              <div className="item" key={sub.id}>
                <p>- {capitalEachWord(sub.attributes.name)}</p>
                <input
                  type="checkbox"
                  checked={sub.attributes.confirmation}
                  onChange={(e) =>
                    handleUpdate(e.target.checked, sub.id, 'subGuest')
                  }
                />
              </div>
            ))}
          </div>
        )}
      </StyledGuest>
    </>
  );
};
