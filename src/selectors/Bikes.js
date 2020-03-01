import R from 'ramda';


export const getBikesById = (state,id)=>R.prop(id,state.bike);


export const getBikes = (state,ownProps)=>{
    // const phones = R.map(id=>getPhonesById(state,id),state.PhonesPage.ids);
    // return phones;

    const activeCategoryId = getActiveCategoryId(ownProps);
    // console.log("activeCategoryId " , activeCategoryId);
    const applyCategory = (item)=>{
        // console.log("Item ", item);
        return R.equals(
            activeCategoryId,
            R.prop('categoryId',item)
        );
    };
    const applySearch = (item)=>{
        return R.contains(
            state.BikesPage.search,
            R.prop('name',item)
        )
    };
    const bikes = R.compose(
        R.filter(applySearch),
        R.when(R.always(activeCategoryId), R.filter(applyCategory)),
        R.map(id=>getBikesById(state,id))
    )(state.BikesPage.ids);
    return bikes;
};

export const getRenderedBikesLength = state => R.length(state.BikesPage.ids);

export const getTotalBasketPrice = state=>{
    
    const bikes = R.map(id=>getBikesById(state,id),state.Basket);
    // console.log("Phones are " , phones);
    let total = 0;
    return bikes.reduce((total,bike)=>{
        return total + bike.price;
    }, total);
    // console.log("Phone total is ", phnTotal);
};

export const getTotalBasketCount = state=>{
    return state.Basket.length;
};

export const getCategories = (state)=>{
    // console.log(" fething categories from state " ,R.values(state.Categories));
    return R.values(state.Categories);
};

export const getActiveCategoryId = ownProps=>{
    // console.log("ownProps " , ownProps);
    return R.path(['params','id'],ownProps);
};

export const getBasketBikesWithCount = (state)=>{
    const uniqueIds = R.uniq(state.Basket);

    const bikeCount = (id)=>{
        return(
            R.compose(
                R.length,
                R.filter(basketId => R.equals(id,basketId))
            )(state.Basket)
        );
    };
    const bikeWithCount = (bike)=>{
        return R.assoc('count',bikeCount(bike.id),bike);
    };
    const bikes = R.compose(
        R.map(bikeWithCount),
        R.map(id => getBikesById(state,id))
    )(uniqueIds);
    console.log("Bikes in basket are ", bikes);
    return bikes;
};

