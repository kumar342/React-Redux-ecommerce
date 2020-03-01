import React from 'react';
import {connect} from 'react-redux';
import { getTotalBasketPrice,getBasketBikesWithCount } from '../selectors/Bikes';
import R from 'ramda';
import {removeBikeFromBasket,cleanBasket,basketCheckout} from '../actions/Bikes';
import {Link} from 'react-router';

const Basket = ({bikes,totalPrice,
                removeBikeFromBasket,cleanBasket,
                basketCheckout})=>{
    // console.log(phones);
    // console.log(totalPrice);
    const isBasketEmpty = R.isEmpty(bikes);
    const renderContent = () => {
        return (
            <div>
                {isBasketEmpty && <div> Your shopping cart is empty </div>}
                <div className="table-responsive">
                    <table className="table-bordered table-striped table-condensed cf">
                        <tbody>
                            {bikes.map((bike,index)=>(
                                <tr key={index}
                                    className="item-checout">
                                    <td className="first-column-checkout">
                                        <img className="img-thumbnail"
                                            src={bike.image}
                                            alt={bike.name}  
                                        />
                                    </td>
                                    <td>{bike.name}</td>
                                    <td>INR {bike.price}</td>
                                    <td>{bike.count}</td>
                                    <td>
                                        <span className="delete-cart"
                                        onClick={()=>removeBikeFromBasket(bike.id)}></span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {
                    R.not(isBasketEmpty) &&
                    <div className="row">
                        <div className="pull-right total-user-checkout">
                            <b>Total:</b>
                             INR {totalPrice}
                        </div>
                    </div>
                }
            </div>
            )
        };

        const renderSidebar = ()=>{
            return(
                <div>   
                    <Link
                        className="btn btn-info"
                        to="/"
                    >
                    <span className="glyphicon glyphicon-info-sign"/>
                    <span> Continue Shopping</span>
                    </Link>
                    {
                        R.not(isBasketEmpty) &&
                        <div>
                            <button className="btn btn-danger"
                                    onClick={()=>cleanBasket()}        
                            >
                            <span className="glyphicon glyphicon-trash"/>
                            Clean Cart
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={()=>basketCheckout(bikes)}
                            >
                            <span className="glyphicon glyphicon-envelope"/>
                            Checkout
                            </button>
                        </div>
                    }
                </div>
            );
        };

    return(
        <div className="view-container">
            <div className="container">
                <div className="row">
                    <div className="col-md-9">
                        {renderContent()}
                    </div>
                    <div className="col-md-3 btn-user-checkout">
                        {renderSidebar()}
                    </div>
                </div>
            </div>
        </div>
    );
    };


const mapStateToProps = (state)=>({
    bikes: getBasketBikesWithCount(state),
    totalPrice: getTotalBasketPrice(state)
});

const mapDispatchToProps = (dispatch)=>({
    removeBikeFromBasket: (id)=>dispatch(removeBikeFromBasket(id)),
    cleanBasket: ()=>dispatch(cleanBasket()),
    basketCheckout: (bikes)=>dispatch(basketCheckout(bikes))
});

export default connect(mapStateToProps,mapDispatchToProps)(Basket);