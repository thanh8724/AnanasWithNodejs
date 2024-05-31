function createPagination(data, itemForPage) {
    const containerPagination = document.querySelector('.content__orders--pagination');
    let pageCount = Math.ceil(data.length / Number(itemForPage)); // tính tổng trang mỗi trang 4 item
    // // Tạo các nút trang
    let paginationItem = '';
    for (let i = 1; i <= pageCount; i++) {
        paginationItem += `<li class="pagination-item">
                                <span class="pagination-item__link">
                                    ${i}
                                </span>
                            </li>`;
    }
    if(pageCount <= 1) {
        containerPagination.innerHTML = '<span class="pagination-title"></span>';
    }else {
        containerPagination.innerHTML = `<span class="pagination-title"></span>
                                            <ul class="pagination">
                                                <li class="pagination-item back-page">
                                                    <span class="pagination-item__link">
                                                        <ion-icon name="chevron-back-outline"></ion-icon>
                                                    </span>
                                                </li>
                                                ${paginationItem}
                                                <li class="pagination-item next-page">
                                                    <span class="pagination-item__link">
                                                        <ion-icon name="chevron-forward-outline"></ion-icon>
                                                    </span>
                                                </li>
                                            </ul>`;
    }
  }