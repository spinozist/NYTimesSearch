var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
url += '?' + $.param({
  'api-key': "ebfbeb51a8d54753aeba98515e5eeea9",
  'q': "query",
  'begin_date': "20180808",
  'end_date': "20180808",
  'sort': "newest"
});
$.ajax({
  url: url,
  method: 'GET',
}).done(function(result) {
  console.log(result);
}).fail(function(err) {
  throw err;
});

