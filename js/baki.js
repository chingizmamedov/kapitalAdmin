/** @format */

$(function() {
	var allFilials = [];

	var svg = document.getElementById("baki-full"),
		NS = svg.getAttribute("xmlns");

	const drowCircles = () => {
		var target = document.getElementById("baki-full");

		var element = document.getElementsByTagName("circle"),
			index;

		for (index = element.length - 1; index >= 0; index--) {
			element[index].parentNode.removeChild(element[index]);
		}

		for (var i = 0; i < allFilials.length; i++) {
			circle = document.createElementNS(NS, "circle");

			circle.setAttributeNS(null, "cx", allFilials[i].filialX);
			circle.setAttributeNS(null, "cy", allFilials[i].filialY);
			circle.setAttributeNS(null, "r", 2);
			target.appendChild(circle);
		}
	};

	// debugger
	// add a circle to the SVG
	svg.addEventListener(
		"click",
		function(e) {
			var t = e.target,
				x = e.clientX,
				y = e.clientY,
				target = t == svg ? svg : t.parentNode,
				svgP = svgPoint(target, x, y),
				circle = document.createElementNS(NS, "circle");

			circle.setAttributeNS(null, "cx", Math.round(svgP.x));
			circle.setAttributeNS(null, "cy", Math.round(svgP.y));
			circle.setAttributeNS(null, "r", 2);
			target.appendChild(circle);

			allFilials.push({
				filialX: Math.round(svgP.x),
				filialY: Math.round(svgP.y),
				filialName: "",
			});
			document.getElementById("filial-pos").value = allFilials.length;
			console.log("allFilials.length", allFilials.length);
		},
		false,
	);

	// translate page to SVG co-ordinate
	function svgPoint(element, x, y) {
		var pt = svg.createSVGPoint();
		pt.x = x;
		pt.y = y;
		return pt.matrixTransform(element.getScreenCTM().inverse());
	}

	document.getElementById("elave").addEventListener("click", function(event) {
		event.preventDefault();
		let elementNum = document.getElementById("filial-pos").value - 1,
			filialNameFromInput = document.getElementById("elave-input").value,
			elementId = document.getElementById("filial-id").value;
		filialNameFromInput == ""
			? null
			: (allFilials[elementNum].filialName = filialNameFromInput);
		document.getElementById("elave-input").value = "";
		elementId == "" ? null : (allFilials[elementNum].id = elementId);
		redrow();
	});

	$("#delete").click(function() {
		var elemId = $("#filial-pos").val() - 1;

		allFilials.splice(elemId, 1);

		redrow();
	});

	const removeElementFromAllFilters = index => {
		allFilials.splice(index, 1);
	};

	const setDeleteButton = () => {
		const buttons = document.getElementsByClassName("delete-item");

		Object.keys(buttons).forEach(item => {
			buttons[item].onclick = function(e) {
				this.parentNode.parentNode.parentNode.removeChild(
					this.parentNode.parentNode,
				);
				removeElementFromAllFilters(e.target.getAttribute("data-id"));
				console.log("all filiasl", allFilials);
				drowCircles();
			};
		});
	};

	function redrow() {
		drowCircles();
		var listing = "";
		for (var i = 0; i < allFilials.length; i++) {
			let toast = `<div class="toast opacity-1" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                <span class="badge badge-secondary mr-2">${i + 1}</span>
                <strong class="mr-auto">${allFilials[i].filialName}</strong>
                
                <button data-id="${i}" type="button" class=" delete-item ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="toast-body">
                <span class="badge badge-warning">ID: ${allFilials[i].id}</span>
                <span class="badge badge-info">X : ${
									allFilials[i].filialX
								}</span>
                <span class="badge badge-info">Y: ${
									allFilials[i].filialY
								}</span>
                </div>
                </div>`;
			listing += toast;
		}
		document.getElementById("listFull").innerHTML = listing;
		console.log(allFilials);
		setDeleteButton();
	}

	redrow();
});
