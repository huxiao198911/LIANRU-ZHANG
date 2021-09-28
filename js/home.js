window.addEventListener('load', function() {



    initHeader();
    initHomeMain();

});

function initHomeMain() {
    // object check
    if (!d.querySelector('#carousel') || !d.querySelector('#mainContent')) return false;

    // get all article elements in main 
    const mainContent = d.querySelector('#mainContent');
    const articlesInMain = mainContent.querySelectorAll('article');

    // show and hide goToTop arrow
    window.addEventListener('scroll', function() {
        //go to top
        if (this.scrollY >= screenHeight) {
            goToTop.style.opacity = 1;
        } else {
            goToTop.style.opacity = 0;
        }
        goToTop.addEventListener('click', function() {
            window.scroll({ top: 0, behavior: "smooth" })
        })
    });

    // main articles' background
    for (let i = 0; i < articlesInMain.length; i++) {
        if (i % 2 === 0) {
            articlesInMain[i].style.backgroundColor = '#F7F5F5';
        }
    }

    // swap images
    // get all ul which contains images 
    const imgsInArticle = mainContent.querySelectorAll('.images');

    // get all ul which contains pagination circles
    const imgPagesInArticle = mainContent.querySelectorAll('.imgPages');



    // works only on mobile and tablet
    if (window.innerWidth < 1024) {
        //loop every ul in articles
        for (let i = 0; i < imgsInArticle.length; i++) {
            //console.log(imgsInArticle[i]);
            //console.log(imgPagesInArticle[0]);

            //get each ul which contains images
            const listsInImgs = imgsInArticle[i].children;
            //console.log(listsInImgs);

            //set index on every pagination circle
            imgPagesInArticle[i].setAttribute('data-index', i);

            //set index on every ul
            let indexForUl = imgPagesInArticle[i].getAttribute('data-index');

            //loop images in one ul
            for (let i = 0; i < listsInImgs.length; i++) {
                //creat pagination circles based on the number of images
                const liInImgPages = d.createElement('li');
                imgPagesInArticle[indexForUl].appendChild(liInImgPages);
            }

            // get a pagination list collection in the page ul
            const listsInImgPages = imgPagesInArticle[i].children;
            const ulOffWidth = listsInImgs[0].offsetWidth / (listsInImgs[0].children.length);
            listsInImgPages[0].className = 'current';

            //add two more images in image ul, one before the first image list, one at the end of the image list
            const liBeforeFirst = listsInImgs[listsInImgs.length - 1].cloneNode(true);
            imgsInArticle[i].insertBefore(liBeforeFirst, listsInImgs[0]);

            const liToLast = listsInImgs[1].cloneNode(true);

            imgsInArticle[i].appendChild(liToLast);

            //auto play
            let counter = 0;

            function autoPlay() {
                counter++;
                let imgUlOffset = (counter + 1) * ulOffWidth;
                swapImg(imgsInArticle[indexForUl], imgUlOffset);
            }

            //let timer = setInterval(autoPlay, 2000);

            //clearInterval(timer);
            imgsInArticle[indexForUl].addEventListener('transitionend', function() {
                if (counter >= (imgsInArticle[indexForUl].children.length - 2)) {
                    counter = 0;
                    imgsInArticle[indexForUl].style.transition = 'none';
                    let translatex = -ulOffWidth;
                    imgsInArticle[indexForUl].style.transform = 'translateX(' + translatex + 'px)';
                } else if (counter < 0) {
                    counter = imgsInArticle[indexForUl].children.length - 3;
                    imgsInArticle[indexForUl].style.transition = 'none';
                    let translatex = -(imgsInArticle[indexForUl].children.length - 2) * ulOffWidth;
                    imgsInArticle[indexForUl].style.transform = 'translateX(' + translatex + 'px)';
                }

                //pagination circle changes
                this.nextElementSibling.querySelector('.current').classList.remove('current');
                this.nextElementSibling.children[counter].classList.add('current');
            });

            // click event
            //swap image function
            function swapImg(ele, target, callback) {
                ele.style.transition = 'transform 0.3s';
                ele.style.transform = 'translateX(-' + target + 'px)';
            }

            function clickImgHandler(e) {

                let imgPagesIndex = this.getAttribute('data-img-pages-index');
                counter = parseInt(imgPagesIndex);
                //console.log(counter);
                //console.log(imgPagesIndex);
                for (let i = 0; i < this.parentNode.children.length; i++) {
                    this.parentNode.children[i].className = '';
                }
                this.className = 'current';

                let imgUlOffset = (counter + 1) * ulOffWidth;
                //console.log(imgUlOffset);
                //console.log(ulOffWidth);
                //console.log(counter + 1);
                swapImg(imgsInArticle[indexForUl], imgUlOffset);
                //clearInterval(timer);
                //timer = setInterval(autoPlay, 2000);
            }

            for (let i = 0; i < listsInImgPages.length; i++) {
                listsInImgPages[i].setAttribute('data-img-pages-index', i);
                //click events
                listsInImgPages[i].addEventListener('click', clickImgHandler);
            }

            //finger touch swap 
            let touchStartX = 0;
            let startTime = null;
            let flag = false;

            function touchstartHandler(e) {
                let imgIndex = this.getAttribute('data-img-index');
                startTime = Date.now();
                touchStartX = e.changedTouches[0].pageX;
                //console.log(touchStartX);
                //clearInterval(timer);
                //console.log(counter);
            }

            function touchmoveHandler(e) {
                let imgIndex = this.getAttribute('data-img-index');
                let touchmoveX = e.changedTouches[0].pageX - touchStartX;
                let imgUlOffset = -counter * ulOffWidth + touchmoveX;
                //console.log(imgUlOffset);
                flag = true;
                //console.log(touchmoveX);
                e.preventDefault();
            }

            function touchendHandler(e) {
                //console.log(this);
                let imgIndex = this.getAttribute('data-img-index');
                let touchmoveX = e.changedTouches[0].clientX - touchStartX;
                //console.log(touchmoveX);
                let moveTime = Date.now() - startTime;
                if (flag) {
                    if (Math.abs(touchmoveX) > ulOffWidth / 3 || (moveTime < 300 && Math.abs(touchmoveX) > 50)) {
                        if (touchmoveX > 0) {
                            counter--;
                        } else {
                            counter++;
                        }
                        let imgUlOffset = -(counter + 1) * ulOffWidth;
                        swapImg(this, -imgUlOffset);
                    } else {
                        let imgUlOffset = -(counter + 1) * ulOffWidth;
                        swapImg(this, -imgUlOffset);
                    }
                }
                //clearInterval(timer);
                // timer = setInterval(autoPlay, 2000);
            }

            imgsInArticle[indexForUl].setAttribute('data-img-index', i);
            imgsInArticle[indexForUl].addEventListener('touchstart', touchstartHandler);
            imgsInArticle[indexForUl].addEventListener('touchmove', touchmoveHandler);
            imgsInArticle[indexForUl].addEventListener('touchend', touchendHandler);





            preloadedImages(imgsInArticle[indexForUl]);
        }
    } else {
        window.addEventListener('scroll', function() {
            if (this.scrollY >= headerHeight) {
                mainContent.style.marginTop = screenHeight - headerHeight + 'px';
            } else if (this.scrollY < headerHeight) {
                mainContent.style.marginTop = screenHeight - headerHeight + 'px';
            }
        });

        // Desktop homepage carousel
        const carousel = d.querySelector('#carousel');
        const sliderImages = d.querySelector('#sliderImages');
        const sliderPagination = d.querySelector('#pagination');
        const sliderArrows = d.querySelector('#arrows');
        const slideToLeft = sliderArrows.children[0];
        const slideToRight = sliderArrows.children[1];

        let counter = 0;
        //Create li elements in sliderPagination
        for (let i = 0; i < sliderImages.children.length; i++) {
            const page = d.createElement('li');
            page.setAttribute('data-index', i);
            sliderPagination.appendChild(page);
            sliderPagination.children[0].classList.add('current');
        }
        const pageLis = sliderPagination.children;
        for (page of pageLis) {
            page.addEventListener('click', function() {
                let index = parseInt(this.getAttribute('data-index'));
                for (let i = 0; i < pageLis.length; i++) {
                    pageLis[i].classList.remove('current');
                }
                this.classList.add('current');
                sliderImages.style.transform = 'translatex(-' + screenWidth * (index + 1) + 'px)';
                sliderImages.style.transition = 'transform 1s';
                counter = index;
            });
        }

        // add two more images in sliderImages
        const afterLastImg = sliderImages.firstElementChild.cloneNode(true);
        const beforeFirstImg = sliderImages.lastElementChild.cloneNode(true);
        sliderImages.appendChild(afterLastImg);
        sliderImages.insertBefore(beforeFirstImg, sliderImages.firstElementChild);

        let timesToLeft = 0;
        let timesToRight = 0;
        let hasTransitioned = true;
        let timer;

        function sliderGoLeft() {
            clearTimeout(timer);
            if (hasTransitioned == true) {
                hasTransitioned = false;
                if (timesToLeft > sliderImages.children.length - 3) {
                    timesToLeft = 0;
                    sliderImages.style.transition = 'none';
                    sliderImages.style.transform = 'translateX(-' + (timesToLeft + 1) * screenWidth + 'px)';
                } else {
                    timesToLeft++;
                    console.log("timesToLeft:" + timesToLeft);
                    sliderImages.style.transition = 'transform 1s';
                    sliderImages.style.transform = 'translateX(-' + (timesToLeft + 1) * screenWidth + 'px)';
                }
            }
            timer = setTimeout(() => {
                hasTransitioned = true;
            }, 1000);
        }

        function sliderGoRight() {
            clearTimeout(timer);
            if (hasTransitioned == true) {
                hasTransitioned = false;
                if (timesToRight < 0) {
                    timesToRight = sliderImages.children.length - 3;
                    sliderImages.style.transition = 'none';
                    sliderImages.style.transform = 'translateX(-' + (timesToRight + 1) * screenWidth + 'px)';
                } else {
                    timesToRight--;
                    console.log("timesToRight" + timesToRight);
                    sliderImages.style.transition = 'transform 1s';
                    sliderImages.style.transform = 'translateX(-' + (timesToRight + 1) * screenWidth + 'px)';
                }
            }
            timer = setTimeout(() => {
                hasTransitioned = true;
            }, 1000);
        }

        slideToLeft.addEventListener('click', sliderGoRight);
        slideToRight.addEventListener('click', sliderGoLeft);
    }
}