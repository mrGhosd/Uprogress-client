#!/usr/bin/env bash

BUCKET=uprogress-client/public
SOURCE_DIR=production/
DISTRIBUTION_ID=E3JUMKK33HB6BA


echo "Building production"
if npm run build ; then
   echo "Build Successful"
else
  echo "exiting.."
  exit 1
fi


echo "Removing all files on bucket"
aws s3 rm s3://${BUCKET} --recursive


echo "Attempting to upload site .."
echo "Command:  aws s3  sync $SOURCE_DIR s3://$BUCKET/"
aws s3 sync ${SOURCE_DIR} s3://${BUCKET}/ --region=us-east-1 --acl public-read
echo "S3 Upload complete"

echo "Invalidating cloudfrond distribution to get fresh cache"
# aws cloudfront create-invalidation --distribution-id="$DISTRIBUTION_ID" --paths /public

echo "Deployment complete"
