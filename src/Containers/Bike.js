import React from 'react';
import {connect} from 'react-redux';
import {fetchBikeById,addBikeToBasket} from '../actions/Bikes';
import {getBikesById} from '../selectors/Bikes';
import R from 'ramda';
import BasketCart  from './BasketCart';
import {Link} from 'react-router';


class Bike extends React.Component{

    componentDidMount = () => this.props.fetchBikeById(this.props.params.id);

    renderFields = ()=>{
        const {bike} = this.props;
        const columnFields = R.compose(
            R.toPairs,
            R.pick([
                'engine_displacement',
                'mileage',
                'power',
                'gearbox'
            ])
        )(bike);
        // console.log("columnFields ", columnFields);
        return columnFields.map(([key,value])=>{
            return(
                <div className='column' key={key}>
                    <div className='ab-details-title'>
                        <p> { key } </p>
                    </div>
                    <div className='ab-details-info'>
                        <p> { value } </p>
                    </div>
                </div>
            );
           
        });
    };

    renderContent = ()=>{
        const {bike} = this.props;
        return(
            <div>
                <div className='thumbnail'>
                    <div className="col-md-6">
                        <img className='img-thumbnail'
                            src={bike.image}
                            alt={bike.name}
                        />

                    </div>
                    <div className="col-md-6">
                        {this.renderFields()}
                    </div>
                </div>
                <div className='caption-full'>
                    <h4 className='pull-right'>
                        INR{bike.price}
                    </h4>
                    <h4>
                        {bike.name}
                    </h4>
                    <p>
                        {bike.description}
                    </p>
                </div>
            </div>
        );
    };

    renderSideBar = ()=>{
        
        const {bike,addBikeToBasket} = this.props;
        return(
            <div>
               <div>
                    <p className ='lead'> Quick Shop</p>
                    <BasketCart />
                    <div className='form-group'>
                        <h1>{bike.name}</h1>
                        <h2>{bike.price}</h2>
                    </div>
               </div>
               <Link to="/"
                    className="btn btn-info btn-block">
                    Back to Store
                </Link>
                <button type="button"
                        className="btn btn-success btn-block"
                        onClick={()=>addBikeToBasket(bike.id)}>
                    Add To Cart
                </button>
            </div>
        );
    };

    render(){
        // console.log(this.props.phone);
        const {bike} = this.props;
        return(
            <div className='view-container'>
                <div className='container'>
                    <div className='col-md-9'>
                        {bike && this.renderContent()}
                    </div>
                    <div className='col-md-3'>
                        {bike && this.renderSideBar()}
                    </div>
                </div>
            </div>
        );
    }
}

// export default Phone;
const mapDispatchtoProps = (dispatch)=>({
    fetchBikeById: (id)=>{dispatch(fetchBikeById(id))},
    addBikeToBasket: (id)=>{dispatch(addBikeToBasket(id))}
});

const mapStateToProps = (state)=>({
    bike: getBikesById(state,state.BikePage.id)
});

export default connect(mapStateToProps,mapDispatchtoProps)(Bike);