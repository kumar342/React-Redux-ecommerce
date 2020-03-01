import {fetchBikes as fetchBikesApi,
        loadMore as loadMoreApi,
        fetchBikeById as fetchBikeByIdApi,
        fetchCategories  as fetchCategoriesApi}  from '../api/fetchBikes';
import {getRenderedBikesLength} from '../selectors/Bikes';

export const fetchBikes = ()=>{
    
    return async (dispatch) => {
        try{
            dispatch({
                type: 'FETCH_BIKE_START'
            });
            const bikes = await fetchBikesApi();
            dispatch({
                type: 'FETCH_BIKE_SUCCESS',
                payload: bikes
            });
        }catch(err){
            dispatch({
                type: 'FETCH_BIKE_FAIL',
                payload: err,
                error: true
            });
        };
    };
};

export const fetchCategories = ()=>{
    
    return async (dispatch,getState)=>{
        // console.log("Fetching entire state ", getState());
        try{
            dispatch({
                type: 'FETCH_CATEGORIES_START'
            });
            const categories = await fetchCategoriesApi();
            dispatch({
                type: 'FETCH_CATEGORIES_SUCCESS',
                payload: categories
            });
        }catch(err){
            dispatch({
                type: 'FETCH_CATEGORIES_FAILURE',
                payload: err,
                error: true
            });
        };
    };
}; 

export const loadMore = ()=>{
    
    return async (dispatch,getState) => {
        const offset = getRenderedBikesLength(getState());
        try{
            dispatch({
                type: 'LOAD_MORE_START'
            });
            const bikes = await loadMoreApi({offset});
            dispatch({
                type: 'LOAD_MORE_SUCCESS',
                payload: bikes
            });
        }catch(err){
            dispatch({
                type: 'LOAD_MORE_FAILURE',
                payload: err,
                error: true
            });
        };
    };
};

export const fetchBikeById = id=>{
    return async (dispatch,getState) => {
        const offset = getRenderedBikesLength(getState());
        try{
            dispatch({
                type: 'FETCH_BIKE_BY_ID_START'
            });
            const bike = await fetchBikeByIdApi(id);
            dispatch({
                type: 'FETCH_BIKE_BY_ID_SUCCESS',
                payload: bike
            });
        }catch(err){
            dispatch({
                type: 'FETCH_BIKE_BY_ID_FAILURE',
                payload: err,
                error: true
            });
        };
    };
};

export const addBikeToBasket = id => dispatch => {
    dispatch({
        type: 'ADD_BIKE_TO_BASKET',
        payload: id
    });
};

export const searchBike = text => dispatch =>{
    console.log("searching ", text);
    dispatch({
        type: 'SEARCH_BIKE',
        payload: text
    })};

export const removeBikeFromBasket = (id)=> async dispatch =>{
    dispatch({
        type: 'REMOVE_BIKE_FROM_BASKET',
        payload: id
    });
};   

export const cleanBasket = ()=>dispatch => {
    dispatch({
        type: 'CLEAN_BASKET'
    });
};

export const basketCheckout = (bikes)=> () =>{
    alert(JSON.stringify(bikes));
};