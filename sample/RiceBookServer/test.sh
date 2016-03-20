#!/bin/bash
PORT=3000

echo "GET /"
curl -H 'Content-Type: application/json' http://localhost:${PORT}
echo ""

echo "GET /post"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/post
echo ""

echo "POST /post"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/post -d "{ \"body\":\"This is my new post! $(date)\" }"
echo ""

echo "GET /post"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/post
echo ""
