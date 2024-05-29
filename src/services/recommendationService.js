const config = require("../config/config");

exports.getBooksByGenre = (request, response) => {
    try {
        let subject = request.query.genre;
        console.log("genre " + subject);
        fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&maxResults=5`)
            .then(response => response.json())
            .then(result => {
                response.send({ books: result.items })
            })
    } catch (e) {
        res.status(404).send({
            message: `error while getting book recommendation`
        });
    }

};

exports.getBooksByAuthor = (request, response) => {
    try {
        let author = request.query.author;
        console.log("aauthor " + author);
        fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&maxResults=5`)
            .then(response => response.json())
            .then(result => {
                response.send({ books: result.items })
            })
    } catch (e) {
        res.status(404).send({
            message: `error while getting book recommendation`
        });
    }

};