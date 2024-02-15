const { response } = require("express");

const trakt = "https://api.trakt.tv"; //base URL for any Trakt API requests

/*
 * Functions for Trakt API requests.
 */

// Function to get array of trending movies
async function getTrendingMovies() {
  const reqUrl = `${trakt}/movies/trending`;
  let options = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'trakt-api-version': 2,
      'trakt-api-key': process.env.TRAKT_CLIENT_ID
    }
  };

  let response = await fetch(
    reqUrl,
    options
  );

  return await response.json(); // serialization
}

// function to get ratings of movies
async function getMovieRating(id){
  const reqUrl = `${trakt}/movies/${id}/ratings`;
  let options = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'trakt-api-version': 2,
      'trakt-api-key': process.env.TRAKT_CLIENT_ID
    }
  };

  let response = await fetch(
    reqUrl,
    options
  );

  return await response.json();
}

//function to get top 15 popular shows
async function getPopularShows() {
  
  const reqUrl = `${trakt}/shows/popular?page=1&limit=15`; // remove curly brackets for values
  let options = {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'trakt-api-version': 2,
      'trakt-api-key': process.env.TRAKT_CLIENT_ID
    }
  };

  let response = await fetch(
    reqUrl,
    options
  );

  return await response.json();
}

module.exports = {
  getTrendingMovies,
  getMovieRating,
  getPopularShows
}