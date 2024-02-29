import styled from 'styled-components';
import { H1 } from '../components';

const StyledNames = styled.div`
  .container {
    display: flex;
  }
`;

const Titles = () => (
  <>
    <H1 className="text irvin " text="IRVIN" />
    <H1 className="text and " text="y" />
    <H1 className="text sonia " text="SONIA" />
  </>
);

const Names = () => {
  return (
    <StyledNames>
      <div className="container">
        <div className="t1">
          <Titles />
        </div>

        <div className="t2">
          <Titles />
        </div>
      </div>
    </StyledNames>
  );
};

export default Names;
