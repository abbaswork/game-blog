This is a headless CMS project that uses Next JS as the static website generator and WP as the headless CMS. It's hosted in AWS using an EC2 container for the WP setup and an Amplify App for the NextJs App.

## Getting Started

Setup:
The following requires the env variables to be setup in order to use headless functionality
- WP_DOMAIN="<name of wp domain>" //Refer to "Local" app if testing using a local WP setup, otherwise use domain in your wp url.
- WP_PROTOCOL="<http or https>"
- WP_USERNAME="<email for wp user>"
- WP_PASSWORD="<generated password for wp user>"
- WP_PREVIEW_TOKEN="<generate a secure token>" //please note this token must also be setup in the wp theme, through the custom redirect funtion for previews.

WP Setup:
Before being able to run locally the WP setup must be setup correctly:
- Generate a password for your user in http://<your-wordpress-url>/wp-admin/profile.php 
- Select Post name in the perma link structure, this can be set through settings at http://<your-wordpress-url>/wp-admin/options-permalink.php

Before starting the project, ensure WP is setup correctly and if running locally ensure that "Local" is running.

Storybook:
Storybook is used to manage the design system and house the components used in the site. To run it, use the following:
- `npm run storybook`

Headless App:
Run the following in order to start a local version of the website that grabs the data from your headless CMS.
- `npm run dev`

## Deployment

Deployment is setup in AWS using:
- EC2 Container, with WP installed, please note that this requires PHP and the DB requirments to also be installed correctly to support wp, for more info refer to these setup docs: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/hosting-wordpress.html

- Amplify App with Next Configuration, the env vars should be setup correctly

## Webhooks

In order to deploy updates made to blog pages in WP, webhooks are setup in the Amplify Setup to trigger rebuilds when posts are published or updated.
- The webhooks can be made to trigger in WP using a plugin or through php functions.

## Preview

In order to have the preview working correctly, the user needs to generate a password for thier user in wp and store it in the env file. Ontop of this an additional secret token needs to be generated and authenticated when the preview link is hit.

- Custom Functions are used in the theme to redirect the review links to the Next App.
- The Next App uses a draft route for the previews, these are setup to grab data on the fly as opposed to statically generating the pages per build like the published pages.
- The API requests in the Next App use the username and password to access the draft data.
- A secret token is generated and setup in the WP theme and also stored in the app. This is validated in the redirect links