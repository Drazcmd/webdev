;(function() {

var modelMap = {}

function updateModel(model) {
	return function(event) {
		var value = event.srcElement.value
		modelMap[model].forEach(function(element) {
			if (element.tagName !== 'INPUT') {
				element.innerHTML = value
			}
		})
	}
}

function registerModel(model, element) {
	if (!modelMap[model]) {
		modelMap[model] = []
	}
	modelMap[model].push(element)
	if (element.tagName === 'INPUT') {
		element.addEventListener('change', updateModel(model))
	}
}

Array.prototype.forEach.call(document.body.children, function(e) {
	var model = e.getAttribute('data-model')
	if (model) {
		registerModel(model, e)
	}
})

})()