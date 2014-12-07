var module = angular.module('ng-jcrop', []);
module.directive('ngJcrop', [
  function() {
    return {
      link: function(scope, element, attr) {
        /**
         * default options for Jcrop plugin
         * @type {Object}
         */
        var defaultOptions = {
          /**
           * handler for onChange events
           * @type {Function}
           */
          onChange: onChange,

          /**
           * CSS selector to generate preview
           */
          preview: null
        },

        /**
         * user supplied configuration
         * @type {Object}
         */
        options = scope.$eval(attr.ngJcrop) || {},

        /**
         * jcrop instance
         * @type {{}}
         */
        instance = {},

        /**
         * container that will hold the preview image
         */
        $previewContainer,

        /**
         * image that will show the preview
         */
        $previewImg;

        /**
         * wrapper for onChange events, intercepts and calls user-supplied
         * onChange function with coordinates
         * @param {Object} coord the coordinates object
         */
        function onChange(coord) {
          /**
           * coord object properties converted to array
           * @type {Array}
           */
          var args = [
            coord.x,
            coord.y,
            coord.x2,
            coord.y2,
            coord.w,
            coord.h
          ];

          // call the update preview function with arguments
          updatePreview.apply(this, args);

          // call user-supplied onChange function with arguments
          options._onChange && options._onChange.apply(this, args);
        }

        /**
         * generates preview on user-supplied CSS selector
         */
        function updatePreview(x, y, x2, y2, w, h) {
          // if no CSS selector specified for preview, return
          if (!options.preview) return;

          var bounds = instance.getBounds(),
            boundX = bounds[0],
            boundY = bounds[1],
            xsize = $previewContainer.width(),
            ysize = $previewContainer.height(),
            rx = xsize / w,
            ry = ysize / h,
            newWidth = w && h ? Math.round(rx * boundX) + 'px' : '100%',
            newHeight = w && h ? Math.round(ry * boundY) + 'px' : '100%',
            newMarginLeft = w && h ? '-' + Math.round(rx * x) + 'px' : '0',
            newMarginTop = w && h ? '-' + Math.round(ry * y) + 'px' : '0';

          $previewImg.css({
            width: newWidth,
            height: newHeight,
            marginLeft: newMarginLeft,
            marginTop: newMarginTop
          });
        }

        // override onChange
        if (options.onChange) {
          options._onChange = angular.copy(options.onChange);
          delete options.onChange;
        }

        // extend options, instantiate plugin
        options = angular.extend(defaultOptions, options);
        $(element).Jcrop(options, function() {
          // save reference to plugin
          instance = this;

          // if user supplied css selector, generate preview
          if (options.preview) {
            $previewContainer = $(options.preview)
              .css({
                padding: '0'
              });
            $previewImg = $('<img />')
              .attr('src', element.attr('src'))
              .css({
                width: '100%',
                height: '100%',
                margin: '0'
              });

            $previewContainer.append($previewImg);
          }
        });
      }
    };
  }
]);

module.service('$Image', [
  '$q',
  '$log',
  function($q, $log) {

    /* ==========================================================================
       Internal & scope variables
       ========================================================================== */

    var

      /**
       * log identifier
       * @type {String}
       */
      TAG = '$Image::';

    /* ==========================================================================
       Internal helper fns
       ========================================================================== */

    /* ==========================================================================
        $Image wrapper class w/ heper functions
       ========================================================================== */

     /**
      * image wrapper class w/ crop helpers
     * @param data {Object} filereader data
      * @return {$Image}
     * @constructor
      */
     var $Image = function(data) {
      if (!(this instanceof $Image)) {
        return new $Image(data);
      }

      // file meta
      this.name = data.name || '';
      this.size = data.size || '';
      this.type = data.type || '';

      // original file
      this._original = data;

      return this;
     };

     /**
      * crops the image
      * @return {$q.deferred}
      */
     $Image.prototype.crop = function() {
        var deferred = $q.defer();

        // TODO: implement $Image.prototype.crop

        return deferred.promise;
     };

     /**
      * gets the file data for the image
      * @return {$q.deferred)
      */
     $Image.prototype.getFile = function() {
        var deferred = $q.defer();

        // TODO: implement $Image.prototype.getFile

        return deferred.promise;
     };

    /* ==========================================================================
       Initialization logic
       ========================================================================== */

    return $Image;
  }
]);