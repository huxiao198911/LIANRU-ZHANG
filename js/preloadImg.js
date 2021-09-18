function preloadedImages(imgsList) {
    const preloadedImgs = [];
    for (let i = 0; i < imgsList.length; i++) {
        preloadedImgs.push(new Image());
        preloadedImgs[i].src = imgsList[i].src;
    }
}