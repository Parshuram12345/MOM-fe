const OPEN_CALLOUT = 'OPEN_CALLOUT';
const CLOSE_CALLOUT = 'CLOSE_CALLOUT';

export const closeCloseout = () => ({type: CLOSE_CALLOUT});


const initialState = {
  showCallout: true
};


const settingsReducer = (state = initialState, action) => {
  switch (action.type) {

      case OPEN_CALLOUT:
      return {
        showCallout: true
      };

    case CLOSE_CALLOUT:
      return {
          showCallout: false
      };


    default:
      return state;
  }
};

export default settingsReducer;
