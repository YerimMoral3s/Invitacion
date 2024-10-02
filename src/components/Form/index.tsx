import styled from 'styled-components';
import Container from '../Container';
import { colors } from '../theme';
import Name from './Name';
import {
  updateSubGuestRequest,
  useUpdateGuestAPI,
  useUpdateGuestCache,
  useUpdateUser,
  useUser,
} from '../sdk';
import toast, { Toaster } from 'react-hot-toast';

import { useDebouncedCallback } from 'use-debounce';
import { useRef } from 'react';
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar';
import { SubGuest } from '../sdk/types';

export default function Form() {
  const user = useUser();
  const update = useUpdateUser();
  const loaderRef = useRef<LoadingBarRef>(null);
  const updateGuestCache = useUpdateGuestCache();
  const updateGuestAPI = useUpdateGuestAPI();

  const notifyError = () => toast.error('Algo salió mal :(');
  const notifySuccess = () => toast.success('¡Guardado!');

  const updateSubGuest = (subGuest: SubGuest) => {
    if (!user.data?.attributes.sub_guests) return;

    updateGuestCache.updateCache(subGuest, !subGuest.attributes.confirmation);
    debouncedUpdate(user.data.attributes.sub_guests.data);
  };

  const debouncedUpdate = useDebouncedCallback(
    async (subGuests: SubGuest[]) => {
      if (!user.data) return;

      try {
        loaderRef.current?.continuousStart();
        const data = subGuests.map((sg) => ({
          id: sg.id,
          confirmation: sg.attributes.confirmation,
        }));

        const req: updateSubGuestRequest = {
          id: user.data.id,
          sub_guests: data,
        };

        const res = await updateGuestAPI.mutateAsync(req);

        if (res) notifySuccess();
        loaderRef.current?.complete();
      } catch (error) {
        notifyError();
        loaderRef.current?.complete();
        console.error(error);
      }
    },
    1000,
  );

  const confirmAttendance = useDebouncedCallback(
    async (state: boolean, type: 'civil' | 'religious') => {
      if (!user.data) return;

      try {
        loaderRef.current?.continuousStart();

        if (shouldCancelAll(state, type)) cancelAll();

        const updates =
          type === 'civil'
            ? { civil_confirmation: state }
            : { religious_confirmation: state };

        const res = await update.mutateAsync({ id: user.data.id, updates });

        if (res) notifySuccess();
        loaderRef.current?.complete();
      } catch (error) {
        notifyError();
        loaderRef.current?.complete();
        console.error(error);
      }
    },
    300,
  );

  const shouldCancelAll = (state: boolean, type: 'civil' | 'religious') => {
    const { religious_confirmation, civil_confirmation } =
      user.data?.attributes || {};

    if (
      type === 'civil' &&
      religious_confirmation !== null &&
      civil_confirmation !== null &&
      !religious_confirmation &&
      !state
    )
      return true;

    if (
      type === 'religious' &&
      religious_confirmation !== null &&
      civil_confirmation !== null &&
      !civil_confirmation &&
      !state
    )
      return true;

    return false;
  };

  const cancelAll = () => {
    if (!user.data) return;

    try {
      const subGuest = user.data.attributes.sub_guests.data;
      const data = subGuest.map((sg) => ({
        id: sg.id,
        confirmation: false,
      }));

      const req: updateSubGuestRequest = {
        id: user.data.id,
        sub_guests: data,
      };

      updateGuestAPI.mutate(req);
    } catch (error) {
      notifyError();
      console.error(error);
    }
  };

  const getMessage = () => {
    const { civil_confirmation, religious_confirmation } =
      user.data?.attributes || {};

    if (civil_confirmation === null || religious_confirmation === null)
      return mensajes.pendiente;

    if (!civil_confirmation && religious_confirmation) {
      return mensajes.confirmacion_solo_religiosa;
    }

    if (civil_confirmation && !religious_confirmation) {
      return mensajes.confirmacion_solo_civil;
    }

    if (!civil_confirmation && !religious_confirmation) {
      return mensajes.no_asistira;
    }

    return mensajes.confirmacion_ambas;
  };

  if (!user.data || user.error) return null;

  const subGuests = user.data?.attributes.sub_guests?.data || [];

  return (
    <>
      <LoadingBar color={colors.blue} ref={loaderRef} />
      <Toaster />
      <StyledForm>
        <Container>
          <h1>CONFIRMACIÓN</h1>
          <p>
            ERES MUY IMPORTANTE PARA NOSOTROS, ESPERAMOS CONTAR CON TU COMPAÑÍA
            EN ESTE DÍA TAN ESPECIAL
          </p>
          <p>
            ¡Hola {user.data.attributes.name}!,{' '}
            {subGuests.length > 0 ? noForeverAlone : foreverAlone}
          </p>

          {subGuests.length > 0 && (
            <>
              <p>
                Recuerda que por seguridad, solo podrán asistir las personas que
                estén registradas y confirmadas.
              </p>
              <div
                className="names"
                style={{
                  justifyContent:
                    subGuests.length > 3 ? 'space-evenly' : 'center',
                }}
              >
                {subGuests.map((subGuest, idx) => (
                  <Name
                    disabled={
                      user.data.attributes.religious_confirmation === false &&
                      user.data.attributes.civil_confirmation === false
                    }
                    subGuest={subGuest}
                    key={idx}
                    user={user.data.id}
                    onClick={updateSubGuest}
                  />
                ))}
              </div>
            </>
          )}

          <div className="confirm-container">
            <ConfirmItem
              label="¿Asistirás a la ceremonia religiosa?"
              confirmAction={() => confirmAttendance(true, 'religious')}
              declineAction={() => confirmAttendance(false, 'religious')}
              confirmed={user.data.attributes.religious_confirmation}
            />

            <ConfirmItem
              label="¿Asistirás a la ceremonia civil?"
              confirmAction={() => confirmAttendance(true, 'civil')}
              declineAction={() => confirmAttendance(false, 'civil')}
              confirmed={user.data.attributes.civil_confirmation}
            />
          </div>

          <div className="copy">
            <p> {getMessage()}</p>
          </div>
        </Container>
      </StyledForm>
    </>
  );
}

const ConfirmItem = ({
  label,
  confirmAction,
  declineAction,
  confirmed,
}: {
  label: string;
  confirmAction: () => void;
  declineAction: () => void;
  confirmed: boolean | null;
}) => (
  <div className="confirm-item" style={{ marginBottom: '1rem' }}>
    <h3>{label}</h3>
    <div className="item-btns">
      <button onClick={confirmAction} disabled={confirmed === true}>
        CONFIRMAR <br /> ASISTENCIA
      </button>
      <button onClick={declineAction} disabled={confirmed === false}>
        NO PODRÉ <br /> ASISTIR
      </button>
    </div>
  </div>
);

const StyledForm = styled.div`
  background: ${colors.gray};
  color: ${colors.white};
  text-align: center;

  h1 {
    letter-spacing: 5px;
  }

  p {
    margin: 2rem 0;
  }

  .names {
    display: flex;
    flex-wrap: wrap;
  }

  .confirm-container {
    margin-top: 2rem;
  }

  .copy {
    background: ${colors.cream};
    color: ${colors.gray};
    margin-top: 2rem;
    padding: 1rem;

    p {
      border: 2px solid ${colors.gray};
      margin: 0;
      padding: 1rem;
    }
  }

  .item-btns {
    display: flex;
    justify-content: space-evenly;
    max-width: 500px;
    margin: auto;
    flex-wrap: wrap;

    button {
      background: ${colors.cream};
      color: ${colors.gray};
      letter-spacing: 5px;
      padding: 0.8rem;
      margin: 0.8rem;
      border: none;
      border-radius: 10px;
      font-family: 'Montserrat', sans-serif;
      font-size: 0.8em;
      transition: opacity 0.2s ease-in-out;

      &:disabled {
        opacity: 0.4;
      }
    }
  }
`;

const foreverAlone =
  ' por favor indícanos si podrás acompañarnos en este día tan especial.';
const noForeverAlone =
  ' para poder confirmar tu asistencia es importante que nos indiques quienes de las siguientes personas registradas, asistirán.';

const mensajes = {
  pendiente:
    'Por favor, confirma tu asistencia antes del 15 de diciembre 2024. Si no tenemos noticias tuyas, asumiremos que no podrás asistir.',
  confirmacion_ambas:
    '¡Gracias por confirmar tu asistencia a ambas ceremonias! Estamos felices de que seas parte de estos momentos tan especiales. ¡Nos vemos pronto para celebrar juntos!',
  confirmacion_solo_civil:
    '¡Gracias por confirmar tu asistencia a nuestra ceremonia civil! Estamos emocionados de compartir este momento especial contigo.',
  confirmacion_solo_religiosa:
    '¡Gracias por confirmar tu asistencia a nuestra ceremonia religiosa! Será maravilloso compartir esta bendición contigo.',
  no_asistira:
    'Lamentamos que no puedas acompañarnos, pero entendemos. Esperamos poder compartir momentos contigo en el futuro. ¡Gracias por hacernos saber!',
};
