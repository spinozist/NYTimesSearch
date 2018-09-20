
window.onload = function () {
  console.log("window.onload fired");

  var searchInput = "";
  var beginDate = ""
  var endDate = "";
  var articleCount = $(`#num-records`).val(5);
  var sort = "newest";
  var today = new Date();
  var yyyy = today.getFullYear();
  var mm = today.getMonth() + 1;
  var dd = today.getDate();

  if (dd<10) {
    dd = `0${dd}`
  };

  if (mm<10) {
    mm= `0${mm}`
  };

  var runQuery = function () {
    searchInput = $(`#search-term`).val();
    beginDate = $(`#start-date`).val();
    endDate = $(`#end-date`).val();
    articleCount = $(`#num-records`).val();

    if (beginDate === "") {
      beginDate = `${yyyy}0101`
    };

    if (endDate === "") {
      endDate = `${yyyy}${mm}${dd}`
    };
    

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?' + $.param({
      'api-key': "ebfbeb51a8d54753aeba98515e5eeea9",
      'q': searchInput,
      'begin_date': beginDate,
      'end_date': endDate,
      'sort': sort,
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
  }

  $("#clear-query").on("click", function () {
    $(`#search-term`).val("");;
    $(`#start-date`).val("");
    $(`#end-date`).val("");
    $(`#num-records`).val(5);
    $(`#search-results`).empty();
  });

  $("#newest-button").on("click", function () {
    $(`#search-results`).empty();
    sort = "newest";
    runQuery();
  });

  $("#oldest-button").on("click", function () {
    $(`#search-results`).empty();
    sort = "oldest";
    runQuery();
  });

  $("#clear-button").on("click", function () {
    $(`#search-results`).empty();
  });

  $("#search-button").on("click", function () {
    console.log("Button.onload fired");
    runQuery();

  });

};


