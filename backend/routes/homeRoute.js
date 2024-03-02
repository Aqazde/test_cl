import { Router } from "express";
import axios from "axios";

const homeRoute = Router();

homeRoute.get("/", async (req, res) => {
    const book1 = await axios.get('https://freetestapi.com/api/v1/books/2');
    const book1ImageUrl = book1.data.cover_image;

    const book2 = await axios.get('https://freetestapi.com/api/v1/books/5');
    const book2ImageUrl = book2.data.cover_image;

    const time = await getTime("Asia", 'Bishkek')
    console.log(time)

    const info = await axios.get('https://www.alphavantage.co/query?range=day&function=NEWS_SENTIMENT&tickers=AAPL&limit=1&apikey=6FBHBGH5Z2950D1R');

    res.render("index", {
        title: "Home",
        isLoggedIn: req.signedCookies.isLoggedIn,
        isAdmin: req.signedCookies.isAdmin,
        language: req.signedCookies.language,
        book1ImageUrl,
        book2ImageUrl,
        time,
    });
});

const getTime = async (area, location) => {
    const timeRes = await axios.get(`https://worldtimeapi.org/api/timezone/${area}/${location}`);
    const time = timeRes.data.utc_datetime;
    const date = new Date(time);

// Format the date into a user-friendly string
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
    return date.toLocaleDateString('ru-RU', options);
}

export { homeRoute };