/*!
 * jQuery Equal Heights
 *
 * @description: Ensures the elements matched are the height of the highest element.
 * @source: http://github.com/nomensa/jquery.equal-heights
 * @version: '0.1.2'
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
        target: '.column-inner', // the target element to apply equal heights
        breakpoint: '768' // A pixel value of the width of the window where the equal height should be applied
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
            var windowWidth = $(window).width();
            if (windowWidth > self.options.breakpoint) {

                var maxHeight = 0;

                // Filter elements to find the highest one
                self.target.each(function() {
                    if ($(this).height() > maxHeight) {
                        maxHeight = $(this).height();
                    }
                });

                self.target.css({'min-height': maxHeight});
            }
        }

        $(window).on('debouncedresize', function() {
            self.destroy();
            init();
        });

        init();
    }

    EqualHeights.prototype.destroy = function() {
    /*
     return the dom to it's original form
     */
        $(this.options.target, this.element).each(function () {
            $(this).css('min-height', '');
        });

        this.element.removeData('plugin_' + pluginName);
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
