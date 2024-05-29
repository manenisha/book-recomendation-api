const express = require('express');
const sequelize = require('./models/index');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const recommendation = require('./routes/recommendationRoutes');
const user = require('./models/user');
const books = require('./models/book');
const review = require('./models/review');
const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/reviews', reviewRoutes);
app.use('/recommendation', recommendation)

sequelize
    .sync()
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });
module.exports = app;
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}.`);
// });