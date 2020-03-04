const fetch = require('node-fetch');

const ENV = require('./environments');

function fetchGitHubApi(url) {
  return fetch(url, {
    headers: {
      Authorization: `token ${ENV.TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
}

function getActionResultFetchList(url) {
  return idList => idList.map(id => fetchGitHubApi(url.replace('$id', id)).then(r => r.json()));
}

function calculateTotalExecutionMinutes(executionResultList) {
  const summedUpSeconds = executionResultList
    .reduce((pre, cur) => pre.concat(cur.workflow_runs), [])
    .map(rd => {
      const runStartDate = new Date(rd.created_at);
      const runEndDate = new Date(rd.updated_at);
      const elapsedTime = runEndDate.getTime() - runStartDate.getTime();
      return elapsedTime / 1000;  // convert millisecond -> second
    })
    .reduce((pre, cur) => pre + cur, 0)  // sum up second
  ;
  return summedUpSeconds / 60;  // convert second -> minute
}

function routes(app) {
  app.get('/', (req, res) => res.send('Running GitHub Actions Reporter!'));

  app.get('/actions-execution-time', (req, res) => {
    const owner = ENV.ORGANIZATION;
    const repo = req.query.repo;

    fetchGitHubApi(`https://api.github.com/repos/${owner}/${repo}/actions/workflows`)
      .then(response => response.json())
      .then(responseJson => responseJson.workflows.map(w => w.id))
      .then(workflowIdList => Promise.all(getActionResultFetchList(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/$id/runs`)(workflowIdList)))
      .then(executionResultList => calculateTotalExecutionMinutes(executionResultList))
      .then(totalMinutes => res.json({ repository: repo, totalMinutes }))
      .catch(e => console.error(e));
  });
}

module.exports = routes;
