const initialState = {
    users: [],
    jobs: [],
    education: []
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER' :
            return {...state, users: action.payload};
        case 'SET_JOB':
            return {...state, jobs: action.payload};
        case 'SET_EDUCATION':
            return {...state, education: action.payload};
        default:
            return state
    }
}

export default user