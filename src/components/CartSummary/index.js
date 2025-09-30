import './index.css'

import CartContext from '../../context/CartContext'

const CartSummary = () => (
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
          <button className="checkout_button" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
