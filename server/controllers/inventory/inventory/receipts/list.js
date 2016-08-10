'use strict';

const path = require('path');
const BadRequest = require('../../../../lib/errors/BadRequest');
const supportedRender = {
  json : require('../../../../lib/renderers/json'),
  html : require('../../../../lib/renderers/html'),
  pdf  : require('../../../../lib/renderers/pdf')
};

const defaultRender = 'pdf';
const template = path.normalize('./server/controllers/inventory/inventory/receipts/list.handlebars');
const receiptOptions = { pageSize : 'A4', orientation: 'landscape' };

// export the receipt object
exports.build = build;

/**
 * @function build
 * @desc build a report for inventory list of metadata
 * @param {array} data inventory list of metadata
 * @return {object} promise
 */
function build(data, request) {
  let queryString  = request.query;
  let renderTarget = (queryString && queryString.renderer) ? queryString.renderer : defaultRender;
  let renderer     = supportedRender[renderTarget];

  if (!renderer) {
    throw new BadRequest('Render target provided is invalid or not supported by this report '.concat(renderTarget));
  }

  let model = {
    enterprise : request.enterprise,
    project : request.project,
    data : data
  };

  return renderer.render({ model }, template, receiptOptions);
}