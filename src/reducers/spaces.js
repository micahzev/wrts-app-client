export default(state = [], action) => {
    switch (action.type) {
        case 'list':
          return [action.items];
        case 'add':
            return [...state, action.item];
        default:
            return state;
    }
};
