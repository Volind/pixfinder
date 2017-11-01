chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.text === 'count-images') {
        const count = findImages(msg.options);
        sendResponse(count);
    }
});

function findImages(options = {}) {
    const imgs = findImgTagsCount(options.filter);
    const pictures = findPictureTagsCount(options.filter);
    const cssImgs = findCSSImagesCount(options.filter);

    let count = 0;

    if (options.filter) {
        if (options.filter.showImageTags) {
            count += imgs;
        }
        if (options.filter.showPictureTags) {
            count += pictures;
        }
        if (options.filter.showCSSImages) {
            count += cssImgs;
        }
    }

    return count;
}

function findImgTagsCount(filter) {
    const imgTags = document.getElementsByTagName('img');

    return filterVisible([...imgTags], filter).length;
}

function findPictureTagsCount(filter) {
    const pictureTags = document.getElementsByTagName('picture');

    return filterVisible([...pictureTags], filter).length;
}

function findCSSImagesCount(filter) {
    const all = document.getElementsByTagName("*");
    const len = all.length;
    const result = [];
    for (var i = 0; i < len; i++) {
        const computedStyleProperty = document.defaultView.getComputedStyle(all[i], null)['background-image'];
        if (computedStyleProperty && computedStyleProperty !== "none") {
            result.push(all[i]);
        }
    }
    return filterVisible(result, filter).length;
}

function filterVisible(images, filter = {}) {
    let { width, height} = filter;

    width = width || 0;
    height = height || 0;
    
    images = images.filter(img => {
        const computedStyles = document.defaultView.getComputedStyle(img, null);
        const widthProperty = computedStyles['width'];
        const heightProperty = computedStyles['height'];
        const displayProperty = computedStyles['display'];
        const imageWidth = parseInt(widthProperty);
        const imageHeight = parseInt(heightProperty);


        return imageWidth && imageWidth >= width &&
               imageHeight && imageHeight >= height &&
               displayProperty !== 'none';
    });
    return images;
}