jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

 var urlRegex = /^(https?|ftp)\:\/\/[^\s/$.?#].[^\s]*$/i;

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('has a URL defined', function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeTruthy();
                expect(feed.url).toMatch(urlRegex);
            });
         });

         it('has a name defined', function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeTruthy();
            });
         });
    });

    describe('The Menu', function() {
        var $body = $('body');
        var $menu = $body.find('.slide-menu');
        var $button = $body.find('.menu-icon-link');

        it('is hidden by default', function(){
            expect($body.hasClass('menu-hidden')).toBeTruthy();
            expect($menu.css('transform')).not.toEqual('matrix(1, 0, 0, 1, 0, 0)');
        });

        it('is show and hide when clicked in button', function(done){
            $button.click();

            setTimeout(function(){
                expect($body.attr('class')).not.toMatch('menu-hidden');
                expect($menu.css('transform')).toEqual('matrix(1, 0, 0, 1, 0, 0)');

                $button.click();

                setTimeout(function(){
                    expect($body.attr('class')).toMatch('menu-hidden');
                    expect($menu.css('transform')).not.toEqual('matrix(1, 0, 0, 1, 0, 0)');
                    done();
                }, 205);
            }, 205);

        });
    });

    describe('Initial Entries', function() {

        it('there is at least a single entry', function(done){
            loadFeed(0, function(){
                expect($('.feed .entry').length).toBeGreaterThan(0);
                done();
            });
        });
    });

    describe('New Feed Selection', function() {
        var $title = $('.header-title');
        var $container = $('.feed');

        beforeEach(function(done){
            loadFeed(0, done);
        });

        it('is change the title', function(done){
            expect($title.html()).toEqual(allFeeds[0].name);
            loadFeed(1, function(){
                expect($title.html()).toEqual(allFeeds[1].name);
                done();
            });
        });

        it('is change the content', function(done){
            var fristItemContent = $container.children().eq(0).find('h2').html();
            loadFeed(1, function(){
                var newfristItemContent = $container.children().eq(0).find('h2').html();
                expect(newfristItemContent).not.toEqual(fristItemContent);
                done();
            });
        });
    });
}());
