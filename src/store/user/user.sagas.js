import { call, put, takeEvery } from "redux-saga/effects";
import * as UserActions from "./user.actions";
import UserAPI from "./user.api";
import { UserActionTypes } from "./user.model";
import Swal from "sweetalert2";

function* handleRegisterUser(action) {
  try {
    const response = yield call(UserAPI.RegisterUser, action.payload);
    yield put(UserActions.registerUserSuccess(response));
    Swal.fire({
      title: "Registration successful",

      icon: "success",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      showConfirmButton: false,
      cancelButtonText: "Close",
      customClass: {
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    });
  } catch (e) {
    yield put(UserActions.registerUserFailure(e));
  }
}

function* handleCurrentUser() {
  try {
    const response = yield call(UserAPI.GetCurrentUser);
    yield put(UserActions.fetchUserSuccess(response));
  } catch (e) {
    yield put(UserActions.fetchUserFailure(e));
  }
}

function* handlFetchBooks() {
  try {
    const response = yield call(UserAPI.GetBooks);
    yield put(UserActions.fetchBooksSuccess(response));
  } catch (e) {
    yield put(UserActions.fetchBooksFailure(e));
  }
}

function* handleFetchTransactions() {
  try {
    const response = yield call(UserAPI.GetTransactions);
    yield put(UserActions.fetchTransactionSuccess(response));
  } catch (e) {
    yield put(UserActions.fetchTransactionFailure(e));
  }
}
function* handleReturnBook(action) {
  try {
    const response = yield call(UserAPI.ReturnBook, action.payload);
    yield put(UserActions.fetchBookReturnSuccess(response));
    yield put(UserActions.fetchTransactionRequest());
    yield put(UserActions.fetchBooksRequest());
    Swal.fire({
      title: "Book Returned",
      text: "Book Returned Successfully",
      icon: "success",
    });
  } catch (e) {
    yield put(UserActions.fetchBookReturnFailure(e));
  }
}

function* handleBorrowBook(action) {
  try {
    const response = yield call(UserAPI.BorrowBook, action.payload);
    yield put(UserActions.fetchBookBorrowSuccess(response));
    yield put(UserActions.fetchTransactionRequest());
    yield put(UserActions.fetchBooksRequest());
    Swal.fire({
      title: "Book Borrowed",
      text: "Book Borrowed Successfully",
      icon: "success",
    });
  } catch (e) {
    yield put(UserActions.fetchBookBorrowFailure(e));
  }
}
function* handleFetchAllTransactionshistory() {
  try {
    const response = yield call(UserAPI.GetAllTransactions);
    yield put(UserActions.fetchAllTransactionSuccess(response));
  } catch (e) {
    yield put(UserActions.fetchAllTransactionFailure(e));
  }
}
export function* UserSaga() {
  yield takeEvery(UserActionTypes.REGISTER_USER_REQUEST, handleRegisterUser);
  yield takeEvery(UserActionTypes.FETCH_USER_REQUEST, handleCurrentUser);
  yield takeEvery(UserActionTypes.FETCH_BOOKS_REQUEST, handlFetchBooks);
  yield takeEvery(
    UserActionTypes.FETCH_TRANSACTIONS_REQUEST,
    handleFetchTransactions
  );
  yield takeEvery(UserActionTypes.RETURN_BOOK_REQUEST, handleReturnBook);
  yield takeEvery(UserActionTypes.BORROW_BOOK_REQUEST, handleBorrowBook);
  yield takeEvery(
    UserActionTypes.FETCH_ALLTRANSACTIONS_REQUEST,
    handleFetchAllTransactionshistory
  );
}
