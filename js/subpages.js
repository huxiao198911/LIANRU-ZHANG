window.addEventListener('load', function() {
    initHeader();
    preloadedImages(document.getElementsByTagName('img'));
    if (d.querySelector('#mainFashion')) initFashion();
    if (d.querySelector('#mainIllustration')) initIllustration();
});
const main = d.querySelector('main');
//console.log(main);

let subPages = [];
const fashionDesign = {
    class: 'designs',
    firstTitle: 'fashion',
    secondTitle: 'designs'
}
subPages.push(fashionDesign);

const fashionGarment = {
    class: 'garments',
    firstTitle: 'fashion',
    secondTitle: 'garments'
}
subPages.push(fashionGarment);

const illustrationGufeng = {
    class: 'illustrations',
    firstTitle: 'illustration',
    secondTitle: 'Gufeng'
}
subPages.push(illustrationGufeng);

const illustrationLifeStory = {
    class: 'illustrations',
    firstTitle: 'illustration',
    secondTitle: 'Life Stories'
}
subPages.push(illustrationLifeStory);

const illustrationBooks = {
    class: 'illustrations',
    firstTitle: 'illustration',
    secondTitle: 'Books'
}
subPages.push(illustrationBooks);

function initFashion() {
    if (!d.querySelector('.main-fashion-illustration')) return false;
    createBreadcrumbs(breadcrumbsItems[0], subpageCategories[0]);
    createDynamicSections(subPages[0], designWorks);
    createDynamicSections(subPages[1], garmentWorks);
}

function initIllustration() {
    if (!d.querySelector('.main-fashion-illustration')) return false;
    createBreadcrumbs(breadcrumbsItems[1], subpageCategories[1]);
    createDynamicSections(subPages[2], gufengWorks);
    createDynamicSections(subPages[3], lifeStoryWorks);
    createDynamicSections(subPages[4], booksWorks);
}

//  Create breadcrumbs
const breadcrumbsItems = ['fashion', 'illustration', 'about me', 'contact'];

const subpageCategories = [{
        subpage: 'Fashion',
        pageInSubpage1: 'Designs',
        pageInSubpage2: 'Garments'
    },
    {
        subpage: 'Illustration',
        pageInSubpage1: 'Gufeng',
        pageInSubpage2: 'Life Stories',
        pageInSubpage3: 'Books'
    }
]

function createBreadcrumbs(breadcrumbsItem, category) {
    if (screenWidth > 768) {
        const section = d.createElement('section');
        const breadcrumbs = d.createElement('div');
        breadcrumbs.classList.add('breadcrumbs');
        breadcrumbs.innerHTML = '<a href="#">Home</a> <i class="iconfont icon-chevron-right"></i> <a href="#">' + breadcrumbsItem + '</a>';
        section.appendChild(breadcrumbs);
        d.body.insertBefore(section, main);

        //  Create navigation
        const ul = d.createElement('ul');
        for (key in category) {
            const list = d.createElement('li');
            list.innerHTML = category[key];
            ul.appendChild(list);
            list.addEventListener('click', function() {
                this.classList.add('active');
                handleCategoryClick(gufengWorks);
            });
        }
        ul.children[0].classList.add('active')
        section.appendChild(ul);
    }
}

function handleCategoryClick(oneWork) {}

//  Create section and image articles
function createDynamicSections(secElement, eleArr) {
    if (screenWidth < 768) {
        const section = d.createElement('section');
        section.classList.add(secElement.class);
        section.innerHTML = '<h1><a href="pages/fashion.html">' + secElement.firstTitle + '</a><i class="iconfont icon-chevron-right"></i><a href="pages/design.html">' + secElement.secondTitle + '</a></h1>';
        main.appendChild(section);
        const artContainer = d.createElement('div');
        artContainer.classList.add('art-container');
        section.appendChild(artContainer);
        createDynamicArticles(artContainer, eleArr);
    } else {
        createDynamicArticles(main, eleArr);
    }
    const imgs = d.querySelectorAll('img');
    for (img of imgs) {
        if (img.naturalWidth <= img.naturalHeight) {
            img.style.width = '100%';
            img.style.height = 'auto';
        }
    }
}

//  Create articles 
function createDynamicArticles(parentEle, eleArr) {
    for (eleObj of eleArr) {
        const article = d.createElement('article');
        if (eleObj.creativeDuration == undefined || eleObj.tool == undefined) {
            article.innerHTML = '<h2>' + eleObj.title + '</h2><a href="#"><img src="' + eleObj.imgDir + '" alt="' + eleObj.title + '"></a><p>Want to know the processes? <a href="#"><i class="iconfont icon-chevron-right"></i></a></p>'
        } else {
            article.innerHTML = '<h2>' + eleObj.title + '</h2><a href="#"><img src="' + eleObj.imgDir + '" alt="' + eleObj.title + '"></a><p><span>' + eleObj.creativeDuration + ' </span><span>' + eleObj.tool + '</span></p>';
        }
        parentEle.appendChild(article);
    }
}