const recommendation = require('../services/recommendationService');

exports.getBooksByGenre = (request, response) => {
    try {
        recommendation.getBooksByGenre(request, response);
    } catch (error) {
        response.status(500).json({ message: 'Failed to fetch book recommendation.' });
    }
};

exports.getBooksByAuthor = (request, response) => {
    try {
        recommendation.getBooksByAuthor(request, response);
    } catch (error) {
        response.status(500).json({ message: 'Failed to fetch book recommendation.' });
    }
};