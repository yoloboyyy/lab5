var parentTag = document.getElementById("movieBibliotek");
fetch("movies.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    const posterCommonPath = "http://image.tmdb.org/t/p/w300";
    let arr = new Array();
    for (var i = 0; i < json.results.length; i++) {
      arr[i] = json.results[i].id;
      var listItem = document.createElement("div");
      listItem.setAttribute("class", "muvieBlock");
      var url = posterCommonPath + json.results[i].poster_path;
      listItem.innerHTML = "<h2>" + json.results[i].title + "</h2>";
      listItem.innerHTML +=
        '<div class="checkBoxStyle"><label><input class="check" type="checkbox" id="' +
        json.results[i].id +
        '"><span class="label-text">click here to view later</span></label></div>';
        listItem.innerHTML +=
        '<div class="averageBlock">' +
        "★" +
        json.results[i].vote_average +
        "</div>";
      listItem.innerHTML += '<div class="imageBlock"><img src=' + url + '></div>';
      listItem.innerHTML +=
        '<div class="overviewBlock">' + json.results[i].overview + "</div>";
      
      parentTag.appendChild(listItem);
    }
    console.log(arr);

    function storageSupport() {
      if (typeof Storage != "undefined") {
        console.log("web storage is supported");
        getData();
        isClicked();
      } else {
        alert("Sorry your broweser do not support web storage.");
      }
    }

    function isClicked() {
      for (let i = 0; i < arr.length; i++) {
        let idChekBox = document.getElementById(arr[i]);
        idChekBox.onclick = (function(j) {
          return function() {
            this.checked ? setData(arr[j]) : removeData(arr[j]);
          };
        })(i);
      }
    }

    function setData(ele) {
      localStorage.setItem(ele, "true");
    }

    function removeData(ele) {
      localStorage.removeItem(ele);
    }

    function getData() {
      for (let i = 0; i < arr.length; i++) {
        let c = document.getElementById(arr[i]);
        localStorage.getItem(arr[i]) ? (c.checked = true) : (c.checked = false);
      }
    }

    storageSupport();
  });
