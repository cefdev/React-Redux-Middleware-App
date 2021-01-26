import axios from "axios";
import _ from "lodash";

const jsonPlaceholder = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

const fetchPosts = () => async (dispatch) => {
  // Make an API request
  const response = await jsonPlaceholder.get("/posts");

  // Return an action with the API response
  dispatch({ type: "FETCH_POST", payload: response.data });
};

const fetchUser = (id) => async (dispatch) => {
  // Make an API request
  const response = await jsonPlaceholder.get(`/users/${id}`);

  // Return an action with the API response
  dispatch({ type: "FETCH_USER", payload: response.data });
};

// THE HARD WAY
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  // With using 'lodash'
  // '_.map' will map over all the posts and return an array with all users ids
  // then '_.uniq' will return only unique values and remove any duplication
  const userIds = _.uniq(_.map(getState().posts, "userId"));
  // userIds === [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  // Then we'll dispatch fetchUser with each id from userIds
  // this way we'll make only 10 API calls from 'fetchUser' instead of 100
  userIds.forEach((id) => dispatch(fetchUser(id)));
};

// THE EASY WAY
/*export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch);

const _fetchUser = _.memoize(async (id, dispatch) => {
  // Make an API request
  const response = await jsonPlaceholder.get(`/users/${id}`);

  // Return an action with the API response
  dispatch({ type: "FETCH_USER", payload: response.data });
});*/
