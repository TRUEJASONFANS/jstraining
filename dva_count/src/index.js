import React from 'react';
import dva, { connect } from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. model
app.model({
    namespace: 'count',
    state: {
        record: 0,
        current: 0,
    },
    reducers: {
        add(state) {
            const newCurrent = state.current + 1;
            return {
                ...state,
                record: newCurrent > state.record ? newCurrent : state.record,
                current: newCurrent
            }
        },
        minus(state) {
            const newCurrent = state.current - 1;
            return { ...state, current: newCurrent }
        }
    },
    effects: {
        *add(action, { call, put }) {
            yield call(delay,1000);
            yield put({type:'minus'});
        },
    },
    subscriptions: {
        keyboardWatcher({dispatch}) {

        }
    }
});

// 3. View 
const CountApp = ({ count, dispatch }) => {
    return (
        <div >
            <div >Highest Record: {count.record}</div>
            <div >{count.current}</div>
            <div >
                <button onClick={() => { dispatch({ type: 'count/add' }); }}>+</button>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return { count: state.count };
}
const HomePage = connect(mapStateToProps)(CountApp);

// 4. Router
app.router(() => <HomePage />);

// 5. Start
app.start('#root');

function delay(timeout){
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }