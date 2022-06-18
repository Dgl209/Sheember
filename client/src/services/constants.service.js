import httpService from './http.service';

const constantsEndpoint = 'constants/';

const constantsService = {
  fetchAll: async (path) => {
    const { data } = await httpService.get(constantsEndpoint + path);
    return data;
  },
};

export default constantsService;
