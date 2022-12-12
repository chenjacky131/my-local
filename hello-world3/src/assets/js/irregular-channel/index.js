import L from 'leaflet';
import {IrregularChannel} from './irregular-channel'
(function (factory, window) {

  // define an AMD module that relies on 'leaflet'
  if (typeof define === 'function' && define.amd) {
      define(['leaflet'], factory);

  // define a Common JS module that relies on 'leaflet'
  } else if (typeof exports === 'object') {
      module.exports = factory(require('leaflet'));
  }

  // attach your plugin to the global 'L' variable
  if (typeof window !== 'undefined' && window.L) {
      window.L.irregularChannel = factory(L);
  }
}(function (L) {
  // implement your plugin
  let fun = function(data,map,options){
    return new IrregularChannel(data,map,options)
  }
  // return your plugin when you are done
  return fun;
}, window));