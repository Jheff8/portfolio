const navbarTogglerBtn = document.querySelector('.hamburger-icon')
const hamburgerControl = document.querySelector('#hamburger-icon-control')
const navLink = document.querySelectorAll('span.links')
const header = document.querySelector('header')
const mainElements = Array.from(document.querySelectorAll('.main-element'))

// This list contains informations about each carousel's elements. It will be used to load the carousel's displayed element informations
const listOfElementsInformations = [
    {titleText: 'Mackbook 1', elementDescription: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur, id magni, officiis quae similique nemo non, quisquam deserunt tempora earum nam cum!", siteLink:'https://github.com/Jheff8', githubLink: 'https://github.com/Jheff8'},
    {titleText: 'Mackbook 2', elementDescription: "lorem lorem lorem lorem lorem lorem lorem lorem lorem lorme lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorme lorem lorem lorem lorem", siteLink: 'https://github.com/Jheff8', githubLink: 'https://github.com/Jheff8'},
    {titleText: 'Mackbook 3', elementDescription: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur, id magni, officiis quae similique nemo non, quisquam deserunt tempora earum nam cum!", siteLink: 'https://github.com/Jheff8', githubLink: 'https://github.com/Jheff8'}
]
// This list contains my social media's informations such as my name/number and a link to it.
const socialMediaInformations = [
    {toCopy: 'Jhefferson Muzy', link: 'https://www.linkedin.com/in/jhefferson-muzy-039389247/?_l=en_US'},
    {toCopy: 'Jheff8', link: 'https://github.com/Jheff8/'},
    {toCopy: '(21) 98166-3374', link: 'https://wa.me/5521981663374'}
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
    const body = document.body
    const section = document.getElementById(sectionId)
    if (body.offsetWidth < 768) {
        // Create an interval that runs every second to check if the 'body' element doesn't have the class 'disable-scrolling'. If it doesn't have the class, the scroll position will be changed accordingly to the user's previous choice.
        const intervalId = setInterval(function() {
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
    } else {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }
}

function toggleNavVisibility() {
    const body = document.body
    const languageControl = document.querySelector('.language')
    const nav = document.querySelector('nav')

    if (body.offsetWidth < 768) {
        clearTimeout(navVisibilityTimeout1)
        clearTimeout(navVisibilityTimeout2)
        if (hamburgerControl.checked) {
            body.classList.add('disable-scrolling')
            header.style.paddingBottom = '95vh'
            navVisibilityTimeout1 = setTimeout(() => {
                nav.style.display = 'block'
            }, 300)
            navVisibilityTimeout2 = setTimeout(() => {
                languageControl.style.display = 'flex'
            }, 700)
        } else {
            body.classList.remove('disable-scrolling')
            header.style.paddingBottom = '10px'
            languageControl.style.display = 'none'
            navVisibilityTimeout1 = setTimeout(() => {
                nav.style.display = 'none'
            }, 400)
        }
    } else{
        // This is necessary to avoid a bug in case the page's width increases while the header is open
        if (header.style.paddingBottom == '95vh') {
            header.style.paddingBottom = '10px'
            hamburgerControl.checked = false
            body.classList.remove('disable-scrolling')
        }
    }
}

function loadCarouselInfo(index) {
    const siteTitle = document.querySelector('.site-title')
    const siteDescription = document.querySelector('.site-description')
    const siteLink = document.querySelector('.site-link')
    const githubLink = document.querySelector('.github-link')
    siteTitle.innerHTML = listOfElementsInformations[index].titleText
    siteDescription.innerHTML = listOfElementsInformations[index].elementDescription
    siteLink.setAttribute('href', listOfElementsInformations[index].siteLink)
    githubLink.setAttribute('href', listOfElementsInformations[index].githubLink)
}

function takeElementIndex(element) {
    switch (element.id) {
        case 'linkedin':
            return 0
        case 'github':
            return 1
        case 'whatsapp':
            return 2
    }
}

function applyStyleBasedOnSize() {
    const textContentFromContact = document.querySelector('.contact-text')
    const contactLinkButtons = document.querySelector('.contact-link-buttons')
    
    const elementWidth = textContentFromContact.clientWidth
    if (elementWidth >= 470) {
        // The elements will be side by side
        contactLinkButtons.style.display = 'flex'
        contactLinkButtons.style.flexDirection = 'row'

    } else if (elementWidth > 360){
        // Two elements will be side by side, while the third one will be below them
        contactLinkButtons.style.display = 'grid'
        contactLinkButtons.style.gridTemplateColumns = 'repeat(2, 1fr)'   
    } else {
        // All the elements will be one below each other
        contactLinkButtons.style.display = 'flex'
        contactLinkButtons.style.flexDirection = 'column'
    }
}
applyStyleBasedOnSize()

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
    // A value of 0.8 means at least 80% of the target element needs to be visible
    threshold: 0.8
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
        maxParticles: 500,
        speed: 0.06,
        color: '#652AB8',
        responsive: [
            {
                breakpoint: 768,
                options: {
                    maxParticles: 400
                }
            }, {
                breakpoint: 425,
                options: {
                    maxParticles: 300
                }
            }, {
                breakpoint: 320,
                options: {
                    maxParticles: 0
                }
            }
        ]
    })
    loadCarouselInfo(swiper.realIndex)
}
window.addEventListener('resize', () =>{
    applyStyleBasedOnSize()
    // Calling the function "toggleNavVisibility" always when the window width changes is necessary to avoid possible bugs on the header.
    toggleNavVisibility()
})

navbarTogglerBtn.addEventListener('click', changeHamburgerControl)

navLink.forEach(element => {
    element.addEventListener('click', function() {
        const body = document.body
        const section = this.innerText.replace(' ', '').toLowerCase()
        if (body.offsetWidth < 768) {
            // The function "changeHamburguerControl" doesn't need to be called if the body's width is equal to or higher than 768 because it means that the hamburger is no longer appearing.
            changeHamburgerControl()
        }
        scrollToSection(section)
    })
})
// It is used to control the amount of click on the contact's buttons
let clickCounter = 0

// This variable is used to store the timeout ID retorned by "setTimeout".
let doubleClickTime

const socialMediaButton = Array.from(document.querySelectorAll('.btn-social-media'))
socialMediaButton.forEach(element => {
    element.addEventListener('click', function(event) {  
        clickCounter++
        const index = takeElementIndex(element)
        if (clickCounter === 1) {
            // This timeout guarantees that the redirection will not happen immediately, so that the user has enough time to do a double.
            doubleClickTime = setTimeout(() => {
                window.open(socialMediaInformations[index].link, '_blank')
                clickCounter = 0
            }, 400)
        } else if (clickCounter === 2) {
            clearTimeout(doubleClickTime)
            let textToCopy = socialMediaInformations[index].toCopy
            if(!navigator.clipboard) {
                alert("The copy feature is not avaible on your navigator")
            } else{
                navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    alert('"' + textToCopy +'" was succesfully copied to your clipboard! ')
                })
                .catch(() => {
                    alert('Failed to copy text to your clipboard')
                })
            }
            clickCounter = 0
        }
    })
})


