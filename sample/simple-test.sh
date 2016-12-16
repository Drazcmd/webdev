#!/bin/bash
PORT=3333

echo "GET /"
curl -H 'Content-Type: application/json' http://localhost:${PORT}
echo ""

echo "GET /posts"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/posts
echo ""

echo "POST /login"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/login -d '{ "username":"Scott", "password":"boo" }'
echo ""

echo "PUT /logout"
curl -H 'Content-Type: application/json' http://localhost:${PORT}/logout -X PUT
echo ""
