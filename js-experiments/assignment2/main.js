var checkIfSelected = function (video) {
    return ((video.width === 150 && video.height === 200) ? true : false);
}

var getMovies = function (movieLists) {
    var resultMovies = [];
    for (let k = 0; k < movieLists.length; k++) {

        var videos = movieLists[k].videos;

        for (var i = 0; i < videos.length; i++) {

            for (var j = 0; j < videos[i].boxarts.length; j++) {

                var videoBoxart = videos[i].boxarts[j];
                var result = {};

                if (checkIfSelected(videoBoxart)) {
                    result['id'] = videos[i].id;
                    result['title'] = videos[i].title;
                    result['url'] = videoBoxart.url;

                    resultMovies.push(result);
                }
            }
        }
    }
    return resultMovies;
}

console.log(getMovies(movieLists));