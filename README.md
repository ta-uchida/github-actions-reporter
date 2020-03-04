# GitHub Actions Reporter

This program output total execution minutes of GitHub Actions about argument repository.  
When you are not Owner of GitHub organization, you can total execution minutes.

## How to use
1. if you don't have personal access token of GitHub, you should get your access token.  
  cf) https://github.com/settings/tokens
2. you prepare `.env` file on root directory and set token.
3. `npm start` and `GET /actions-execution-time?repo=XXXXXX`

## * Note *
This program have experimented yet.  
It does not have Error handling and exception process and so on.  
I wait you send Pull Requests and Issues :)
