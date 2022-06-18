import httpService from './http.service';

const adsEndpoint = 'ads/';

const adsService = {
  fetchAll: async () => {
    const { data } = await httpService.get(adsEndpoint);
    return data;
  },
  get: async (orderBy, value) => {
    const { data } = await httpService.get(adsEndpoint, {
      params: {
        orderBy: orderBy,
        equalTo: `"${value}"`,
      },
    });
    return data;
  },
  create: async (content) => {
    const { data } = await httpService.post(adsEndpoint, content);
    return data;
  },
};

export default adsService;
