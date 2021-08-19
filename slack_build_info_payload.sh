#!/bin/bash

ISSUE_KEY=$(echo "${COMMIT_MESSAGE}" | sed -E 's/'${ISSUE_KEY_REGEX}'/\1/g')

if [[ -z "$ISSUE_KEY" ]]; then
  echo "::error file=$(basename "$0"),line=$LINENO,col=0::Issues key in commit message not found"
  exit 1
fi

slack_message_payload=$(sed 's/\s+/ /g' $1 |
  sed -e ':a' -e 'N' -e '$!ba' -e 's/\n//g' |
  sed 's,__message_body__,'${REF_NAME}' ('${BUILD_NUMBER}') was successfully built!,g' |
  sed 's,__git_branch__,'${REF_NAME}',g' |
  sed 's/__git_actor__/'${GIT_ACTOR}'/g' |
  sed 's,__build_url__,'${BUILD_URL}',g' |
  sed 's,__issue_url__,https://'${JIRA_HOST}'/browse/'${ISSUE_KEY}',g' |
  sed 's,__ios_release_url__,'${IOS_RELEASE_URL}',g' |
  sed 's,__ios_version__,'${IOS_VERSION_NAME}',g' |
  sed 's,__android_release_url__,'${ANDROID_RELEASE_URL}',g' |
  sed 's,__android_version__,'${ANDROID_VERSION_NAME}',g')

echo "::set-output name=message_payload::${slack_message_payload}"
