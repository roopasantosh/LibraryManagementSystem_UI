export const UserActionTypes = {
  REGISTER_USER_REQUEST: "@@User/REGISTER_USER_REQUEST",
  REGISTER_USER_SUCCESS: "@@User/REGISTER_USER_SUCCESS",
  REGISTER_USER_FAILURE: "@@User/REGISTER_USER_FAILURE",

  FETCH_USER_REQUEST: "@@User/FETCH_USER_REQUEST",
  FETCH_USER_SUCCESS: "@@User/FETCH_USER_SUCCESS",
  FETCH_USER_FAILURE: "@@User/FETCH_USER_FAILURE",

  FETCH_BOOKS_REQUEST: "@@authentication/FETCH_BOOKS_REQUEST",
  FETCH_BOOKS_SUCCESS: "@@authentication/FETCH_BOOKS_SUCCESS",
  FETCH_BOOKS_FAILURE: "@@authentication/FETCH_BOOKS_FAILURE",

  FETCH_TRANSACTIONS_REQUEST: "@@authentication/FETCH_TRANSACTIONS_REQUEST",
  FETCH_TRANSACTIONS_SUCCESS: "@@authentication/FETCH_TRANSACTIONS_SUCCESS",
  FETCH_TRANSACTIONS_FAILURE: "@@authentication/FETCH_TRANSACTIONS_FAILURE",

  BORROW_BOOK_REQUEST: "@@authentication/BORROW_BOOK_REQUEST",
  BORROW_BOOK_SUCCESS: "@@authentication/BORROW_BOOK_SUCCESS",
  BORROW_BOOK_FAILURE: "@@authentication/BORROW_BOOK_FAILURE",

  RETURN_BOOK_REQUEST: "@@authentication/RETURN_BOOK_REQUEST",
  RETURN_BOOK_SUCCESS: "@@authentication/RETURN_BOOK_SUCCESS",
  RETURN_BOOK_FAILURE: "@@authentication/RETURN_BOOK_FAILURE",

  FETCH_ALLTRANSACTIONS_REQUEST:
    "@@authentication/FETCH_ALLTRANSACTIONS_REQUEST",
  FETCH_ALLTRANSACTIONS_SUCCESS:
    "@@authentication/FETCH_ALLTRANSACTIONS_SUCCESS",
  FETCH_ALLTRANSACTIONS_FAILURE:
    "@@authentication/FETCH_ALLTRANSACTIONS_FAILURE",
};
