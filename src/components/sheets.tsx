import { H1, H2, H3, H4, Label, P, Span } from './Text';

export const Sheets = () => {
  return (
    <>
      <H1 text="Sheets" style={{ color: 'red' }} />
      <H2 text="Sheets" style={{ color: 'blue' }} />
      <H3 text="Sheets" style={{ color: 'green' }} />
      <H4 text="Sheets" style={{ color: 'yellow' }} />
      <P text="Sheets" style={{ color: 'orange' }} />
      <Span text="Sheets" style={{ color: 'pink' }} />
      <br />
      <Label text="Sheets" style={{ color: 'purple' }} htmlFor="holaMundo" />
    </>
  );
};
