if (Meteor.isClient) {

  Meteor.startup(function() {
    $(window).scroll(function(event){
      Session.set('didScroll', true);
    });
  });

  Template.nav.onCreated(function() {
    Deps.autorun(function() {
      if(Session.get('didScroll')) {
        hasScrolled();
        Session.set('didScroll', false);
      }
    });
  });

  // Hide Header on on scroll down
  // inspired by https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c
  var lastScrollTop = 0;
  var delta = 32;

  function hasScrolled() {
    var st = Math.max($(this).scrollTop(), 0);

    if(Math.abs(lastScrollTop - st) <= delta) {
      return;
    }

    if (st > lastScrollTop) {
      $('.navbar').fadeOut(500);
    } else {
      $('.navbar').show();
    }

    lastScrollTop = st;
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
