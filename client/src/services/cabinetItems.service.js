import httpService from './http.service';

const cabinetItemsEndpoint = 'cabinetItems/';

const cabinetItemsService = {
  fetchAll: async () => {
    const { data } = await httpService.get(cabinetItemsEndpoint);
    return data;
  },
};

export default cabinetItemsService;
