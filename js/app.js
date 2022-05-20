//declare global variable for section names
	let sectionNames = [];
	let sectionList = [];
	let sectionTop = [];
	let sectionBottom = [];
	let sectionHeight = [];
	let isMobile = 'False';

function checkDOMloaded(){
		document.addEventListener('DOMContentLoaded', checkMobile());
		document.addEventListener('DOMContentLoaded', setmenu());
		document.addEventListener('DOMContentLoaded', getSectionListNames());
		document.addEventListener('DOMContentLoaded', scrollbtnsetup());
		window.onscroll = function() {activeSection()};
	}
function setmenu(){
	let toggle = document.querySelector('#toggle');
	let navbar = document.querySelector('#navbar__list');


	toggle.addEventListener('click', function(){
	  if (navbar.classList.contains('is-active')) {
		this.setAttribute('aria-expanded', 'false');
		navbar.classList.remove('is-active');
	  } else {
		navbar.classList.add('is-active'); 
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
		//gets header id
		const navListMenu = document.getElementById('navbar__list');
		
		//create list for menu
		for (let i = 0; i< sectionNames.length; i++){
			const menuList = document.createElement('li');
			const newButton = document.createElement('button');
			newButton.setAttribute('id','btn ' + i);
			newButton.setAttribute('class',"menubtn inactive");
			newButton.setAttribute('onClick','btnClicked(this.id)');
			newButton.innerHTML = sectionNames[i];
			
			menuList.append(newButton);
			navListMenu.appendChild(menuList);
		}
	}
	
//check if mobile
function checkMobile() {     
    isMobile = window.matchMedia("only screen and (max-width: 559px)").matches;
 }

// Scroll to section on link click

function btnClicked(clicked_id){
	let btnIndex = parseInt(clicked_id.replace('btn ',''));
	let scrollIndex = sectionTop[btnIndex];
	
	if (isMobile) {
        //if screen is mobile
		if (btnIndex = sectionNames.length){
			window.scrollTo({
				top: scrollIndex-75,
				behavior: 'smooth'
			});

		} else {
			window.scrollTo({
				top: scrollIndex+100,
				behavior: 'smooth'
			});
		}
	} else {
		//if screen is not mobile
		console.log('not mobile')
		if (btnIndex = sectionNames.length){
			window.scrollTo({
				top: scrollIndex +100,
				behavior: 'smooth'
			});

		} else {
			window.scrollTo({
				top: scrollIndex,
				behavior: 'smooth'
			});
		}
	}
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

