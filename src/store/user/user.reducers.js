import { UserActionTypes } from "./user.model";
require("dotenv").config();

const initialState = {
  user: {},
  books: [],
  transactions: [],
  transactionHistory: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UserActionTypes.REGISTER_USER_REQUEST:
    case UserActionTypes.FETCH_USER_REQUEST:
    case UserActionTypes.FETCH_BOOKS_REQUEST:
    case UserActionTypes.FETCH_TRANSACTIONS_REQUEST:
    case UserActionTypes.FETCH_ALLTRANSACTIONS_REQUEST:
    case UserActionTypes.BORROW_BOOK_REQUEST:
    case UserActionTypes.RETURN_BOOK_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case UserActionTypes.REGISTER_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case UserActionTypes.FETCH_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };
    }

    case UserActionTypes.FETCH_BOOKS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        books: action.payload,
      };
    }

    case UserActionTypes.FETCH_TRANSACTIONS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        transactions: action.payload,
      };
    }
    case UserActionTypes.BORROW_BOOK_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        //transactions: action.payload,
      };
    }
    case UserActionTypes.RETURN_BOOK_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        //transactions: action.payload,
      };
    }

    case UserActionTypes.FETCH_ALLTRANSACTIONS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        transactionHistory: action.payload,
      };
    }

    case UserActionTypes.REGISTER_USER_FAILURE:
    case UserActionTypes.FETCH_BOOKS_FAILURE:
    case UserActionTypes.FETCH_TRANSACTIONS_FAILURE:
    case UserActionTypes.FETCH_ALLTRANSACTIONS_FAILURE:
    case UserActionTypes.BORROW_BOOK_FAILURE:
    case UserActionTypes.RETURN_BOOK_FAILURE:
    case UserActionTypes.FETCH_USER_FAILURE: {
      return {
        ...state,
        isLoading: false,
      };
    }

    default: {
      return state;
    }
  }
};

export { reducer as UserReducer };
