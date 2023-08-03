import React, {useState} from "react";
import style from './pagination.module.scss'


const Pagination = ({totalUsersCount, currentPage, pageSize, onPageChange, partSize = 8 }) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++ ) {
        pages.push(i);
    }

    let partCount = Math.ceil(pagesCount / partSize);
    let [partNumber, setPartNumber] = useState(1);
    let leftPartPageNumber = (partNumber - 1) * partSize + 1;
    let rightPartPageNumber = partNumber * partSize ;

    return (
        <div className={style.pagination}>
            {partNumber > 1 &&
            <button className={style.pagination__button} onClick={() => { setPartNumber(partNumber - 1)}} >&laquo;</button>
            }

            {pages.filter(page => page >= leftPartPageNumber && page <= rightPartPageNumber)
                .map((page) => {
                    return <span
                        className={`${style.pagination__item} ${currentPage === page && style._active}`}
                        key={page} onClick={(e) => {onPageChange(page)}}>
                        {page}
                    </span>
                })
            }

            { partCount > partNumber &&
                <button className={style.pagination__button} onClick={() => {setPartNumber(partNumber +1)}} >&raquo;</button>
            }
        </div>
    )
}

export default Pagination;