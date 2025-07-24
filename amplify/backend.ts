import { defineBackend } from '@aws-amplify/backend';
// Remove auth import since we're using Auth0
// import { auth } from './auth/resource';

export const backend = defineBackend({
  // Remove auth from here since we're using Auth0
  // auth,
});