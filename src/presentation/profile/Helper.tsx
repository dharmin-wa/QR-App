/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_STATE } from "../../redux/constants";

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  state: string;
  phoneNo: string;
  address: string;
}

interface HelperProps {
  formPath: any;
}

const Helper = ({ formPath }: HelperProps) => {
  const { parent } = formPath;
  const getUserData: any = useSelector(
    (state: any) => state?.app?.[parent]?.data,
  );
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<UserData | undefined | null>();

  useEffect(() => {
    if (getUserData) {
      const { firstName, lastName, email, phoneNo, city, state, address } =
        getUserData;
      setUserData({
        firstName,
        lastName,
        email,
        phoneNo,
        city,
        state,
        address,
      });
    }
  }, [getUserData]);

  return { defaultValues: userData };
};

export default Helper;
