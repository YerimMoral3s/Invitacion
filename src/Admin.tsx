import { NavLink, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from './components/theme';
import Container from './components/Container';

const Nav = styled.nav`
  background: ${colors.blue};
  .container {
    display: flex;
    gap: 20px;

    a {
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default function Admin() {
  return (
    <>
      <Nav>
        <Container style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
          <NavLink
            to="/admin"
            end
            style={({ isActive }) => ({
              color: isActive ? colors.white : colors.gray,
            })}
          >
            Directorio
          </NavLink>
          <NavLink
            to="charts"
            style={({ isActive }) => ({
              color: isActive ? colors.white : colors.gray,
            })}
          >
            Charts
          </NavLink>
        </Container>
      </Nav>

      <Outlet />
    </>
  );
}
