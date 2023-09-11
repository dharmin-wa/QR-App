import { useState } from "react";
import { getObject, head, last } from "../utils/javascript";
import validation from "../utils/validation";
import { useDispatch } from "react-redux";
import { SET_FORM_DATA } from "../redux/constants";

interface FormContainerTypes {
  attribute: any;
  defaultValues: any;
  formPath: any;
}

const FormContainer = ({
  attribute,
  defaultValues,
  formPath,
}: FormContainerTypes) => {
  const [formData, setFormData] = useState(defaultValues);
  const [error, setError] = useState<any>({});
  const dispatch = useDispatch();
  const { parent } = formPath;

  const handleChange = (e: { target: { name?: any; value?: any } }) => {
    const { name, value } = e.target;
    setError({
      ...error,
      [name]: validate(name, value),
    });
    setFormData({ ...formData, [name]: value });
    dispatch({
      type: SET_FORM_DATA,
      payload: { [parent]: { ...formData, [name]: value } },
    });
  };

  const validate = (name: string, value: any) => {
    const { isRequired, pattern, error } = getObject(attribute, name);
    const res = validation(pattern, value);
    if (isRequired) {
      if (!value) {
        return head(error);
      }
    }
    if (isRequired && !res) {
      return last(error);
    }
  };

  return { handleChange, formData, error, validate, setError };
};

export default FormContainer;
