

  var termInput = "Trump";
  var beginDate = "20180101";
  var endDate = "20180808";
  var articleCount = 5;

  var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  url += '?' + $.param({
    'api-key': "ebfbeb51a8d54753aeba98515e5eeea9",
    'q': termInput,
    'begin_date': beginDate,
    'end_date': endDate,
    'sort': "newest"
  });
  $.ajax({
    url: url,
    method: 'GET',
  }).done(function (result) {
    console.log(result.response);
    for (i = 0; i < articleCount; i++) {
      var resultBlock = $(`<div>`);
      resultBlock.html(`
    <a href="${result.response.docs[i].web_url}">
    <h5>${result.response.docs[i].headline.main}</h5>
    </a>
    <em>${result.response.docs[i].byline.original}</em>
    <p>${result.response.docs[i].pub_date}</p>
    <p id="snippet">${result.response.docs[i].snippet}</p><br>
    `)
      $(`#search-results`).append(resultBlock);
    };
  }).fail(function (err) {
    throw err;
  });


