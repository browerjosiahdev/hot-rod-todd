using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Hot_Rod_Todd.Controllers
{
    public class HotRodToddController : ApiController
    {
        /// <summary>
        /// Use the HTTP POST method to access this web api call that
        /// will add a new high score to the database with the name
        /// and score.
        /// </summary>
        /// <param name="userHighScore">
        /// Object containing "name" and "score" properties. The "name" property has a limit of 3 characters, and the "score" property has to be an integer.
        /// </param>
        /// <returns>
        /// An HTTP status code defining whether the request went through okay, or if there was an error.
        /// </returns>
        [HttpPost]
        [ActionName("highscore")]
        public HttpResponseMessage AddHighScore (high_score userHighScore)
        {
            try
            {
                var entities = new HotRodToddEntities();
                entities.high_score.Add(userHighScore);
                entities.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception err)
            {
                return Request.CreateResponse(HttpStatusCode.ExpectationFailed);
            }
        }

        /// <summary>
        /// Use the HTTP GET method to access this web api call that
        /// will return a list of objects containing the name and
        /// score of all scores in the database from highest to lowest.
        /// </summary>
        /// <returns>
        /// A list of high score objects containing a "name" and "score"
        /// property if successful, or a list containing one object with
        /// an "error" property if there was an issue.
        /// </returns>
        [HttpGet]
        [ActionName("highscore")]
        public IEnumerable<dynamic> GetHighScore ()
        {
            try
            {
                // Try to get the list of high scores
                // from the database.
                var entities = new HotRodToddEntities();
                var scores = entities.high_score.AsEnumerable().OrderBy(highScores => highScores.score).Select(userScore => new { name = userScore.name, score = userScore.score }).Reverse();
                return scores.ToList();
            }
            catch (Exception err)
            {
                // If we can't get the list of high scores
                // for some reason, return a list with the
                // first object containing the error.
                var list = new List<dynamic>();
                list.Add(new
                {
                    error = err
                });
                return list;
            }
        }
    }
}
