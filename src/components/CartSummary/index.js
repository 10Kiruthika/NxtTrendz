import './index.css'
import {Component} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'

const paymentMethod = [
  {
    id: 'CARD',
    value: 'Card',
  },
  {
    id: 'NET BANKING',
    value: 'Net Banking',
  },
  {
    id: 'UPI',
    value: 'UPI',
  },
  {
    id: 'WALLET',
    value: 'Wallet',
  },
  {
    id: 'CASH ON DELIVERY',
    value: 'Cash on Delivery',
  },
]

class CartSummary extends Component {
  state = {isConfirmClicked: false, paymentType: ''}

  changeinput = event => {
    this.setState({paymentType: event.target.value})
  }

  confirmClicked = () => {
    this.setState(prev => ({isConfirmClicked: !prev.isConfirmClicked}))
  }

  render() {
    const {paymentType, isConfirmClicked} = this.state
    console.log(paymentType)
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          const amount = cartList.reduce(
            (total, each) => total + each.price * each.quantity,
            0,
          )

          return (
            <div className="Checkout_container">
              <h1 className="checkout_head">
                Order Total: <span className="span_style">Rs {amount}/-</span>
              </h1>
              <p className="checkout_para">{cartList.length} items in cart</p>

              <Popup
                modal
                trigger={
                  <button className="checkout_button" type="button">
                    Checkout
                  </button>
                }
              >
                <div className="popup_cont">
                  {isConfirmClicked ? (
                    <p className="success">
                      Your order has been placed successfully.
                    </p>
                  ) : (
                    <>
                      <h1 className="payment_head">Payment Details</h1>
                      <h3>Payment Method</h3>
                      <form onChange={this.changeinput} className="input_cont">
                        {paymentMethod.map(each => {
                          const isEnabled = each.id === 'CASH ON DELIVERY'
                          return (
                            <div key={each.id}>
                              <input
                                type="radio"
                                id={each.id}
                                name="payment"
                                disabled={!isEnabled}
                                value={each.id}
                              />
                              <label
                                htmlFor={each.id}
                                className={`label_text ${
                                  isEnabled === false
                                    ? 'disable-label'
                                    : 'display-label'
                                }`}
                              >
                                {each.value}
                              </label>
                            </div>
                          )
                        })}
                      </form>
                      <h3>Order Details</h3>
                      <p>Quantity: {cartList.length}</p>
                      <p>Total Price: Rs {amount}/-</p>
                      <button
                        className={`confirm_button ${
                          paymentType === '' ? 'disable-button' : ''
                        }`}
                        disabled={!paymentType}
                        onClick={this.confirmClicked}
                      >
                        Confirm Order
                      </button>
                    </>
                  )}
                </div>
              </Popup>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default CartSummary
