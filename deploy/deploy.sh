#!/bin/bash
source .env
source deploy/.env
{
    npm install &&
    npm run build &&
    curl -XPOST -d@deploy/success.json $SLACK_URL
} || {
    curl -XPOST -d@deploy/failure.json $SLACK_URL
    exit 1
}
