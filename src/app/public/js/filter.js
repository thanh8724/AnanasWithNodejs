function filter() {
    const btn_showFilter = document.querySelector('.show-hiddenFilter--btn');
    const main_filter = document.querySelector('.container__filter--main');
    btn_showFilter.addEventListener('click', () => {
        main_filter.classList.toggle('show');
        if(btn_showFilter.querySelector('span').innerText == 'Hiện filter') {
            btn_showFilter.querySelector('span').innerText = 'Ẩn filter'
        }else {
            btn_showFilter.querySelector('span').innerText = 'Hiện filter'
        }
    });
}
filter();