import { axiosInstance } from ".";

export const LoginUser = async (payload) => {
  const response = await axiosInstance("post", "/api/users/login", payload);
  return response;
};

export const RegisterUser = async (payload) => {
  const response = await axiosInstance("post", "/api/users/register", payload);
  return response;
};

export const GetCurrentUser = async() => {
  const response = await axiosInstance("get","/api/users/get-current-user");
  return response
}

export const GetAllDonarsOfAnOrganisation = () =>{
  return axiosInstance("get","/api/users/get-all-donars")
}

export const GetAllHospitalOfAnOrganisation = () =>{
  return axiosInstance("get","/api/users/get-all-hospitals")
}

export const getAllOrgainsationOfADonar = () =>{
  return axiosInstance("get","api/users/get-all-organisations-of-a-donar")
}

export const getAllOrganisationOfHospital = () =>{
  return axiosInstance("get","api/users/get-all-organisation-of-a-hospital")
}