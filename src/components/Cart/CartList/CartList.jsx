import React, { PureComponent } from 'react';
import "./css/style.css";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CartItem from './../CartItem/CartItem';
import { removeItemInCart } from "../../../actions/cartAction";
class CartList extends PureComponent {

    constructor(props) {
        super(props);
    }

    renderCartItemList = () => {
        const { cart } = this.props;
        if (cart.length > 0) {
            return cart.map((cart, index) => {
                return (
                    <CartItem key={index} product={cart.product} qty={cart.qty} removeCartItem={this.removeCartItem} />
                );
            });
        }
        return (
            <div className="h-100 row justify-content-center align-items-center">
                <h1 >No Cart</h1>

            </div>
        )
    }

    removeCartItem = (product) => {
        this.props.removeItemInCart(product);
    }

    totalPrice = () => {
        const { cart } = this.props;
        if (cart.length > 0) {
            return cart.reduce((preValue, item) => {
                return preValue + (item.product.salePrice * item.qty);
            }, 0);
        }
        return 0;
    }
    render() {
        return (
            <div className="container single_product_container" style={{ marginTop: '190px' }}>
                <div className="card shopping-cart">
                    <div className="card-body">
                        {this.renderCartItemList()}

                    </div>
                    <div className="card-footer">

                        <div className="pull-right" style={{ margin: '10px' }}>
                            <a className="btn btn-success pull-right" style={{ background: '#fe6164', borderColor: '#fe6164', color: '#fff' }}>Checkout</a>
                            <div className="pull-right" style={{ margin: '5px' }}>
                                Total price: <b>${this.totalPrice()}</b>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        removeItemInCart,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList);