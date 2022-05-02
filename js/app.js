/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
	//declare variable for section names
	let sectionNames = [];
	let sectionList = [];
	let sectionTop = [];
	let sectionBottom = [];
	let sectionHeight = [];
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
	
	//gets list of section titles
	function getSectionListNames(){
		sectionList = document.querySelectorAll('.landing__container');
		for (let i = 0; i< sectionList.length; i++){
			sectionNames[i] = sectionList[i].children[0].innerText;
			sectionTop[i] = sectionList[i].parentElement.offsetTop;
			sectionHeight[i] = sectionList[i].parentElement.offsetHeight;
			sectionBottom[i] = sectionTop[i] + sectionHeight[i];
			//alert(sectionNames[i]);
		}
		//window.alert(sectionList.length);
		
		populateMenu();
	}
	
	//populates menu buttons with section name
	function populateMenu(){
		//create div for menu
		const menuDiv = document.createElement('div');

		for (let i = 0; i< sectionNames.length; i++){
			const newButton = document.createElement('button');
			newButton.setAttribute('id','btn ' + i);
			newButton.setAttribute('class','inactive');
			newButton.setAttribute('onClick','btnClicked(this.id)');
			newButton.innerHTML = sectionNames[i];
			
			menuDiv.appendChild(newButton);
		}
		
		//gets header id
		const navListMenu = document.getElementById('navbar__list');
		
		navListMenu.appendChild(menuDiv);
	}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

	function checkDOMloaded(){
		document.addEventListener('DOMContentLoaded', getSectionListNames());
		window.onscroll = function() {activeSection()};
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
		if (pageTop >= sectionTop[i] && pageTop <= (sectionBottom[i]-1)) {
			sectionList[i].parentElement.className = "active";
			btnTest.className = 'active';
		} else {
			sectionList[i].parentElement.className = "inactive";
			btnTest.className = 'inactive';
		}
	}
}


