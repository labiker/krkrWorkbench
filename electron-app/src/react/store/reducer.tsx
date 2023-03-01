const initialState = {
    appPath: '',
    screenWidth: 1024,
    screenHeight: 768,
};
  
const counterReducer = (state = initialState, action:{type:string, target:string, value:number|string}) => {
    switch (action.type) {
        case 'UPDATE':
            return { ...state, [action.target]: action.value };
        default:
            return state;
    }
};
  
export default counterReducer;