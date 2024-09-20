import { useState } from 'react';
import Copy from './copy';

export const CopyToClipboard = ({
  text,
  name,
  position = 'left',
}: {
  text: string;
  name: string;
  position?: string;
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(name + ' - ' + text)
      .then(() => {
        setTooltipVisible(true);
        setTimeout(() => setTooltipVisible(false), 1500);
      })
      .catch((err) => {
        console.error('Error al copiar el texto: ', err);
      });
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div onClick={handleCopy}>
        <h3 style={{ fontWeight: '600' }}>{name}</h3>
        <h3>{text}</h3>

        <div style={{ position: 'absolute', top: '-5px', [position]: '-5px' }}>
          <Copy stroke="rgba(0,0,0, 0.8)" />
        </div>
      </div>

      {tooltipVisible && (
        <span
          style={{
            position: 'absolute',
            bottom: '120%',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'black',
            color: 'white',
            padding: '5px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            zIndex: '1',
          }}
        >
          ¡Texto copiado!
        </span>
      )}
    </div>
  );
};
