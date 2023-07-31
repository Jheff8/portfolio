const navbarTogglerBtn = document.querySelector('.hamburger-icon')
const hamburgerControl = document.querySelector('#hamburger-icon-control')
const navLink = document.querySelectorAll('span.links')
const header = document.querySelector('header')
const mainElements = Array.from(document.querySelectorAll('.main-element'))

// About me section variables
const showAboutMeText = document.querySelector('.show-about-me-text')
const hideAboutMeText = document.querySelector('.hide-about-me-text')

// This variable contains informations about the skills' icon color
const iconColorConfiguration = {
    vue: {
        withColor: {firstColor: '#11F01F', secondColor: '#35495E'},
        noColor: {firstColor: '#11071F', secondColor: '#27114B'}
    },
    jquery: {
        withColor: {firstColor: '#21609B'},
        noColor: {firstColor: '#11071F'}
    },
    javascript: {
        withColor: {firstColor:'#F7DF1E', secondColor: '#000'},
        noColor: {firstColor:'#11071F', secondColor: '#652AB8'}
    },
    python: {
        withColor: {firstColor: 'url(#paint0_linear_87_8204)', secondColor: 'url(#paint1_linear_87_8204)'},
        noColor: {firstColor: '#11071F', secondColor: '#11071F'}
    },
    bootstrap: {
        withColor: {firstColor: '#6600FF', secondColor: '#FFF'},
        noColor: {firstColor: '#11071F', secondColor: '#652AB8'}
    },
    html: {
        withColor: {firstColor: '#E44D26', secondColor: '#F16529', thirdColor: '#FFF'},
        noColor: {firstColor: '#11071F', secondColor: '#11071F', thirdColor: '#652AB8'}
    },
    css: {
        withColor: {firstColor: '#1172B8', secondColor: '#33AADD', thirdColor: '#FFF'},
        noColor: {firstColor: '#11071F', secondColor: '#11071F', thirdColor: '#652AB8'}
    },
    figma: {
        withColor: {firstColor: '#1ABCFE', secondColor: '#0ACF83', thirdColor: '#FF7262', fourthColor: '#F24E1E', fifthColor: '#A259FF'},
        noColor: {firstColor: '#11071F', secondColor: '#11071F', thirdColor: '#11071F', fourthColor: '#11071F', fifthColor: '#11071F'}
    },
    git: {
        withColor: {firstColor: '#EE513B', secondColor: '#FFF'},
        noColor: {firstColor: '#11071F', secondColor: '#652AB8'}
    },
    github: {
        withColor: {firstColor:'#000', secondColor: '#FFF'},
        noColor: {firstColor:'#11071F', secondColor: '#652AB8'}
    } 
}

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

function setIconColors(element, svg) {
    const colorConfig = takeColorConfiguration(element.id)
    let paths
    switch (element.id) {
        case 'jquery':
            svg.style.fill = colorConfig.withColor.firstColor
            break
        case 'javascript':
            const rect = svg.querySelector('rect')
            paths = svg.querySelector('path')
            rect.style.fill = colorConfig.withColor.firstColor
            paths.style.fill = colorConfig.withColor.secondColor
            break
        case 'github':
            const circle = svg.querySelector('circle')
            paths = svg.querySelector('path')
            circle.style.fill = colorConfig.withColor.firstColor
            paths.style.fill = colorConfig.withColor.secondColor
            break
        default:
            paths = svg.querySelectorAll('path')
            paths[0].style.fill = colorConfig.withColor.firstColor
            paths[1].style.fill = colorConfig.withColor.secondColor
            if (element.id =='html' || element.id == 'css') {
                paths[2].style.fill = colorConfig.withColor.thirdColor
            } else if (element.id == 'figma') {
                paths[2].style.fill = colorConfig.withColor.thirdColor
                paths[3].style.fill = colorConfig.withColor.fourthColor
                paths[4].style.fill = colorConfig.withColor.fifthColor
            }
            break
    }
}

function removeIconColors(element, svg) {
    const colorConfig = takeColorConfiguration(element.id)
    let paths
    switch (element.id) {
        case 'jquery':
            svg.style.fill = colorConfig.noColor.firstColor
            break
        case 'javascript':
            const rect = svg.querySelector('rect')
            paths = svg.querySelector('path')
            rect.style.fill = colorConfig.noColor.firstColor
            paths.style.fill = colorConfig.noColor.secondColor
            break
        case 'github':
            const circle = svg.querySelector('circle')
            paths = svg.querySelector('path')
            circle.style.fill = colorConfig.noColor.firstColor
            paths.style.fill = colorConfig.noColor.secondColor
            break
        default:
            paths = svg.querySelectorAll('path')
            paths[0].style.fill = colorConfig.noColor.firstColor
            paths[1].style.fill = colorConfig.noColor.secondColor
            if (element.id == 'html' || element.id == 'css'){
                paths[2].style.fill = colorConfig.noColor.thirdColor
            } else if (element.id == 'figma') {
                paths[2].style.fill = colorConfig.noColor.thirdColor
                paths[3].style.fill = colorConfig.noColor.fourthColor
                paths[4].style.fill = colorConfig.noColor.fifthColor
            }
            break
    }
}

function takeColorConfiguration(element) {
    switch (element) {
        case 'vue':
            return iconColorConfiguration.vue
            
        case 'jquery':
            return iconColorConfiguration.jquery

        case 'javascript':
            return iconColorConfiguration.javascript

        case 'python':
            return iconColorConfiguration.python

        case 'bootstrap':
            return iconColorConfiguration.bootstrap
    
        case 'html':
            return iconColorConfiguration.html
                
        case 'css':
            return iconColorConfiguration.css

        case 'figma':
            return iconColorConfiguration.figma

        case 'git':
            return iconColorConfiguration.git
                    
        case 'github':
            return iconColorConfiguration.github
    }
}

function fullParagraphSize(toFull) {
    const paragraphDiv = document.querySelector('.paragraph-div')
    const firstParagraph = document.querySelector('.paragraph-about-me')
    if (toFull) {
        showAboutMeText.style.display = 'none'
        const fullHeight = paragraphDiv.scrollHeight + 'px'
        paragraphDiv.style.maxHeight = fullHeight
    } else {
        showAboutMeText.style.display = 'inline'
        paragraphDiv.style.maxHeight = firstParagraph.scrollHeight + 'px'
    }
}
fullParagraphSize(false)

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
    // A value of 0.6 means at least 60% of the target element needs to be visible
    threshold: 0.6
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
    loadCarouselInfo(swiper.realIndex)
}
window.addEventListener('resize', () =>{
    applyStyleBasedOnSize()
    fullParagraphSize(false)
    // Calling the function "toggleNavVisibility" always when the window width changes is necessary to avoid possible bugs on the header.
    toggleNavVisibility()
})

navbarTogglerBtn.addEventListener('click', changeHamburgerControl)

showAboutMeText.addEventListener('click', () => {fullParagraphSize(true)})
hideAboutMeText.addEventListener('click', () => {fullParagraphSize(false)})

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

const changeColors = Array.from(document.querySelectorAll('.change-svg-color'))
changeColors.forEach(element => {
    const svg = element.querySelector('#SVGRepo_iconCarrier')
    element.addEventListener('mouseenter', () => {
        setIconColors(element, svg)
    })
    element.addEventListener('mouseleave', () => {
        removeIconColors(element, svg)
    })
})


