import { action } from "typesafe-actions";
import { UserActionTypes } from "./user.model";

export const registerUserRequest = (req) =>
  action(UserActionTypes.REGISTER_USER_REQUEST, req);
export const registerUserSuccess = (res) =>
  action(UserActionTypes.REGISTER_USER_SUCCESS, res);
export const registerUserFailure = (err) =>
  action(UserActionTypes.REGISTER_USER_FAILURE, err);

export const fetchUserRequest = (req) =>
  action(UserActionTypes.FETCH_USER_REQUEST, req);
export const fetchUserSuccess = (res) =>
  action(UserActionTypes.FETCH_USER_SUCCESS, res);
export const fetchUserFailure = (err) =>
  action(UserActionTypes.FETCH_USER_FAILURE, err);

export const fetchBooksRequest = () =>
  action(UserActionTypes.FETCH_BOOKS_REQUEST);
export const fetchBooksSuccess = (res) =>
  action(UserActionTypes.FETCH_BOOKS_SUCCESS, res);
export const fetchBooksFailure = (err) =>
  action(UserActionTypes.FETCH_BOOKS_FAILURE, err);

export const fetchTransactionRequest = () =>
  action(UserActionTypes.FETCH_TRANSACTIONS_REQUEST);
export const fetchTransactionSuccess = (res) =>
  action(UserActionTypes.FETCH_TRANSACTIONS_SUCCESS, res);
export const fetchTransactionFailure = (err) =>
  action(UserActionTypes.FETCH_TRANSACTIONS_FAILURE, err);

export const fetchBookBorrowRequest = (bookId) =>
  action(UserActionTypes.BORROW_BOOK_REQUEST, bookId);
export const fetchBookBorrowSuccess = (res) =>
  action(UserActionTypes.BORROW_BOOK_SUCCESS, res);
export const fetchBookBorrowFailure = (err) =>
  action(UserActionTypes.BORROW_BOOK_FAILURE, err);

export const fetchBookReturnRequest = (bookId) =>
  action(UserActionTypes.RETURN_BOOK_REQUEST, bookId);
export const fetchBookReturnSuccess = (res) =>
  action(UserActionTypes.RETURN_BOOK_SUCCESS, res);
export const fetchBookReturnFailure = (err) =>
  action(UserActionTypes.RETURN_BOOK_FAILURE, err);

export const fetchAllTransactionRequest = () =>
  action(UserActionTypes.FETCH_ALLTRANSACTIONS_REQUEST);
export const fetchAllTransactionSuccess = (res) =>
  action(UserActionTypes.FETCH_ALLTRANSACTIONS_SUCCESS, res);
export const fetchAllTransactionFailure = (err) =>
  action(UserActionTypes.FETCH_ALLTRANSACTIONS_FAILURE, err);
