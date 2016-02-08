'use strict';

describe('equalHeights', function () {

    var markUp1 =
        '<div id="main">'+
            '<div class="column-outer">'+
                '<div class="column-inner">' +
                    '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>'+
                '</div>'+
                '<div class="column-inner">'+
                    '<p>Aenean id mi eu purus rutrum euismod vel vitae tellus. Pellentesque a ligula ante.</p>'+
                '</div>'+
                '<div class="column-inner">'+
                    '<p>Morbi ac mi nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at ante ut diam dapibus imperdiet. Sed ac enim pharetra, faucibus mi at, luctus eros.</p>'+
                '</div>'+
            '</div>'+
        '</div>',
        testElement1;


    var markUp2 =
        '<div id="main">'+
            '<div class="column-outer">'+
            '</div>'+
        '</div>',
        testElement2;


    beforeEach(function () {
        testElement1 = $(markUp1);
    });

    beforeEach(function () {
        testElement2 = $(markUp2);
    });

    describe('plugin initialisation', function () {

        describe('The jQuery equal-heights plugin', function() {
            it("depends on jQuery", function() {
                expect($).toBeDefined();
            });
        });

        it('should be protected against multiple instantiations', function () {
            var plugin = testElement1.equalheights();
            expect(plugin === testElement1.equalheights()).toBe(true);
        });

        it('should be available with the equalheights identifier', function () {
            expect($('<div></div>').equalheights).toBeDefined();
        });
    });

    describe('The init function', function() {

        it('should only add equal heights if the window width is great than the default breakpoint value (768px) wide', function() {
            testElement1.equalheights();
            testElement1
                .find('.column-inner:nth-child(1)').height(330)
                .find('.column-inner:nth-child(2)').height(250)
                .find('.column-inner:nth-child(3)').height(276);
            expect(testElement1.find('.column-inner').attr('style')).not.toMatch(/min-height: 300px/);
        });

        it('sets a style attribute with a min-height value on each target element', function() {
            testElement1
                .find('.column-inner:nth-child(1)').height(330)
                .find('.column-inner:nth-child(2)').height(250)
                .find('.column-inner:nth-child(3)').height(276);
            testElement1.equalheights({
                breakpoint: '300'
            });
            expect(testElement1.find('.column-inner').attr('style')).toContain('min-height: 330px');
        });

        it('sets the target elements to the same min height', function() {
            testElement1
                .find('.column-inner:nth-child(1)').height(330)
                .find('.column-inner:nth-child(2)').height(250)
                .find('.column-inner:nth-child(3)').height(276);
            testElement1.equalheights();
            expect(testElement1.find('.column-inner').css('height')).toBe('330px');
        });

        it('should not set min-height if child elements have the wrong class', function() {
            testElement1.equalheights({
                target: 'columns'
            });
            expect(testElement1.find('.columns').length).toBe(0);
        });

        it('no child elements should result in no matching elements', function() {
            testElement2.equalheights();
            expect(testElement2.find('.column-inner').length).toBe(0);
        });

        it('should call the destroy method and the init method when the browser window is resized', function() {
            testElement1
                .find('.column-inner:nth-child(1)').height(350)
                .find('.column-inner:nth-child(2)').height(250)
                .find('.column-inner:nth-child(3)').height(276);
            testElement1.equalheights({
                breakpoint: '300'
            });
            $(window).trigger('debouncedresize');
            expect(testElement1.find('.column-inner').attr('style')).toContain('min-height: 350px');
        });
    });

    describe('The plugin options', function() {

        it('should set the target value option to the one that was supplied', function() {
            testElement1.equalheights({
                target: 'column-inner'
            });
            expect(testElement1.find('div').hasClass('column-inner')).toBe(true);
        });

        it('should not apply equal heights if the window width is below the breakpoint value that was supplied', function() {
            testElement1
                .find('.column-inner:nth-child(1)').height(330)
                .find('.column-inner:nth-child(2)').height(250)
                .find('.column-inner:nth-child(3)').height(276);
            testElement1.equalheights({
                breakpoint: '300'
            });
            expect(testElement1.find('.column-inner').attr('style')).toContain('min-height: 330px');
        });

    });

    describe('The public api', function() {
        it('should reapply min-heights to the target elements after a repeat initialisation', function() {
            testElement1
                .find('.column-inner:nth-child(1)').height(350)
                .find('.column-inner:nth-child(2)').height(250)
                .find('.column-inner:nth-child(3)').height(276);
            testElement1.equalheights({
                breakpoint: '300'
            });
            testElement1.data('plugin_equalheights').destroy();
            testElement1.data('plugin_equalheights').rebuild();
            expect(testElement1.find('.column-inner').attr('style')).toContain('min-height: 350px');
        });

        it('should return the dom to it\'s original form when the destroy method is called', function() {
            testElement1
                .find('.column-inner:nth-child(1)').height(350)
                .find('.column-inner:nth-child(2)').height(250)
                .find('.column-inner:nth-child(3)').height(276);
            testElement1.equalheights({
                breakpoint: '300'
            });
            testElement1.data('plugin_equalheights').destroy();
            expect(testElement1.find('.column-inner').attr('style')).not.toContain('min-height: 350px');
        });
    });

});