# github-actions-manage-repo-variables

# Repository Variable Manager

This GitHub Action allows you to check, create, and update repository variables.

## Inputs

| Name           | Description                                   | Required |
|----------------|-----------------------------------------------|----------|
| `token`        | GitHub token                                  | true     |
| `repository`   | Repository name in the format owner/repo      | true     |
| `action`       | Action to perform: `get`, `create`, `update`  | true     |
| `variable_name`| The name of the variable                      | true     |
| `variable_value`| The value of the variable (for create/update)| false    |

## Outputs

| Name       | Description                                          |
|------------|------------------------------------------------------|
| `value`    | The value of the variable                            |
| `available`| Whether the variable is available (for `get` action) |
| `success`  | Whether the create or update operation was successful|

## Usage

To use this action, create a workflow YAML file in your `.github/workflows` directory.

```yaml
name: Manage Repository Variables

on: [push]

jobs:
  manage-variables:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Manage repository variables
        uses: vivek-kk-ragavan/github-actions-manage-repo-variables@main
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          repository: 'owner/repo'
          action: 'get' or 'create' or 'update'
          variable_name: 'YOUR_VARIABLE_NAME'
          variable_value: 'YOUR_VARIABLE_VALUE'  # required for create/update
```

## Example

### Get Repository Variable

```yaml
- name: Get repository variable
  uses: vivek-kk-ragavan/github-actions-manage-repo-variables@main
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    repository: 'owner/repo'
    action: 'get'
    variable_name: 'YOUR_VARIABLE_NAME'
```

### Create Repository Variable

```yaml
- name: Create repository variable
  uses: vivek-kk-ragavan/github-actions-manage-repo-variables@main
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    repository: 'owner/repo'
    action: 'create'
    variable_name: 'YOUR_VARIABLE_NAME'
    variable_value: 'YOUR_VARIABLE_VALUE'
```

### Update Repository Variable

```yaml
- name: Update repository variable
  uses: vivek-kk-ragavan/github-actions-manage-repo-variables@main
  with:
    token: ${{ secrets.GITHUB_TOKEN }}
    repository: 'owner/repo'
    action: 'update'
    variable_name: 'YOUR_VARIABLE_NAME'
    variable_value: 'YOUR_VARIABLE_VALUE'
```

