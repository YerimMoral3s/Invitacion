import styled from 'styled-components';
import Container from './components/Container';
import { LoaderComponent } from './components/Loader';
import { colors } from './components/theme';
import { SubGuest, User } from './components/sdk/types';
import { useGuests } from './components/sdk';
import GuestChart from './components/GuestChart';

export default function Charts() {
  const guests = useGuests();

  if (guests.error || guests.isLoading || !guests.data) {
    return <LoaderComponent />;
  }

  return (
    <Container style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
      <Totals users={guests.data} />
    </Container>
  );
}

const StylesTotal = styled.div`
  h1 {
    font-size: 1.5rem;
    span {
      color: ${colors.blue};
    }
  }
`;

const isConfirmed = (user: User) =>
  user.attributes?.civil_confirmation ||
  user.attributes?.religious_confirmation;

const isSubGuestConfirmed = (subGuest: SubGuest) =>
  subGuest.attributes.confirmation;

const isConfirmByEvent = (
  user: User,
  valid: 'religious_confirmation' | 'civil_confirmation',
) => user.attributes[valid];

const Totals = (props: { users: User[] }) => {
  const totalInvitados = props.users.length;
  const subGuest = props.users.flatMap((u) => u.attributes.sub_guests.data);
  const totalSubGuest = subGuest.length;
  const totalInvitadosConfirmad0s = props.users.filter(isConfirmed).length;
  const totalSubGuestConfirmados = subGuest.filter(isSubGuestConfirmed).length;

  const totalInvitadosConfirmad0sRel = props.users.filter((u) =>
    isConfirmByEvent(u, 'religious_confirmation'),
  ).length;

  const totalInvitadosConfirmad0sCiv = props.users.filter((u) =>
    isConfirmByEvent(u, 'civil_confirmation'),
  ).length;

  return (
    <StylesTotal>
      <h1>
        Personas Invitadas: <span>{totalInvitados + totalSubGuest}</span>
      </h1>
      <GuestChart
        labels={['Total de invitados', 'Invitados', 'Colados']}
        datas={[totalInvitados + totalSubGuest, totalInvitados, totalSubGuest]}
      />
      <h1>
        Personas confirmadas:{' '}
        <span>{totalInvitadosConfirmad0s + totalSubGuestConfirmados}</span>
      </h1>
      <GuestChart
        labels={['Total de invitados', 'Invitados', 'Colados']}
        datas={[
          totalInvitadosConfirmad0s + totalSubGuestConfirmados,
          totalInvitadosConfirmad0s,
          totalSubGuestConfirmados,
        ]}
      />
      <h1>Invitados confirmados por ceremonia</h1>
      <GuestChart
        labels={['Religiosa', 'Civil']}
        datas={[totalInvitadosConfirmad0sRel, totalInvitadosConfirmad0sCiv]}
      />
    </StylesTotal>
  );
};
