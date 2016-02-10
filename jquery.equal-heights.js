/*!
 * jQuery Equal Heights
 *
 * @description: Ensures the elements matched are the height of the highest element.
 * @source: http://github.com/nomensa/jquery.equal-heights
 * @version: '1.0.1'
 *
 * @author: Nomensa
 * @license: licenced under MIT - http://opensource.org/licenses/mit-license.php
 */
(function ($, window, document, undefined) {
    'use strict';

    var pluginName,
        defaults;

    pluginName = 'equalheights';
    defaults = {
        // The target element to apply equal heights
        target: '.column-inner'
    };

    function EqualHeights(element, options) {
    /*
     Plugin constructor
     */
        var self = this;

        self.element = $(element);
        // Combine user options with default options
        self.options = $.extend({}, defaults, options);
        self.target = self.element.find(self.options.target);

        function init() {
            var maxHeight = 0;

            // Filter elements to find the highest one
            self.target.each(function() {
                if ($(this).height() > maxHeight) {
                    maxHeight = $(this).height();
                }
            });

            self.target.css({'min-height': maxHeight});
        }

        $(window).on('debouncedresize', function() {
            self.destroy();
            init();
        });

        init();
    }

    // PUBLIC API
    EqualHeights.prototype.rebuild = function() {
    /*
        rebuild the plugin and apply equal heights
    */
        return new EqualHeights(this.element, this.options);
    };


    EqualHeights.prototype.destroy = function() {
    /*
     return the dom to it's original form
     */
        return $(this.options.target, this.element).each(function () {
            $(this).css('min-height', '');
        });

    };

    $.fn[pluginName] = function (options) {
    /*
     Initialise an instance of the plugin on each selected element. Guard against duplicate instantiations.
    */
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new EqualHeights(this, options));
            }
        });
    };

})(jQuery, window, document);