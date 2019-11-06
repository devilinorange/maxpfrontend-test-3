export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
export const SIGN_IN_RESPONSE = 'SIGN_IN_RESPONSE';
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';
export const USER_INFO_GOOGLE = 'USER_INFO_GOOGLE';

const jwtDecode = require('jwt-decode');

const actionSignInRequest = {
  type: SIGN_IN_REQUEST,
  payload: {
    isLoading: true,
    eMessage: '',
  },
};

const actionSignInResponse = (token, id) => ({
  type: SIGN_IN_RESPONSE,
  payload: {
    token,
    id,
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

export const fetchUserInfoGoogle = (name, avatarUrl) => ({
  type: USER_INFO_GOOGLE,
  payload: {
    name,
    avatarUrl,
  },
});

export const signInWithGoogle = (token) => (
  (dispatch) => {
    dispatch(actionSignInRequest);
    return fetch('http://127.0.0.1:5000/api/v1/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.token) {
          dispatch(actionSignInResponse(json.token, jwtDecode(json.token).id));
        } else {
          dispatch(actionSignInFailed(json.error));
        }
      })
      .catch((e) => {
        dispatch(actionSignInFailed(e.message));
      });
  }
);
