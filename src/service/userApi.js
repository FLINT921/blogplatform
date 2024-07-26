import { getToken } from '../utils/getToken';

import apiBase from './createApiBase';

export const userApi = apiBase.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    login: build.mutation({
      query: (body) => ({
        url: '/users/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }, 'User'],
    }),
    getUser: build.query({
      query: () => ({
        url: '/user',
        headers: { Authorization: `Bearer ${getToken()}` },
      }),
    }),
    editUser: build.mutation({
      query: (body) => ({
        url: '/user',
        method: 'PUT',
        headers: { Authorization: `Bearer ${getToken()}` },
        body,
      }),
      invalidatesTags: [{ type: 'Articles', id: 'LIST' }],
    }),
  }),
});

export default userApi;
