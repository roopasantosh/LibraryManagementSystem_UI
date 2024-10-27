export function getCurrentUser(state) {
  return state.UserReducer.user;
}

export function getBooks(state) {
  return state.UserReducer.books;
}

export function getTransactions(state) {
  return state.UserReducer.transactions;
}

export function getAllTransactions(state) {
  return state.UserReducer.transactionHistory;
}
