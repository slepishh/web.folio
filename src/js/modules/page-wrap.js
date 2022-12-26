document.addEventListener('DOMContentLoaded', () => {
    if ($('.page').length) {
        let content = $('.page');
        let tables = content.find('table');
        let pImg = content.find('p > img');
        let img = content.find('img');
        let iframe = content.find('p > iframe');
        let video = content.find('p > video');
        tables.wrap('<div class="page-table">');
        pImg.parent().addClass('page-img')
        img.addClass('page-img')
        iframe.parent().addClass('page-img')
        iframe.parent().addClass('page-iframe')
        video.parent().addClass('page-img')
    }
});