angular.module('bhima.services')
  .service('PriceListService', PriceListService);

PriceListService.$inject = ['PrototypeApiService'];

/**
 * @class PriceListService
 * @extends PrototypeApiService
 *
 * @description
 * Encapsulates common requests to the /prices/ URL.
 */
function PriceListService(Api) {
  const baseUrl = '/prices/';
  const service = new Api(baseUrl);

  service.create = create;
  service.createItem = createItem;
  service.update = update;
  service.details = details;
  service.deleteItem = deleteItem;

  /**
   * @method create
   *
   * @description
   * This method creates a price list in the database.
   *
   * @param {Object} priceList - price list to create
   *
   * @example
   * service.create(priceList)
   * .then(function (res){
   *   your code here
   *  });
   */
  function create(list) {
    return Api.create.call(service, { list });
  }

  function createItem(data) {
    const url = service.url.concat('item');
    return service.$http.post(url, data)
      .then(service.util.unwrapHttpResponse);
  }

  function deleteItem(uuid) {
    const url = service.url.concat('item/', uuid);
    return service.$http.delete(url)
      .then(service.util.unwrapHttpResponse);
  }
  /**
   * @method update
   *
   * @param {String} uuid -  price list uuid to update
   * @param {Object} priceList -  price list to update
   *
   * @example
   * service.update(id, priceList)
   * .then(function (res){
   *   your code here
   *  });
   */
  function update(uuid, list) {
    delete list.created_at;

    return Api.update.call(service, uuid, { list });
  }

  function details(uuid) {
    return service.$http.get(baseUrl.concat(uuid))
      .then(service.util.unwrapHttpResponse);
  }

  return service;
}
