#!/usr/bin/env bash
export ISSUE_KEY_REGEX='^(SPR-[0-9]{1,4}).*'
export COMMIT_MESSAGE=SPR-4444
#    build-number: 210902591
#    ios-version-name: 1.2.17
#    ios-release-url: https://appcenter.ms/orgs/Spur-App/apps/Spur-iOS-staging/distribute/releases/5
export IOS_INSTALL_URL=itms-services://?action=download-manifest&url=https%3A%2F%2Fappcenter.ms%2Fapi%2Fv0.1%2Fpublic%2Fapps%2F79a7eca8-82e8-4f7f-8ce2-63c7158c7155%2Freleases%2F5%2Fios_manifest%3Ftoken%3DP3N2PTIwMTktMDItMDImc3I9YyZzaWc9RGdaWUQyVUdXa1JUSTVYTjNPTTdMU3RQTGtpOHBzS1U4QWdhaTl6VWhUZyUzRCZzZT0yMDIxLTA5LTAzVDE5JTNBNDclM0E0NFomc3A9cg%3D%3D
export ANDROID_VERSION_NAME=1.1.0
export ANDROID_RELEASE_URL=https://appcenter.ms/orgs/Spur-App/apps/Spur-Android-staging/distribute/releases/5
export ANDROID_INSTALL_URL=https://appcenter-filemanagement-distrib5ede6f06e.azureedge.net/4fcb5264-d8d7-43c4-b49e-c7dda30d66d6/app-1.1.0.apk?sv=2019-02-02&sr=c&sig=jJDHz0HY8%2FFGj%2BANuxTovbj0Bj1VlWEg0lTlYV7hP%2Fs%3D&se=2021-09-03T19%3A51%3A55Z&sp=r
export JIRA_HOST=spurapp.atlassian.net
echo ${ANDROID_INSTALL_URL}
./slack_build_info_payload.sh ./slack-build-info-template.json > result.json