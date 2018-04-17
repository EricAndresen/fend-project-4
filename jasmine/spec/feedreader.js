$(function() {

    
    describe('RSS Feeds', function() {
        // check that there are feeds
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //check that each feed has a url property
        it('should each have a URL', () =>{
            allFeeds.forEach((feed) => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });
        
        //check that each feed has a name property
        it('should each have a name', () =>{
            allFeeds.forEach((feed) => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    describe("The menu", () => {

        beforeEach(() => {
            body = document.querySelector('body');
        });

        // check that menu is hidden by default
        it('is hidden', () => {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });
    
       // check that menu unhides on click and rehides when clicked again
       it('unhides on click', () => {
            const menuIcon = document.querySelector('.menu-icon-link');

            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            
            menuIcon.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
       });
    });
      
    describe("Initial Entries", () => {

        // load feed before each test is run (correct for asyncronous loading)
        beforeEach(function(done){
            loadFeed(0, () => done());
        });

        // check that there are elements rendered on the page
        it('loads atleast one element onto the page', function(done) {
            const feed = document.querySelector('.feed');
            const entries = feed.querySelectorAll('.entry')
            expect(entries).not.toBe(0);
            done();
        });

    });

    describe("New Feed Selection", () => {

        // get current feed state
        const feed = document.querySelector('.feed');
        const feedSnapshot = feed.innerHTML

        // change the feed loaded
        beforeEach((done) => loadFeed(1, () => done()));

        // check that there is different content before and after a new feed is loaded
        it('loads new content when new feed is loaded', (done) => {
            expect(feed.innerHTML == feedSnapshot).toBe(false);
            done();
        });
    });
}());
