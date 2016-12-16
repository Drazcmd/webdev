describe('Jasmine test of jQuery page', function() {

  beforeEach(function() {
    var loadThePage = false

    if (loadThePage) {
      // We could load the page
      $.ajax({
        dataType: 'html',
        url: 'hello-jquery.html',
        success: function(data) {
          $('body').append($(data))
          $('window').trigger('load')
        }
      })

    } else {
      // or add a fixture of our own HTML

      $('#fixture').remove();
      var html = 
          '<div id="fixture">'
          + '<div id="div1" class="mydiv" style="background-color:blue;">'
            + 'Click to Hide</div>'
          + '<div id="div2" class="mydiv" style="background-color:red;">'
            + 'Click to Show</div>'
          + '<div id="div3" class="mydiv" style="background-color:green;">'
            + 'Go!</div>'
        + '</div>'
        + '<script src="hello-jquery.js"></script>'
      $('body').append(html)
    }

  })  

  it('should load with 3 divs', function() {
      expect($('#fixture').children().length).toBe(3)
  })

  var clickFirstDiv = function($) {
    return new Promise (function(resolve, reject) {
      $('#div1').trigger("click");
      setTimeout(function() {
        resolve($)
      }, 2000)
    })
  }

  var clickSecondDiv = function($) {
    return new Promise (function(resolve, reject) {
      $('#div2').trigger("click");
      setTimeout(function() {
        resolve($)
      }, 500)
    })
  }

  it("should click first div makes it vanish", function(done) {
    var $div1 = $('#div1')
    expect($div1.is(":visible")).toBe(true)
    clickFirstDiv($).then(function() {
      expect($div1.is(":visible")).toBe(false)
      done()
    })
  })


  it("should click second div makes first visible", function(done) {
    clickFirstDiv($)
      .then(clickSecondDiv) 
      .then(function() {
        expect($("#div1").is(":visible")).toBe(true)
        done()
      })
  })

})
