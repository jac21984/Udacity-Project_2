//declare global variable for section names
	let sectionNames = [];
	let sectionList = [];
	let sectionTop = [];
	let sectionBottom = [];
	let sectionHeight = [];

function checkDOMloaded(){
		document.addEventListener('DOMContentLoaded', setmenu());
		document.addEventListener('DOMContentLoaded', getSectionListNames());
		document.addEventListener('DOMContentLoaded', scrollbtnsetup());
		window.onscroll = function() {activeSection()};
	}
function setmenu(){
	var toggle = document.querySelector('#toggle');
	var menu = document.querySelector('#menu');

	toggle.addEventListener('click', function(){
	  if (menu.classList.contains('is-active')) {
		this.setAttribute('aria-expanded', 'false');
		menu.classList.remove('is-active');
	  } else {
		menu.classList.add('is-active'); 
		this.setAttribute('aria-expanded', 'true');
	  }
	});
}

//gets list of section titles
	function getSectionListNames(){
		sectionList = document.querySelectorAll('.landing__container');
		for (let i = 0; i< sectionList.length; i++){
			sectionNames[i] = sectionList[i].children[0].innerText;
			sectionTop[i] = sectionList[i].parentElement.offsetTop;
			sectionHeight[i] = sectionList[i].parentElement.offsetHeight;
			sectionBottom[i] = sectionTop[i] + sectionHeight[i];
		}
		
		populateMenu();
	}
	
//populates menu buttons with section name
	function populateMenu(){
		//create div for menu
		const menuDiv = document.createElement('div');
		menuDiv.setAttribute('class','btnlist');

		for (let i = 0; i< sectionNames.length; i++){
			const newButton = document.createElement('button');
			newButton.setAttribute('id','btn ' + i);
			newButton.setAttribute('class',"menubtn inactive");
			//newButton.setAttribute('class','inactive');
			newButton.setAttribute('onClick','btnClicked(this.id)');
			newButton.innerHTML = sectionNames[i];
			
			menuDiv.appendChild(newButton);
		}
		
		//gets header id
		const navListMenu = document.getElementById('menu');
		
		navListMenu.appendChild(menuDiv);
	}

// Scroll to section on link click

function btnClicked(clicked_id){
	let btnIndex = parseInt(clicked_id.replace('btn ',''));
	//let scrollIndex = sectionTop[btnIndex] + (btnIndex * 55);
	let scrollIndex = sectionTop[btnIndex];
	
	window.scrollTo({
		top: scrollIndex,
		behavior: 'smooth'
	});
	
}

// Set sections as active

function activeSection() {
	//gets current page scroll position
	let pageTop = document.body.scrollTop;
	
	for (let i = 0; i< sectionNames.length; i++){
		//retrieved button ID
		let btnTest = document.getElementById('btn ' + i);
		
		//tests if section on viewport and set active if true
		if (pageTop >= (sectionTop[i]-300) && pageTop <= (sectionBottom[i]-300)) {
			sectionList[i].parentElement.className = "active";
			btnTest.className = 'menubtn active';
		} else {
			sectionList[i].parentElement.className = "inactive";
			btnTest.className = 'menubtn inactive';
		}
	}
}


// back to top button items
// We select the element we want to target
function scrollbtnsetup(){
	let target = document.getElementById("target");
	let scrollToTopBtn = document.querySelector(".scrollToTopBtn")

	// Next we want to create a function that will be called when that element is intersected
	function callback(entries, observer) {
	  // The callback will return an array of entries, even if you are only observing a single item
	  entries.forEach(entry => {
		if (!entry.isIntersecting) {
		  // Show button
		  scrollToTopBtn.classList.add("showBtn")
		} else {
		  // Hide button
		  scrollToTopBtn.classList.remove("showBtn")
		}
	  });
	}

	function scrollToTop() {
	  window.scrollTo({
		top: 0,
		behavior: "smooth"
	  })
	}
	scrollToTopBtn.addEventListener("click", scrollToTop);
		
	// Next we instantiate the observer with the function we created above. This takes an optional configuration
	// object that we will use in the other examples.
	let observer = new IntersectionObserver(callback);
	// Finally start observing the target element
	observer.observe(target);
}