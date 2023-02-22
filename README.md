# Shop Angular Cloudfront

Angular version: ~12.

Repo maintainers:

- [Iryna Feshchenko](https://github.com/IrynaFeshchenko)
## Get up and running

Prerequisites: NodeJS v14

Follow the steps:

- **git clone**
- **npm i**
- **npm run start**

## Link to deploys

Link to CloudFront - https://dfgkqtvwfk2uv.cloudfront.net
Link to S3 - http://my-bucket-angular-feshchenko.s3-website.eu-central-1.amazonaws.com/

## In order to verify serverless solution

1. Checkout FE repo branch task-2
2. Run **npm run build** command
3. Configure inside **serverless.yml** file:
    - provider
    - custom.client.bucketname
    - service
4. Deploy cloudformation stack via **npm run cloudfront:deploy**
5. Deploy client assets via **npm run client:deploy**

## To verify cloudfront invalidation

1. Run **npm run build** command
2. Run **npm run client:deploy** command
3. Run **npm run cloudfront:invalidateCache** command
