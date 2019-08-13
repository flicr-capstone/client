#!/bin/bash
{
    npm install && 
    npm run build &&
    curl -XPOST -d@success.json
    false
} || {
    curl -XPOST -d@failure.json
    exit 1
}