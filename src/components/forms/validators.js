import objectPath from 'object-path';
import { checkEmailExists } from 'store/profile/actions';

export const asyncEmailValidate = (emailField = 'email', idField = 'id') => (
  values,
  dispatch,
  // eslint-disable-next-line
  { formAsyncErrors },
  field,
) => {
  if (field === emailField) {
    return checkEmailExists(
      objectPath.get(values, emailField),
      objectPath.get(values, idField),
    ).then(res => {
      if (res.exists) {
        const error = {};
        objectPath.set(error, emailField, 'is already registered');

        throw error;
      }
    });
  }

  return Promise.resolve();
};
