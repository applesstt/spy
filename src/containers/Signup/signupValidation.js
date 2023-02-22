import {createValidator, required, minLength} from 'utils/validation';

const signupValidation = createValidator({
  username: [required, minLength(6)],
  password: [required, minLength(6)]
});
export default signupValidation;
