
casper.test.begin("Test Rice Website", 5, function(test) {

    casper.start('http://www.rice.edu', function() {
          test.assertTitle('Rice University', 'Title is correct')
          test.assertExists('img[src="_images/rice-logo.jpg"]', 'Rice logo exists')
          test.assertExists('input[name="search"]', 'Search box exists')
          this.fill('form[name="gs"]', { 'search': "Leebron" }, true )
     })

    function findPeople() {
         var people = document.querySelectorAll('.email a')
         return Array.prototype.map.call(people, function(e) {
              return e.getAttribute('href')
         })
    }

    casper.then(function() {
          var people = this.evaluate(findPeople)
          test.assertEquals(people.length, 2, 'There were 2 people found named Leebron')
          Array.prototype.forEach.call(people, function(person) {
               if (person === "president@rice.edu") {
                    test.assert(true, 'Found president@rice.edu')
               }
          })
    })

    function findCompensation() {
         var results = document.querySelectorAll('.result a')
         var max = 0
         Array.prototype.forEach.call(results, function(e) {
               if (e.textContent.indexOf('compensation') > 0) {
                    // the <a> is a child of <h1>
                    // which has a sibling <span> with the summary
                    var summary = e.parentElement.parentElement.children[1].textContent
                    // find all $ and report largest value
                    var values = summary.match(/\$[0-9,]+/g).map(function(s) {
                         return parseInt(s.replace(/,/g,'').substr(1))
                    })
                    max = Math.max.apply(null, values)
               }
         })
         return max
    }

    casper.then(function() {
         var compensation = this.evaluate(findCompensation)
         var expected = 795395
         test.assertEqual(compensation, expected, 'Found correct compensation of ' + expected)
    })

    casper.run(function() {
         test.done()
    })

})
