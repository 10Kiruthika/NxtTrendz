import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    this.setState(prev => {
      const checking = prev.cartList.some(each => each.id === product.id)

      if (checking) {
        return {
          cartList: prev.cartList.map(each => {
            if (each.id === product.id) {
              const newQuantity = each.quantity + product.quantity
              return {...each, quantity: newQuantity}
            }
            return each
          }),
        }
      }
      return {cartList: [...prev.cartList, product]}
    })
    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(each => each.id !== id),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList
        .map(each => {
          if (each.id === id) {
            if (each.quantity === 1) {
              return null
            }
            const newQuantity = each.quantity - 1
            return {
              ...each,
              quantity: newQuantity,
            }
          }
          return each
        })
        .filter(each => each !== null),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(each => {
        if (each.id === id) {
          const newQuantity = each.quantity + 1
          return {
            ...each,
            quantity: newQuantity,
          }
        }
        return each
      }),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
