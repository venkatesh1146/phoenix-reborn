eval $(aws secretsmanager get-secret-value --secret-id app/pheonix-rising --version-stage AWSCURRENT --region $AWS_ENV --query 'SecretString' --output text | sed 's/^/export /')
