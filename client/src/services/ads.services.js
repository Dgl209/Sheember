import httpService from './http.service';

const adsEndpoint = 'ads/';

const adsService = {
  fetchAll: async () => {
    const { data } = await httpService.get(adsEndpoint);
    return data;
  },
  create: async (content) => {
    const { data } = await httpService.post(adsEndpoint, content);
    return data;
  },
};

export default adsService;
