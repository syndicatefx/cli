/*!
 * CLI
 * Simulating a command line interface with vanilla JS
 *
 * @version : 1.2.0
 * @author : Paulo Nunes (https://syndicatefx.com)
 * @demo : https://codepen.io/syndicatefx/pen/jPxXpz
 * @license: MIT
 */

/*
Modified/adapted from the original script by:
https://github.com/ckm100/typeWriter.js
*/
document.addEventListener("DOMContentLoad", typeWriter, false);

var typeWriter = function (selector, type, interval) {

    var el = document.querySelectorAll(selector), // Getting elements in the DOM
        i = 0,
        len = el.length, // Length of element on the page
        list = [], // List of elements on the page in the DOM
        a,
        all,
        text,
        start,
        end,
        nextText,
        sectionId = selector.replace(/^#/, ''),
        targetSection = document.getElementById(sectionId),
        sections = document.getElementsByTagName("section")[0],
        targetSiblings = [].slice.call(sections.parentNode.children).filter(function(v) { return v !== targetSection }),
        cmd = document.querySelector(".command"),
        clear;

    for (; i < len; i++) {

        list.push(el[i]); // Pushing the element in the list array
    }

    for (a in list) {

        all = list[a]; // List of all element
        text = all.innerHTML; // InnerHTML of the elements 
        start = 0; // Start index of the text in the elements 
        end = 0; // End index of the text in the elements


        //Setting the default interval to 100 when interval is not set by the user
        if (typeof interval === "undefined") {

            interval = 100;

        }

        if (arguments[1] === "true") {

        	setTimeout(function() {
        		targetSection.classList.add("open");
        	}, 200);

	       	for(var i = 0;i < targetSiblings.length;i++) {
	        	targetSiblings[i].classList.remove("open");
	        }

            clear = setInterval(function () { // Animation start
                var newText = text.substr(start, end);

                all.innerHTML = newText;

                end = end + 1; //loops through the text in the element

                if (newText === text) {

                    clearInterval(clear); // Animation end
                    cmd.classList.add("open");
                    input.focus();

                }

            }, interval);

        }

        return all;

    }

}

var input = document.querySelector("input"),
	block = document.getElementsByTagName("section");

window.onload = function() {
	typeWriter("#home","true",10);

	var sectionArray = [];
	for(var i = 0;i < block.length;i++) {
		sectionArray.push(block[i].id);
	}
	//console.log(sectionArray);

	input.addEventListener('keyup', function(e) {
		if((e.keyCode || e.which) == 13) {// ENTER key pressed
			var targetValue = input.value;
			var destination = "#" + targetValue;
			typeWriter(destination,"true",10);
			input.value = "";

			if(sectionArray.includes(targetValue) == false) {
				typeWriter("#error","true",10);
			}
		}
	});
};
