# Google home + github notifications

Run this code on your computer and it will check for new github notifications every minute, and read them to you through your Google Home speaker

## Install
1. copy .env_default and rename to .env
2. go to https://github.com/settings/tokens and create a token with notification scope and put it in .env
3. go to your google home app and find the IP of your Google Home, and put it in .env
4. yarn install
5. run node .

You will now hear your github notifications from your Google Home :-)
