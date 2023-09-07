import axios from "./axios";

const fetchAllAnimal = (page) => {
  const access_token = localStorage.getItem("access_token");

  return axios.get(
    `api/species?paginate=true&page=${page}&perpage=10&with=roles,createdBy&search=&inactive=-1`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
};

export { fetchAllAnimal };
