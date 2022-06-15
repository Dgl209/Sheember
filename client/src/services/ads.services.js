import httpService from './http.service';

const adsEndpoint = 'ads/';

const adsService = {
  fetchAll: async () => {
    const { data } = await httpService.get(adsEndpoint);
    return data;
  },
  get: async (path) => {
    const { data } = await httpService.get(adsEndpoint + path);
    return data;
  },
  create: async (content, path) => {
    const { data } = await httpService.post(adsEndpoint + path, content);
    return data;
  },
};

export default adsService;
