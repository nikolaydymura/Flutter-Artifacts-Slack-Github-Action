const core = require("@actions/core");
const github = require("@actions/github");

async function action(payload) {

    const buildNumber = parseInt(core.getInput("build-number", { required: true }));
    const jiraHost = core.getInput("jira-host", { required: true });
    const keyRegex = core.getInput("key-regex", { required: true });
    const iosVersion = core.getInput("ios-version-name", { required: true });
    const iosReleaseUrl = core.getInput("ios-release-url", { required: true });
    const iosInstallUrl = core.getInput("ios-install-url", { required: true });
    const androidVersion = core.getInput("android-version-name", { required: true });
    const androidReleaseUrl = core.getInput("android-release-url", { required: true });
    const androidInstallUrl = core.getInput("android-install-url", { required: true });
    const commitMessage = core.getInput("head-commit-message", { required: true });
    const actor = github.context.actor;
    const refName= github.context.ref;
    const repo = github.context.repo;
    const buildUrl = `https://github.com/${repo.owner}/${repo.repo}/actions/runs/${github.context.runId}`

    const issueKey = getIssueKey(commitMessage, keyRegex);
    if (!issueKey) {
        core.error(`Issue key not found in ${commitMessage}. Is ${keyRegex} correct?`);
        return;
    }
    const issueUrl = `https://'${jiraHost}'/browse/'${issueKey}`

    const messageBody = {
        text: `${refName}' ('${buildNumber}') was successfully built!`,
        blocks: [
            {
                type: "header",
                text: {
                    type: "plain_text",
                    text: `${refName}' ('${buildNumber}') was successfully built!`
                }
            },
            {
                type: "divider"
            },
            {
                type: "section",
                fields: [
                    {
                        type: "mrkdwn",
                        text: `Github Actor:\n*${actor}*`
                    },
                    {
                        type: "mrkdwn",
                        text: `Git Branch:\n*${refName}*`
                    }
                ]
            },
            {
                type: "divider"
            },
            {
                type: "context",
                elements: [
                    {
                        type: "mrkdwn",
                        text: `Build URL: ${buildUrl}`
                    }
                ]
            },
            {
                type: "context",
                elements: [
                    {
                        type: "mrkdwn",
                        text: `Issue URL: ${issueUrl}`
                    }
                ]
            },
            {
                type: "divider"
            },
            {
                type: "actions",
                elements: [
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: `Open iOS ${iosVersion}`
                        },
                        style: "primary",
                        url: iosReleaseUrl
                    },
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: `Install iOS ${iosVersion}`
                        },
                        url: iosInstallUrl
                    }
                ]
            },
            {
                type: "divider"
            },
            {
                type: "actions",
                elements: [
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: `Open Android ${androidVersion}`
                        },
                        style: "primary",
                        url: androidReleaseUrl
                    },
                    {
                        type: "button",
                        text: {
                            type: "plain_text",
                            text: `Install Android ${androidVersion}`
                        },
                        url: androidInstallUrl
                    }
                ]
            }
        ]
    };

    console.log(JSON.stringify(messageBody));

    core.setOutput("message-payload", JSON.stringify(messageBody));
}

function getIssueKey(message, pattern) {
    const regex = new RegExp(pattern, "g");
    const matches = regex.exec(message);
    return matches[1];
}
module.exports = {
    action
};