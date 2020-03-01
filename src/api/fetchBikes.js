import bikes from './mockBikes';
import R from 'ramda';
import request from 'superagent';
import mockCategories from './mockCategories';

export const fetchBikes = async () =>{
    return new Promise(resolve =>{
        resolve(bikes);
    });

    // const {body} = await request.get('http://www.mocky.io/v2/5918b9461200001f1040dbeb');
    // return body.phones;
};

export const loadMore = async ({offset}) => {
    return new Promise((resolve)=>{
        resolve(bikes);
    });
};

export const fetchBikeById = async id=>{
    return new Promise((resolve,reject)=>{
        console.log("Id in api fetchBikes " , id);
        const bike = R.find(R.propEq('id',id),bikes);
        resolve(bike);
    });
};

export const fetchCategories = async ()=>{
    return new Promise(resolve =>{
        resolve(mockCategories);
    });
}