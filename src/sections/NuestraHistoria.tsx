import styled from 'styled-components';
import Container from '../components/Container';
import { colors } from '../assets/theme';
import Text from '../components/Text';

const StyledBoda = styled.section`
  width: 100vw;

  background-color: ${colors.green};

  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  text-align: center;

  h1 {
    font-size: 3rem;
    font-family: jakarta-bold;
  }

  p {
    font-family: jakarta-regular;
    max-width: 80%;
    margin: 1rem auto;
  }
`;

export default function NuestraHistoria() {
  return (
    <StyledBoda style={{ position: 'relative' }}>
      <Container>
        <Text as="h1" text="Nuestra Historia" />
        <Text
          as="p"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam voluptatibus labore recusandae cum est officia odit laudantium! Maxime sed labore obcaecati, fugit ut excepturi, quia atque placeat dolore, saepe officia.
        Totam, culpa? Facere rerum fugit soluta nam ea eligendi hic, alias nemo provident a enim explicabo? Dolore perspiciatis eaque deleniti tenetur autem magnam molestias sint provident. Odit nemo magnam ea!
        Dicta eligendi soluta nesciunt iste similique, quas repellat recusandae impedit! Dignissimos aperiam dolores illo, iure dolorum dolorem eos labore corporis fugiat placeat laboriosam distinctio aspernatur, veniam, necessitatibus esse tenetur neque!"
        />
      </Container>
    </StyledBoda>
  );
}
