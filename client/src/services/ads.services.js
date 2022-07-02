import httpService from './http.service';

const adsEndpoint = 'ads/';

const orderByTypes = {
  category: '"category"',
  id: '"id"',
  publisher: '"publisher"',
};

const adsService = {
  get: async (orderBy, value) => {
    const { data } = await httpService.get(adsEndpoint, {
      params: {
        orderBy: orderByTypes[orderBy],
        equalTo: `"${value}"`,
      },
    });
    return data;
  },
  getById: async (id) => {
    const { data } = await httpService.get(adsEndpoint, {
      params: {
        orderBy: orderByTypes.id,
        equalTo: `"${id}"`,
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
