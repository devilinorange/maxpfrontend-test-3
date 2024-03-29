import * as type from './actionTypes';

const actionFetchSingleNewsRequest = {
  type: type.FETCH_SINGLE_NEWS_REQUEST,
};

const actionFetchSingleNewsResponse = (news) => ({
  type: type.FETCH_SINGLE_NEWS_RESPONSE,
  payload: news,
});

const actionFetchSingleNewsFailed = (error) => ({
  type: type.FETCH_SINGLE_NEWS_FAILED,
  payload: error,
});

const actionAddSingleNewsRequest = {
  type: type.ADD_SINGLE_NEWS_REQUEST,
};

const actionAddSingleNewsResponse = {
  type: type.ADD_SINGLE_NEWS_RESPONSE,
};

const actionAddSingleNewsFailed = (error) => ({
  type: type.ADD_SINGLE_NEWS_FAILED,
  payload: error,
});

const actionDeleteSingleNewsRequest = {
  type: type.DELETE_SINGLE_NEWS_REQUEST,
};

const actionDeleteSingleNewsResponse = {
  type: type.DELETE_SINGLE_NEWS_RESPONSE,
};

const actionDeleteSingleNewsFailed = (error) => ({
  type: type.DELETE_SINGLE_NEWS_FAILED,
  payload: error,
});

const actionChangeSingleNewsRequest = {
  type: type.CHANGE_SINGLE_NEWS_REQUEST,
};

const actionChangeSingleNewsResponse = {
  type: type.CHANGE_SINGLE_NEWS_RESPONSE,
};

const actionChangeSingleNewsFailed = (error) => ({
  type: type.CHANGE_SINGLE_NEWS_FAILED,
  payload: error,
});

export const fetchSingleNews = (id) => (
  (dispatch) => {
    dispatch(actionFetchSingleNewsRequest);
    return fetch(`http://127.0.0.1:5000/api/v1/feeds/${id}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.feed) {
          dispatch(actionFetchSingleNewsResponse(json.feed));
        } else {
          dispatch(actionFetchSingleNewsFailed(json.error));
        }
      })
      .catch((e) => dispatch(actionFetchSingleNewsFailed(e.message)));
  }
);

export const addSingleNews = (title, content, token, fetchNews) => (
  (dispatch) => {
    dispatch(actionAddSingleNewsRequest);
    return fetch('http://127.0.0.1:5000/api/v1/feeds', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.feed) {
          dispatch(actionAddSingleNewsResponse);
          fetchNews();
        } else {
          dispatch(actionAddSingleNewsFailed(json.error));
        }
      })
      .catch((e) => dispatch(actionAddSingleNewsFailed(e.message)));
  }
);

export const deleteSingleNews = (newsId, token, fetchNews) => (
  (dispatch) => {
    dispatch(actionDeleteSingleNewsRequest);
    return fetch(`http://127.0.0.1:5000/api/v1/feeds/${newsId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.error) {
          dispatch(actionDeleteSingleNewsResponse);
          fetchNews();
        } else {
          dispatch(actionDeleteSingleNewsFailed(json.error));
        }
      })
      .catch((e) => dispatch(actionDeleteSingleNewsFailed(e.message)));
  }
);

export const changeSingleNews = (newsId, token, title, content, cb) => (
  (dispatch) => {
    dispatch(actionChangeSingleNewsRequest);
    return fetch(`http://127.0.0.1:5000/api/v1/feeds/${newsId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.feed) {
          dispatch(actionChangeSingleNewsResponse);
          cb();
        } else {
          dispatch(actionChangeSingleNewsFailed(json.error));
        }
      })
      .catch((e) => dispatch(actionChangeSingleNewsFailed(e.message)));
  }
);
