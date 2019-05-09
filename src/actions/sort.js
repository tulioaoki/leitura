export const INITIAL_SORT = 'INITIAL_SORT'
export const CHANGE_SORT = 'CHANGE_SORT'


export function initialSort () {
    return {
        type: INITIAL_SORT,
        sort: 'score',
    }
}

export function changeSort (sort) {
    return {
        type: CHANGE_SORT,
        sort: sort,
    }
}

export function handleChangeSort(dispatch,sort){
        dispatch(changeSort(sort))
}