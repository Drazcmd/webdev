
casper.test.begin("Test Rice Website", 5, function(test) {

    casper.start('http://www.rice.edu', function() {
          // assert the title is correct
          // assert that there is an image with source rice-logo
          // assert there is a search input box
          // fill in the search box with "Leebron" and submit the form
     })

    function findPeopleEmail() {
         // find the email address of all people results
         // return as an array
    }

    casper.then(function() {
          var people = this.evaluate(findPeopleEmail)
          test.assertEquals(people.length, 2, 'There were 2 people found named Leebron')
          // assert that one of the people has the email: president@rice.edu
    })

    function findCompensation() {
         // look in the search results for the article about compensation
         // then examine the summary of that article and find the dollar figures
         // finally get the largest one of those and return it
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
