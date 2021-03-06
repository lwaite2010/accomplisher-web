import { createActions, createReducer } from 'reduxsauce'
import * as R from 'ramda'

const stateKey = 'goals'

// goals: {
//   1: {
//     id: 1,
//     title:
//   }
// }
// actions: {
//   1: {

//   }
// }

const initialState = {
  list: {
    1: {
      id: 1,
      title: 'Cool goal 1',
      setDate: '2018-01-01',
      actionSteps: {
        1: {
          id: 1,
          completed: true,
          title: 'Action step 1'
        },
        2: {
          id: 2,
          completed: false,
          title: 'Action step 2'
        },
        3: {
          id: 3,
          completed: false,
          title: 'Action step 3'
        }
      }
    },
    2: {
      id: 2,
      title: 'Cool goal 2',
      setDate: '2018-01-02',
      actionSteps: {
        4: {
          id: 4,
          completed: true,
          title: 'First Step'
        },
        5: {
          id: 5,
          completed: false,
          title: 'Second Step'
        },
        6: {
          id: 6,
          completed: false,
          title: 'Last step'
        }
      }
    },
    3: {
      id: 3,
      title: 'Cool goal 3',
      setDate: '2018-01-03',
      actionSteps: {
        7: {
          id: 7,
          completed: true,
          title: 'setp the first'
        },
        8: {
          id: 8,
          completed: false,
          title: 'the second step'
        },
        9: {
          id: 9,
          completed: false,
          title: 'finish him'
        }
      }
    },
    4: {
      id: 4,
      title: 'Cool goal 3',
      setDate: '2018-01-03',
      actionSteps: {
        8: {
          id: 8,
          completed: true,
          title: 'setp the first'
        },
        9: {
          id: 9,
          completed: false,
          title: 'the second step'
        },
        10: {
          id: 10,
          completed: false,
          title: 'finish him'
        }
      }
    }
  }
}

const { Types, Creators } = createActions({
  addGoal: ['title', 'setDate', 'actionSteps', 'nextActionStep'],
  fetchGoals: [],
  toggleActionStep: ['goalId', 'actionStepId', 'completed']
})

const addGoal = (state, { title, setDate, actionSteps, nextActionStep }) => {
  const newId = Object.keys(state.list).length + 1
  const newGoal = { id: newId, title, setDate, actionSteps, nextActionStep }
  const newState = R.assoc(newId, newGoal, state.list)
  return R.assoc('list', newState, state)
}

const fetchGoals = state => state

const updateAction = completed => action => {
  return R.assoc('completed', completed, action)
}
const toggleActionStep = (state, { goalId, actionStepId, completed }) => {
  return R.evolve({
    list: {
      [goalId]: {
        actionSteps: {
          [actionStepId]: updateAction(completed)
        }
      }
    }
  })(state)
}

const reducers = createReducer(initialState, {
  [Types.ADD_GOAL]: addGoal,
  [Types.FETCH_GOALS]: fetchGoals,
  [Types.TOGGLE_ACTION_STEP]: toggleActionStep
})

export { Types, Creators, stateKey, reducers }
