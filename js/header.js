// variables
const d = document;
const header = d.querySelector('#header');
const goToTop = d.querySelector('#goToTop');
const footer = d.querySelector('#footer');

let screenHeight = window.innerHeight;
//console.log(screenHeight);
let screenWidth = window.innerWidth;
//console.log(screenWidth);
let headerHeight = header.offsetHeight;
//console.log(headerHeight);
let footerHeight = footer.offsetHeight;

function initHeader() {
    // show and hide main menu in mobile mode
    const showMenuBtn = d.querySelector('#showMenu');
    const closeMenuBtn = d.querySelector('#closeMenuBtn');
    const menu = d.querySelector('#menu');
    const toSubMenu1 = d.querySelector('#toSubMenu1');
    const toSubMenu2 = d.querySelector('#toSubMenu2');

    showMenuBtn.addEventListener('click', function() {
        menu.style.left = '0';
        goToTop.style.display = 'none';
    })
    closeMenuBtn.addEventListener('click', function() {
        menu.style.left = '-' + screenWidth + 'px';
        goToTop.style.display = 'block';
        toSubMenu1.checked = false;
        toSubMenu2.checked = false;
    })

    //show and hide search box
    const showHideSearchBox = d.querySelector('#search');
    let isSearchShown = false;
    let enDivHeight = showHideSearchBox.children[0].offsetHeight;
    //console.log(enDivHeight);

    showHideSearchBox.children[0].addEventListener('click', function() {
        if (isSearchShown) {
            showHideSearchBox.children[1].style.height = 0;
            showHideSearchBox.children[1].style.borderTop = 'none';
            isSearchShown = false;
        } else {
            showHideSearchBox.children[1].style.height = enDivHeight + 'px';
            showHideSearchBox.children[1].style.borderTop = '1px solid #fff';
            isSearchShown = true;
        }
    });

    // show and hide submenu in tablet mode
    function showSubmenu() {
        const hasSubmenuList = d.querySelectorAll('.has-submenu');
        //console.log(hasSubmenuList); 
        var hasSubmenuListToLeft = [];
        for (let i = 0; i < hasSubmenuList.length; i++) {
            hasSubmenuListToLeft.push(hasSubmenuList[i].offsetLeft);
        }
        //console.log(hasSubmenuListToLeft)
        const submenu = d.querySelectorAll('.submenu');
        submenu.forEach((ele, value) => {
            ele.style.left = '-' + hasSubmenuListToLeft[value] + 'px';
            ele.style.boxShadow = '0 0 10px #fff';
            ele.children[0].style.paddingLeft = hasSubmenuListToLeft[value] + 'px';
        });

        toSubMenu1.addEventListener('click', function() {
            if (this.checked) {
                toSubMenu2.checked = false;
            }
        });
        toSubMenu2.addEventListener('click', function() {
            if (this.checked) {
                toSubMenu1.checked = false;
            }
        });
    }

    if (screenWidth > 768) {
        showSubmenu();
    }

    // desktop 
    if (screenWidth > 1024) {
        window.addEventListener('scroll', function() {
            if (this.scrollY >= headerHeight) {
                header.classList.add('scroll-up');
                headerHeight = header.offsetHeight;
                showSubmenu();
                //console.log(this.scrollY);
            } else if (this.scrollY < headerHeight) {
                header.classList.remove('scroll-up');
                headerHeight = header.offsetHeight;
                showSubmenu();
                //console.log(headerHeight);
                //console.log(this.scrollY);
            }
        });
    }
}