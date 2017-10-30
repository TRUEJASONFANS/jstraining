import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import Link from '../components/Link';


const mapStateToProps = (state, ownProps) => ({ // define the external state how to impact the internal props
    active: ownProps.filter === state.visibilityFilter
  })

const mapDispatchToProps = (dispatch, ownProps) => ({// define what kind of action should be dispatched to store.
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  })

const FilterLink = connect(
    mapStateToProps,
    mapd
)(Link)