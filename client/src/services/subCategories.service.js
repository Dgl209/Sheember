import httpService from './http.service';

const subCategoriesEndpoint = 'subCategories/';

const subCategoriesService = {
  fetchAll: async () => {
    const { data } = await httpService.get(subCategoriesEndpoint);
    return data;
  },
};

export default subCategoriesService;
