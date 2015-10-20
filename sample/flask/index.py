#!/usr/bin/env python
from flask import Flask, render_template, jsonify

app = Flask(__name__)
app.config['DEBUG'] = True

@app.route('/')
def index():
	return render_template('index.html', message="Hello World!")

@app.route('/boo')
def getPosts():
	return jsonify({'message': 'aaaah!!'})

if __name__ == "__main__":
	app.run(port=8000)

