import React from 'react';
import {connect} from 'react-redux';
import {fetchBikes,fetchCategories} from '../actions/Bikes';
import {getBikes} from '../selectors/Bikes';
import {Link} from 'react-router';
import R from 'ramda';
import {loadMore,addBikeToBasket} from '../actions/Bikes';

class Bikes extends React.Component{

    componentDidMount(){
        this.props.fetchBikes();
        this.props.fetchCategories();
    }

    renderBike = (bike,index)=>{
        const {addBikeToBasket} = this.props;
        const shortDesc = `${R.take(60,bike.description)}...`;
        return (
            <div className='col-sm-4 col-lg-4 col-md-4 book-list' key={index}>
                <div className="thumbnail">
                    <img className='img-thumbnail'
                        src={bike.image}
                        alt={bike.name}
                    />
                </div>
                <div className="caption">
                    <h4 className="pull-right">
                        INR{bike.price}
                    </h4>
                    <h4>
                        <Link to={`./Bikes/${bike.id}`}>
                            {bike.name}
                        </Link>
                    </h4>
                    <p> {shortDesc}</p>
                    <p className='itemButton'>
                        <button className="btn btn-primary"
                                onClick={()=>addBikeToBasket(bike.id)}>
                            Buy Now
                        </button>
                        <Link to={`/Bikes/${bike.id}`}
                            className="btn btn-default">
                            More Info
                        </Link>
                    </p>
                </div>
            </div>
        );
    };

    render(){
        const {bikes,loadMore} = this.props;
        return(
        <div>
            <div className="books row">
                {bikes.map((bike,index)=>{
                    return this.renderBike(bike,index);
                })}
            </div>
            <div className="row">
                <div className="col-md-12">
                    <button className="pull-right btn btn-primary"
                            onClick={loadMore}>
                        Load More
                    </button>
                </div>

            </div>
        </div>            
       
        )};
};

const mapDispatchToProps = (dispatch)=>({
    fetchBikes: ()=>dispatch(fetchBikes()),
    loadMore: ()=>dispatch(loadMore()),
    addBikeToBasket: (id)=>dispatch(addBikeToBasket(id)),
    fetchCategories: ()=>dispatch(fetchCategories())
});
//ownProps are available here because this component is defined directly on route.
//child componenets must include compose withRoutes
const mapStateToProps = (state,ownProps)=>({
    bikes: getBikes(state,ownProps)
});

export default connect(mapStateToProps,mapDispatchToProps)(Bikes);