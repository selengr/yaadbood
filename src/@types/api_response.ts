
  
  interface Sort {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  }
  
  interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  }


  export interface IApiResponseWithPagination<T> {
    content: T;
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  }


  export interface IApiResponseCombo<T> {
    dataList: T;
    totalCount: number;
    page: number;
    rows: number;
  }


  // ------------------------------------------------------ usage

    export interface IApiResponseSuccess {
        
    }

    export interface IApiResponseWithData<T> { data: T }

  // ------------------------------------------------------
 