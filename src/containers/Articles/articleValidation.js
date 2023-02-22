import {createValidator, required, minLength} from 'utils/validation';

const articleValidation = createValidator({
  name: [required],
  info: [required, minLength(15)]
});
export default articleValidation;
