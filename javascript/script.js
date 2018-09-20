
window.onload = function () {
  console.log("window.onload fired");


  // var runQuery = function () {

  $("#search-button").on("click", function () {

    $(`#search-term`).attr(`value`,`Kavanaugh`);
    $(`#start-date`).attr(`value`,`20180101`);
    $(`#end-date`).attr(`value`,`20180919`);
    $(`#num-records`).attr(`value`, 5);

    console.log("Button.onload fired");

    var searchInput = $(`#search-term`).val();
    var beginDate = $(`#start-date`).attr(`value`);
    var endDate = $(`#end-date`).attr(`value`);
    var articleCount = $(`#num-records`).attr(`value`);

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({

      'api-key': "ebfbeb51a8d54753aeba98515e5eeea9",
      'q': searchInput,
      'begin_date': beginDate,
      'end_date': endDate,
      'sort': "newest",
    });

    $.ajax({
      url: url,
      method: 'GET',
    }).then(function (result) {
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

  });
};
// };


