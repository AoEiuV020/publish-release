const core = require('@actions/core')
const { GitHub, context } = require('@actions/github')

async function main() {
  const release_id = core.getInput('release_id')

  const github = new GitHub(process.env.GITHUB_TOKEN)
  const { owner: currentOwner, repo: currentRepo } = context.repo
  const owner = core.getInput('owner', { required: false }) || currentOwner
  const repo = core.getInput('repo', { required: false }) || currentRepo

  await github.repos.updateRelease({ owner, repo, release_id, draft: false })
  console.log(`Published release with id ${release_id}`)
}

async function run() {
  try {
    await main()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
