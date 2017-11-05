import React from 'react'
import PropTypes from 'prop-types'
import {Provider, connect} from 'react-redux'
import {createStore} from 'redux'

const Counter = ({ value, onIncreaseClick }) => {
    return <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>
            Increase
    </button>
    </div>
}

Counter.propTypes = {
    value: PropTypes.number.isRequired,
}



const increaseAction = { type: 'increase' }

// Reducer
function counter(state = { count: 0 }, action) {
    const count = state.count
    switch (action.type) {
      case 'increase':
        return { count: count + 1 }
      default:
        return state
    }
  }

// Store
const store = createStore(counter)

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    value: state.count
  }
}
// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

const CounterApp = connect(mapStateToProps,
    mapDispatchToProps)(Counter);

const CounterAppWrapper  = ()=> (<Provider store={store}><CounterApp/></Provider>);
export default CounterAppWrapper;