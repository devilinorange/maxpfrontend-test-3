export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_RESPONSE = 'SIGN_IN_RESPONSE';
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';

const actionSignInRequest = {
  type: SIGN_IN_REQUEST,
  payload: {
    isLoading: true,
    eMessage: '',
  },
};

const actionSignInResponse = (token) => ({
  type: SIGN_IN_RESPONSE,
  payload: {
    token,
    isLoading: false,
    eMessage: '',
  },
});

const actionSignInFailed = (e) => ({
  type: SIGN_IN_FAILED,
  payload: {
    isLoading: false,
    eMessage: e,
  },
});

export const signIn = () => {
  const GoogleAuth = window.gapi.getAuthInstance();
  GoogleAuth.signIn()
    .then((user) => (
      (dispatch) => {
        const authToken = user.getAuthResponse().id_token;
        dispatch(actionSignInRequest);
        return fetch('http://127.0.0.1:5000/api/v1/auth/google', {
          method: 'POST',
          body: JSON.stringify({ authToken }),
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.token) {
              dispatch(actionSignInResponse(json.token));
            } else {
              dispatch(actionSignInFailed(json.error));
            }
          })
          .catch((e) => {
            dispatch(actionSignInFailed(e.message));
          });
      }
    ));
};