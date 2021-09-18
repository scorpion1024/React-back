const store = { token: '' };

const reducer = (state = store, action) => {
    switch (action.type) {
        case 'putToken':
            return { token: action.token };
        default:
            return state;
    }
}

export default reducer;