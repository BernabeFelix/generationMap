Generation Take-Home Coding Challenge
=================================
This is a take-home coding challenge used to help evaluate candidates
interested in joining the team at Generation.
The goal is for candidates to complete the coding challenge before the
in-person interview so that we can discuss the solution together.
In cases where this is not possible, we may discuss the solution together
over a followup phone call.

### Notes
* Added little-loader because fetch/request/request-promise, all of them, had CORS problem with Google Maps Api
* Why are markers loading so slow? because of api query limit. Actually if you look at the console, even with 1  req/sec, there are **OVER_QUERY_LIMIT** errors.
  * You can change **delay** and/or **maxReqPerDelay**, in src/components/map/utils.js/createMarkers(), to see this problem. 

### Dependencies Added
* little-loader for requests
* material-ui for visuals

### DevDependencies Added
* react-addons-test-utils/enzyme for testing
* babel-polyfill for async/await usage
