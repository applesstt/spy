import {createValidator, required} from 'utils/validation';

const loginValidation = createValidator({
  username: [required],
  password: [required]
});
export default loginValidation;
