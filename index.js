const core = require('@actions/core');
const { Octokit } = require('@octokit/rest');

async function run() {
  try {
    const token = core.getInput('token');
    const repository = core.getInput('repository');
    const actionType = core.getInput('action');
    const variableName = core.getInput('variable_name');
    const variableValue = core.getInput('variable_value');

    const [owner, repo] = repository.split('/');

    const octokit = new Octokit({ auth: token });

    if (actionType === 'get') {
      const { data } = await octokit.rest.actions.listRepoVariables({
        owner,
        repo
      });

      const variable = data.variables.find(v => v.name === variableName);

      if (variable) {
        core.setOutput('value', variable.value);
        core.setOutput('available', true);
        core.info(`Variable ${variableName} exists with value: ${variable.value}`);
      } else {
        core.setOutput('value', '');
        core.setOutput('available', false);
        core.info(`Variable ${variableName} does not exist.`);
      }
    } else if (actionType === 'create') {
      if (!variableValue) {
        core.setFailed('Variable value is required for creation.');
        core.setOutput('success', false);
        return;
      }

      // Create variable
      try {
        await octokit.rest.actions.createRepoVariable({
          owner,
          repo,
          name: variableName,
          value: variableValue
        });
        core.setOutput('success', true);
        core.info(`Variable ${variableName} created.`);
      } catch (error) {
        core.setOutput('success', false);
        core.setFailed(`Failed to create variable ${variableName}: ${error.message}`);
      }
    } else if (actionType === 'update') {
      if (!variableValue) {
        core.setFailed('Variable value is required for update.');
        core.setOutput('success', false);
        return;
      }

      // Update variable
      try {
        await octokit.rest.actions.updateRepoVariable({
          owner,
          repo,
          name: variableName,
          value: variableValue
        });
        core.setOutput('success', true);
        core.info(`Variable ${variableName} updated.`);
      } catch (error) {
        core.setOutput('success', false);
        core.setFailed(`Failed to update variable ${variableName}: ${error.message}`);
      }
    } else {
      core.setFailed('Invalid action type. Use check, create, or update.');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
