#!/bin/bash
source ../.env
source .env
{
    npm install && 
    npm run build &&
    curl -XPOST -d@success.json $SLACK_URL
    false
} || {
    curl -XPOST -d@failure.json $SLACK_URL
    pwd
    exit 1
}
