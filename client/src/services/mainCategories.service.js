import httpService from './http.service';

const mainCategoriesEndpoint = 'mainCategories/';

const mainCategoriesService = {
  fetchAll: async () => {
    const { data } = await httpService.get(mainCategoriesEndpoint);
    return data;
  },
};

export default mainCategoriesService;
