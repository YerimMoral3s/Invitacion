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
  const loaderRef = useRef<LoadingBarRef>({} as LoadingBarRef);
  const updateGuestCache = useUpdateGuestCache();
  const updateGuestAPI = useUpdateGuestAPI();

  const notifyError = () => toast.error('Algo Salio mal :(');
  const notifySucces = () => toast.success('¡Guardado!');

  const updateSubGuest = (subGuest: SubGuest) => {
    if (!user.data?.attributes.sub_guests) {
      return;
    }
    updateGuestCache.updateCache(subGuest, !subGuest.attributes.confirmation);
    debouncedUpdate(user.data.attributes.sub_guests.data);
  };

  const debouncedUpdate = useDebouncedCallback(async (subGuest: SubGuest[]) => {
    try {
      if (!user.data) {
        return;
      }
      loaderRef.current.continuousStart();
      const data = subGuest.map((sg) => ({
        id: sg.id,
        confirmation: sg.attributes.confirmation,
      }));
      const req: updateSubGuestRequest = {
        id: user.data?.id,
        sub_guests: data,
      };
      const res = await updateGuestAPI.mutateAsync(req);
      if (res) {
        notifySucces();
        loaderRef.current.complete();
      }
    } catch (error) {
      notifyError();
      loaderRef.current.complete();
      console.error(error);
    }
  }, 1000);

  const confirmReligious = useDebouncedCallback(async (state: boolean) => {
    try {
      if (!user.data) {
        return;
      }

      loaderRef.current.continuousStart();

      if (!user.data.attributes.civil_confirmation && !state) {
        cancelAll();
      }

      const res = await update.mutateAsync({
        id: user.data.id,
        updates: {
          religious_confirmation: state,
        },
      });

      if (res) {
        notifySucces();
        loaderRef.current.complete();
      }
    } catch (error) {
      notifyError();

      loaderRef.current.complete();
      console.error(error);
    }
  }, 300);

  const confirmCivil = useDebouncedCallback(async (state: boolean) => {
    try {
      if (!user.data) {
        return;
      }
      if (update.isPending) {
        return;
      }
      loaderRef.current.continuousStart();

      if (!user.data.attributes.religious_confirmation && !state) {
        cancelAll();
      }

      const res = await update.mutateAsync({
        id: user.data.id,
        updates: {
          civil_confirmation: state,
        },
      });

      if (res) {
        notifySucces();
        loaderRef.current.complete();
      }
    } catch (error) {
      notifyError();

      loaderRef.current.complete();
      console.error(error);
    }
  }, 300);

  const cancelAll = () => {
    try {
      if (!user.data) {
        return;
      }
      const subGuest = user.data.attributes.sub_guests.data;

      const data = subGuest.map((sg) => ({
        id: sg.id,
        confirmation: false,
      }));

      const req: updateSubGuestRequest = {
        id: user.data?.id,
        sub_guests: data,
      };

      updateGuestAPI.mutate(req);
    } catch (error) {
      notifyError();

      console.error(error);
    }
  };

  if (user.error || !user.data) {
    return;
  }
  const forever =
    ' por favor indícanos si podrás acompañarnos en este día tan especial.';
  const noForever =
    ' para poder confirmar tu asistencia es importante que nos indiques quienes de las siguientes personas registradas, asistirán.';

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
            ¡Hola {user.data?.attributes.name}!,{' '}
            {user?.data?.attributes?.sub_guests?.data.length > 0
              ? noForever
              : forever}
          </p>
          {user?.data?.attributes?.sub_guests?.data.length > 0 ? (
            <>
              <p>
                Recuerda que por seguridad, solo podrán asistir las personas que
                estén registradas y confirmadas.
              </p>

              <div
                className="names"
                style={{
                  justifyContent:
                    user?.data?.attributes?.sub_guests.data.length > 3
                      ? 'space-evenly'
                      : 'center',
                }}
              >
                {user.data?.attributes.sub_guests.data.map((subGuest, idx) => {
                  return (
                    <Name
                      subGuest={subGuest}
                      key={idx}
                      user={user.data.id}
                      onClick={updateSubGuest}
                    />
                  );
                })}
              </div>
            </>
          ) : null}

          <div className="confirm-container">
            <div className="confirm-item" style={{ marginBottom: '1rem' }}>
              <h3>¿Asistirás a la ceremonia religiosa?</h3>
              <div className="item-btns">
                <button
                  onClick={() => confirmReligious(true)}
                  disabled={!!user.data.attributes.religious_confirmation}
                >
                  CONFIRMAR <br />
                  ASISTENCIA
                </button>
                <button
                  onClick={() => confirmReligious(false)}
                  disabled={!user.data.attributes.religious_confirmation}
                >
                  NO PODRÉ <br />
                  ASISTIR
                </button>
              </div>
            </div>
            <div className="confirm-item">
              <h3>¿Asistirás a la ceremonia civil?</h3>
              <div className="item-btns">
                <button
                  onClick={() => confirmCivil(true)}
                  disabled={!!user.data.attributes.civil_confirmation}
                >
                  CONFIRMAR <br />
                  ASISTENCIA
                </button>
                <button
                  onClick={() => confirmCivil(false)}
                  disabled={!user.data.attributes.civil_confirmation}
                >
                  NO PODRÉ <br />
                  ASISTIR
                </button>
              </div>
            </div>
          </div>
          <div className="copy">
            <p>
              Por favor, confirma tu asistencia antes del 15 de diciembre 2024.
              Si no tenemos noticias tuyas, asumiremos que no podrás asistir.
              <br />
              <br />
            </p>
          </div>
        </Container>
      </StyledForm>
    </>
  );
}

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
    // justify-content: space-evenly;
    flex-wrap: wrap;
  }
  .confirm-container {
    margin: 2rem 0 0 0;
  }

  .copy {
    background: ${colors.cream};
    color: ${colors.gray};
    margin: 2rem 0 0 0;
    padding: 1rem;
    p {
      border: 2px solid ${colors.gray};
      padding: 1rem;
      margin: 0;
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
      border: 0;
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
