const wpPreviewHeaders = new Headers();
wpPreviewHeaders.set('Authorization', 'Basic ' + btoa(process.env.WP_USERNAME + ":" + process.env.WP_PASSWORD));
export { wpPreviewHeaders };
