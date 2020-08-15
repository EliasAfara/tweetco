import {
  USER_POSTS,
  USER_LIKED_POSTS,
  LOAD_TIMELINE,
  GET_USER,
  CLEAR,
  GET_POST,
} from './types';
import api from '../utils/api';
import { loadUser } from './auth';

// Load Timeline
export const loadTimeline = () => async (dispatch) => {
  try {
    const res = await api.get('/post/timeline');
    dispatch({ type: LOAD_TIMELINE, payload: res.data.data });
  } catch (err) {
    console.error(err.response.data.errors);
  }
};

// Add Post
export const addPost = (data) => async (dispatch) => {
  try {
    await api.post('/post', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch(loadTimeline());
  } catch (err) {
    console.log(1);
    console.error(err.response.data.errors);
  }
};

export const getUser = (username) => async (dispatch) => {
  try {
    const user = await api.get(`/users/${username}`);
    dispatch({ type: GET_USER, payload: user.data.data });
  } catch (err) {
    console.error(err.response.data.errors);
  }
};

export const clear = () => (dispatch) => {
  dispatch({ type: CLEAR });
};

export const like = (id, username) => async (dispatch) => {
  await api.put(`/post/${id}/like`);
  dispatch(loadTimeline());
  dispatch(getUserPost(username));
  dispatch(getUserLikedPost(username));
};

export const unlike = (id, username) => async (dispatch) => {
  await api.put(`/post/${id}/unlike`);
  dispatch(loadTimeline());
  dispatch(getUserPost(username));
  dispatch(getUserLikedPost(username));
};

export const editPost = (formData, id) => async (dispatch) => {
  await api.put(`/post/${id}`, formData);
  dispatch(loadUser);
};

export const deletePost = (id) => async (dispatch) => {
  await api.delete(`/post/${id}`);
  dispatch(loadUser);
};

export const getPost = (id) => async (dispatch) => {
  const res = await api.get(`/post/search/${id}`);
  dispatch({ type: GET_POST, payload: res.data.data });
};

export const getUserPost = (username) => async (dispatch) => {
  try {
    const res = await api.get(`/post/${username}`);
    dispatch({ type: USER_POSTS, payload: res.data.data });
  } catch (error) {}
};
export const getUserLikedPost = (username) => async (dispatch) => {
  try {
    const res = await api.get(`/post/${username}/like`);
    dispatch({ type: USER_LIKED_POSTS, payload: res.data.data });
  } catch (error) {}
};

export const comment = (postId, formData) => async (dispatch) => {
  try {
    await api.post(`/post/comment/${postId}`, formData, {
      'Content-Type': 'Application/json',
    });
    dispatch(getPost(postId));
  } catch (error) {}
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/post/comment/${postId}/${commentId}`);
    dispatch(getPost(postId));
  } catch (error) {}
};
