#!/bin/bash

eval "$(aws secretsmanager get-secret-value --secret-id app/pheonix-rising --version-stage AWSCURRENT --region $AWS_ENV --query 'SecretString' --output text | sed 's/^/export /')"

if [ "$NODE_ENV" = "production" ]; then
   npm run start:prod
else
   npm run start:dev
fi
