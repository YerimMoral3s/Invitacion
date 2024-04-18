import styled from 'styled-components';
import Logo from '../components/Logo';
import { colors } from '../assets/theme';

const StyledLogo = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: ${colors.green};
  z-index: 100;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoContainer = () => {
  return (
    <StyledLogo className="curtain">
      <Logo
        width={600}
        height={600}
        className="fade-in"
        fill={colors.white}
        stroke={colors.green}
      />
    </StyledLogo>
  );
};

export default LogoContainer;
