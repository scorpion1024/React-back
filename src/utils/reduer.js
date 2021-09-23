const store = { routes: [] };

const reducer = (state = store, action) => {
    switch (action.type) {
        case 'putRoutes':
            return { token: action.routes };
        default:
            return state;
    }
}

export default reducer;