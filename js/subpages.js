window.addEventListener('load', function() {
    initHeader();
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
    createDynamicSections(subPages[0], designWorks);
    createDynamicSections(subPages[1], garmentWorks);

}

function initIllustration() {
    if (!d.querySelector('.main-fashion-illustration')) return false;
    createDynamicSections(subPages[2], gufengWorks);
    createDynamicSections(subPages[3], lifeStoryWorks);
    createDynamicSections(subPages[4], booksWorks);
}

function createDynamicSections(element, eleArr) {
    const section = d.createElement('section');
    section.classList.add(element.class);
    section.innerHTML = '<h1><a href="pages/fashion.html">' + element.firstTitle + '</a><i class="iconfont icon-chevron-right"></i><a href="pages/design.html">' + element.secondTitle + '</a></h1>';
    main.appendChild(section);
    for (eleObj of eleArr) {
        const article = d.createElement('article');
        if (eleObj.creativeDuration == undefined || eleObj.tool == undefined) {
            article.innerHTML = '<a href="#"><img src="' + eleObj.imgDir + '" alt="' + eleObj.title + '"></a><p>I plan to turn my fashion design drawing into the real clothes. This is the first project.</p><p><span>Want to know the processes?</span><br><a href="#">Read here</a></p>'
        } else {
            article.innerHTML = '<h2>' + eleObj.title + '</h2><a href="#"><img src="' + eleObj.imgDir + '" alt="' + eleObj.title + '"></a><p><span>' + eleObj.creativeDuration + ' </span><span>' + eleObj.tool + '</span></p>';
        }
        section.appendChild(article);
    }
}