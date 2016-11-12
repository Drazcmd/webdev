////////////////////////////////
// Upload files to Cloudinary //
////////////////////////////////
const multer = require('multer')
const stream = require('stream')
const cloudinary = require('cloudinary')

if (!process.env.CLOUDINARY_URL) {
     process.env.CLOUDINARY_URL="cloudinary:// get value from heroku"
}

// multer parses multipart form data.  Here we tell
// it to expect a single file upload named 'image'
const uploadImage = multer().single('image')

function putImage(req, res) {

	// body-parser provides us the textual formData
	// which is just title in this case
	const publicName = req.body.title

	const uploadStream = cloudinary.uploader.upload_stream(result => {    	
		// create an image tag from the cloudinary upload
		const image = cloudinary.image(result.public_id, {
			format: "png", width: 100, height: 130, crop: "fill" 
		})
		// create a response to the user's upload
		res.send(`Uploaded: ${result.url}<br/><a href="${result.url}">${image}</a>`);
	}, { public_id: publicName })

	// multer can save the file locally if we want
	// instead we do not instruct multer to save the file
	// and have the file in memory.
	// multer provides req.file and within is the byte buffer

	// we create a passthrough stream to pipe the buffer
	// to the uploadStream for cloudinary.
	const s = new stream.PassThrough()
	s.end(req.file.buffer)
	s.pipe(uploadStream)
	s.on('end', uploadStream.end)
	// and the end of the buffer we tell cloudinary to end the upload.
}

function getImage(req, res) {
	// This form has two parts: image and title
	// the title is used as the name of the uploaded file
	//   if not supplied, then we get some default name from Cloudinary
	// the image is the file to upload
	//   the name "image" must be the same as what we expect in the formData
	//   in the multer().single() middleware
	res.send('<form method="post" enctype="multipart/form-data">'
		+ '<p>Public ID: <input type="text" name="title"/></p>'
		+ '<p>Image: <input type="file" name="image"/></p>'
		+ '<p><input type="submit" value="Upload"/></p>'
		+ '</form>'
	);
}

function setup(app) {
	
	// this provides a form.  This is uneeded because
	// we have the upload on the frontend already.
    // but I provide it here for the inclass exercise example
	app.get('/image', getImage)

	app.post('/image', uploadImage, putImage)
}

module.exports = { putImage, uploadImage, setup }

