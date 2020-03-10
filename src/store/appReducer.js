const initialState = {
  message: null,
  fetching: false,
  reportAdded: false,
  formError: '',
  reports: {
    previous: {},
    results: [],
    next: {}
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        ...state,
        message: action.message,
      };

    case 'FETCH_REPORT_SUCCESS':
      return {
        ...state,
        reports: action.payload
      };

    case 'FETCH_REPORT_FAILED':
      return {
        ...state,
        reports: {
          previous: {},
          results: [],
          next: {}
        }
      };

    case 'ADD_REPORT_SUCCESS':
      return {
        ...state,
        formError: '',
        reportAdded: true,
      };

    case 'ADD_REPORT_FAILURE':
      return {
        ...state,
        formError: action.payload,
        reportAdded: false
      };

    case 'RESET_FORM':
      return {
        ...state,
        formError: '',
        reportAdded: false,
      }

    default:
      return state;
  }
};
