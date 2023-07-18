const navbarTogglerBtn = document.querySelector('.hamburger-icon')
const hamburgerControl = document.querySelector('#hamburger-icon-control')
const navLink = document.querySelectorAll('span.links')
const header = document.querySelector('header')
const mainElements = Array.from(document.querySelectorAll('.main-element'))

// This list contains informations about each carousel's elements. It will be used to load the carousel's displayed element informations
const listOfElementsInformations = [
    {titleText: 'Mackbook 1', elementDescription: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur, id magni, officiis quae similique nemo non, quisquam deserunt tempora earum nam cum!", siteLink:'https://github.com/Jheff8'},
    {titleText: 'Mackbook 2', elementDescription: "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorme lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorme lorem lorem lorem lorem", siteLink: 'https://github.com/Jheff8'},
    {titleText: 'Mackbook 3', elementDescription: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur, id magni, officiis quae similique nemo non, quisquam deserunt tempora earum nam cum!", siteLink: 'https://github.com/Jheff8'}
]

// These variables are used to store the timeout IDs returned by setTimeout. They will be used later to clear the timeouts if needed.
let navVisibilityTimeout1
let navVisibilityTimeout2

function changeHamburgerControl(){
    hamburgerControl.checked = !hamburgerControl.checked
    toggleNavVisibility()
}  

function changeActiveAnchor(index) {
    navLink.forEach(element => {
        if (element.getAttribute('aria-current')){
            element.removeAttribute('aria-current')
        }
    })
    navLink[index].setAttribute('aria-current', 'page')
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId)
    // Create an interval that runs every second to check if the 'body' element doesn't have the class 'disable-scrolling'. If it doesn't have the class, the scroll position will be changed accordingly to the user's previous choice.
    const intervalId = setInterval(function() {
        const body = document.body
        if (!body.classList.contains('disable-scrolling')) {
            if (section) {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                })
            }
          clearInterval(intervalId)
        }
    }, 1000)
}

function toggleNavVisibility() {
    const languageControl = document.querySelector('.language')
    const nav = document.querySelector('nav')
    clearTimeout(navVisibilityTimeout1)
    clearTimeout(navVisibilityTimeout2)

    if (hamburgerControl.checked) {
        header.style.paddingBottom = '95vh'
        navVisibilityTimeout1 = setTimeout(() => {
            nav.style.display = 'block'
        }, 300)
        navVisibilityTimeout2 = setTimeout(() => {
            languageControl.style.display = 'flex'
        }, 700)
    } else {
        header.style.paddingBottom = '10px'
        languageControl.style.display = 'none'
        navVisibilityTimeout1 = setTimeout(() => {
            nav.style.display = 'none'
        }, 400)
    }
}

function loadCarouselInfo(index) {
    const siteTitle = document.querySelector('.site-title')
    const siteDescription = document.querySelector('.site-description')
    const siteLink = document.querySelector('.site-link')
    siteTitle.innerHTML = listOfElementsInformations[index].titleText
    siteDescription.innerHTML = listOfElementsInformations[index].elementDescription
    siteLink.setAttribute('href', listOfElementsInformations[index].siteLink)
}

//This interval checks which element is on display by checking which nav has the attr "aria-current" equal to "page" and starts the background animation accordingly 
let lastItemDisplayed
setInterval(() => {
    const currentItemOnDisplay = document.querySelector('span[aria-current="page"]')
    if (lastItemDisplayed != currentItemOnDisplay) {
        lastItemDisplayed = currentItemOnDisplay
        if (currentItemOnDisplay.innerHTML == 'HOME' || currentItemOnDisplay.innerHTML == 'MY SKILLS') {
            switch (currentItemOnDisplay.innerHTML) {
                case 'HOME':
                    Particles.init({
                        selector: '.animated-bg',
                        speed: 0.019,
                        maxParticles: 200
                    })
                    break
                case 'MY SKILLS':
                    Particles.init({
                        selector: '.animated-bg-2',
                        speed: 0.019,
                        maxParticles: 200
                    })
                    break
            }
        }
    }
}, 200);

//  to check which element is visible
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const targetIndex = mainElements.indexOf(entry.target)
            changeActiveAnchor(targetIndex)
        }
    })
}, {
    // Set the threshold value to trigger visibility detection
    // A value of 0.5 means at least 50% of the target element needs to be visible
    threshold: 0.5 
})

// Register main elements for observation
mainElements.forEach(element => {
    observer.observe(element)
})

// Initialize the carousel and set some configuration about it
const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,
    effect: 'slide',
    mousewheel: {
        forceToAxis: true
    },
    grabCursor: true,
    speed: 800,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
})

// This is called every time the user moves the carousel
swiper.on('slideChange', function() {
    // It sends the new "realIndex", which represents what element is being displayed on the carousel, to "loadCarouselInfo()", so it load all the informations about the new element 
    loadCarouselInfo(this.realIndex)  
})

// This is resposible for setting and initializing the background animation and loading the carousel's displayed element informations
window.onload = function() {
    Particles.init({
        selector: '.animated-bg',
        maxParticles: 150,
        speed: 0.08,
        color: '#652AB8',
        sizeVariations: 4.5
    })
    loadCarouselInfo(swiper.realIndex)
}

navbarTogglerBtn.addEventListener('click', changeHamburgerControl)

navLink.forEach(element => {
    element.addEventListener('click', function() {
        const section = this.innerText.replace(' ', '').toLowerCase()
        changeHamburgerControl()
        scrollToSection(section)
    })
})
