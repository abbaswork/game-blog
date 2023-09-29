This is a headless CMS project that uses Next JS as the static website generator and WP as the headless CMS. It's hosted in AWS using an EC2 container for the WP setup and an Amplify App for the NextJs App.

## Getting Started

### WP Setup:
Before being able to run locally the WP setup must be setup correctly:
- Download and update the theme file found (here)[https://github.com/abbaswork/headless-wp-theme]
- Zip the theme file and upload into wordpress instance
- Generate an application password for your user in http://<your-wordpress-url>/wp-admin/profile.php. This will be added to the env as WP_PASSWORD
- Select Post name in the perma link structure, this can be set through settings at http://<your-wordpress-url>/wp-admin/options-permalink.php

#### Local WP Setup
If setting up locally, Install the Local[https://localwp.com/] WP app and Ensure that it's running.

### ENV Setup:
The following requires the env variables to be setup in order to use headless functionality
- WP_DOMAIN="<name of wp domain>" //Refer to the "Local" app if testing using a local WP setup, otherwise use domain of wp url.
- WP_PROTOCOL="<http or https>"
- WP_USERNAME="<email or username for wp user>"
- WP_PASSWORD="<generated in wp application password for the wp user above>"
- WP_PREVIEW_TOKEN="<generate a secure token>" //please note this token must also be setup in the wp theme, through the custom redirect funtion for previews.

The username and password provide application access to the app. The preview token is used to generate secure drafts that isn't visible to the public and isn't crawlable by SEO.

## Running the APP

### Storybook:
Storybook is used to manage the design system and house the components used in the site. To run it, use the following:
- `npm run storybook`

### Headless App:
Run the following in order to start a local version of the website that grabs the data from your headless CMS.
- `npm run dev`

## Deployment

Deployment is setup in AWS using:
- **EC2 Container**: with WP installed, please note that this requires PHP and the DB requirments to also be installed correctly to support wp, for more info refer to these setup docs: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/hosting-wordpress.html
- **Amplify App**: with Next Configuration, the env vars should be setup correctly in the Amplify app and the template used must also export the env's to be accessible by NextJs
- Previews can be setup as a staging enviornment.

## Webhooks

In order to deploy updates made to blog pages in WP, webhooks are setup in the Amplify Setup to trigger rebuilds when posts are published or updated. These are only supported in Staging and Live enviornments.
- The webhooks can be made to trigger in WP using a plugin or through php functions.

## Preview

In order to have the preview working correctly, the secret token generated for the env vars must be also be added into the WP theme file. The theme files are being

- Custom Functions are used in the theme to redirect the review links to the Next App.
- The Next App uses a draft route for the previews, these are setup to grab data on the fly as opposed to statically generating the pages per build like the published pages.
- The API requests in the Next App use the username and password to access the draft data.
- A secret token is generated and setup in the WP theme and also stored in the app. This is validated in the redirect links
