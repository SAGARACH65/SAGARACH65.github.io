let checkIfSelected = video => {
    return ((video.width === 150 && video.height === 200) ? true : false);
}

let getMovies = movieLists => {

    let resultMovies = [];
    movieLists.map(movieList => {

        movieList.videos.map(video => {

            video.boxarts.map(boxart => {
                let result = {};
               

                if (checkIfSelected(boxart)) {
                    result['id'] = video.id;
                    result['title'] = video.title;
                    result['url'] = boxart.url;

                    resultMovies.push(result);
                }
            })

        })
    })

    return resultMovies;
}

console.log(getMovies(movieLists));