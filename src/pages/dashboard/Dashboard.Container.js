import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
} from "@material-ui/core";
import { AccountBalanceWallet, BookOutlined } from "@material-ui/icons";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleBar from "../base/TitleBar";
import Loader from "../base/loader";
import {
  fetchBookBorrowRequest,
  fetchBookReturnRequest,
  fetchBooksRequest,
  fetchTransactionRequest,
  fetchUserRequest,
} from "../../store/user/user.actions";
import { getBooks, getTransactions } from "../../store/user/user.selector";
import { decodeToken } from "../../helpers/utility";
import Swal from "sweetalert2";

export default function DashboardContainer() {
  const dispatch = useDispatch();
  const { isLoading, books, transactions, decodedtoken } = useSelector(
    (state) => {
      return {
        books: getBooks(state),
        transactions: getTransactions(state),
        decodedtoken: decodeToken(),
        isLoading: state.AuthenticationReducer.isLoading,
      };
    }
  );

  useEffect(() => {
    dispatch(fetchUserRequest());
    dispatch(fetchBooksRequest());
    dispatch(fetchTransactionRequest());
  }, []);

  const handleClick = (id, isBorrowed) => {
    Swal.fire({
      title: " Confirmation",
      text: `Are you sure want to ${
        isBorrowed ? "return the book ?" : "borrow the book"
      }`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes , Proceed",
    }).then((s) => {
      if (s.isConfirmed) {
        if (isBorrowed) {
          dispatch(fetchBookReturnRequest(id));
        } else {
          dispatch(fetchBookBorrowRequest(id));
        }
      }
    });
  };
  return (
    <div>
      {isLoading && <Loader />}
      <TitleBar
        heading="List of Books"
        secondary={"Library"}
        icon={<HelpOutlineIcon />}
      />

      <Grid container className="mt-2" spacing={2}>
        {books.map((t) => {
          let isBorrowed =
            transactions.filter(
              (s) => s.bookId == t.id && s.transactionType == "Borrow"
            ).length > 0;
          return (
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Card elevation={10}>
                <CardHeader
                  title={t.title}
                  subheader={t.author || "Anonymuous"}
                />
                <CardContent style={{ textAlign: "center" }}>
                  <img
                    width="120"
                    //src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyNCIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTEwMjguNCkiPjxwYXRoIGQ9Im0zIDh2MiAxIDMgMSA1IDFjMCAxLjEwNSAwLjg5NTQgMiAyIDJoMTRjMS4xMDUgMCAyLTAuODk1IDItMnYtMS01LTQtM2gtMTh6IiBmaWxsPSIjMTZhMDg1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEwMjguNCkiLz48cGF0aCBkPSJtMyAxMDM1LjR2MiAxIDMgMSA1IDFjMCAxLjEgMC44OTU0IDIgMiAyaDE0YzEuMTA1IDAgMi0wLjkgMi0ydi0xLTUtNC0zaC0xOHoiIGZpbGw9IiNlY2YwZjEiLz48cGF0aCBkPSJtMyAxMDM0LjR2MiAxIDMgMSA1IDFjMCAxLjEgMC44OTU0IDIgMiAyaDE0YzEuMTA1IDAgMi0wLjkgMi0ydi0xLTUtNC0zaC0xOHoiIGZpbGw9IiNiZGMzYzciLz48cGF0aCBkPSJtMyAxMDMzLjR2MiAxIDMgMSA1IDFjMCAxLjEgMC44OTU0IDIgMiAyaDE0YzEuMTA1IDAgMi0wLjkgMi0ydi0xLTUtNC0zaC0xOHoiIGZpbGw9IiNlY2YwZjEiLz48cGF0aCBkPSJtNSAxYy0xLjEwNDYgMC0yIDAuODk1NC0yIDJ2MSA0IDIgMSAzIDEgNSAxYzAgMS4xMDUgMC44OTU0IDIgMiAyaDJ2LTFoLTEuNWMtMC44Mjg0IDAtMS41LTAuNjcyLTEuNS0xLjVzMC42NzE2LTEuNSAxLjUtMS41aDEyLjUgMWMxLjEwNSAwIDItMC44OTUgMi0ydi0xLTUtNC0zLTFjMC0xLjEwNDYtMC44OTUtMi0yLTJoLTQtMTB6IiBmaWxsPSIjMTZhMDg1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEwMjguNCkiLz48cGF0aCBkPSJtOCAxdjE4aDEgOSAxYzEuMTA1IDAgMi0wLjg5NSAyLTJ2LTEtNS00LTMtMWMwLTEuMTA0Ni0wLjg5NS0yLTItMmgtNC02LTF6IiBmaWxsPSIjMWFiYzljIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEwMjguNCkiLz48L2c+PC9zdmc+"
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyNCIgdmVyc2lvbj0iMS4xIiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6Y2M9Imh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL25zIyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTEwMjguNCkiPjxnPjxwYXRoIGQ9Im01IDEwMjguNGMtMS4xMDQ2IDAtMiAwLjktMiAydjEgNyAxIDMgMSA1IDFjMCAxLjEgMC44OTU0IDIgMiAyaDE0YzEuMTA1IDAgMi0wLjkgMi0ydi0xLTUtNC00LTEtMy0xYzAtMS4xLTAuODk1LTItMi0yaC00LTEweiIgZmlsbD0iIzE2YTA4NSIvPjxwYXRoIGQ9Im02IDEwMjguNGMtMS4xMDQ2IDAtMiAwLjktMiAydjggNCA2YzAgMS4xIDAuODk1NCAyIDIgMmg4IDRjMS4xMDUgMCAyLTAuOSAyLTJ2LTYtNC00LTRjMC0xLjEtMC44OTUtMi0yLTJoLTQtOHoiIGZpbGw9IiNlY2YwZjEiLz48cGF0aCBkPSJtMTUgMTA0Mi40djEgMSAxIDRoNGMxLjEwNSAwIDItMC45IDItMnYtMi0yLTFoLTZ6IiBmaWxsPSIjMmVjYzcxIi8+PHBhdGggZD0ibTE1IDEwMzcuNHYxIDEgMSA0aDRjMS4xMDUgMCAyLTAuOSAyLTJ2LTItMi0xaC02eiIgZmlsbD0iI2U3NGMzYyIvPjxwYXRoIGQ9Im0xNSAxMDMyLjR2MSAxIDEgNGg0YzEuMTA1IDAgMi0wLjkgMi0ydi0yLTItMWgtNnoiIGZpbGw9IiNmMWM0MGYiLz48cGF0aCBkPSJtMTUgMHYyaDR2MiAyYzEuMTA1IDAgMi0wLjg5NTQgMi0ydi0yYzAtMS4xMDQ2LTAuODk1LTItMi0yaC00eiIgZmlsbD0iIzI5ODBiOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxMDI4LjQpIi8+PHBhdGggZD0ibTUgMTAyOC40Yy0xLjEwNDYgMC0yIDAuOS0yIDJ2OCA0IDVoMXYxIDNjMC0xLjEgMC44OTU0LTIgMi0yaDggMSAxLjI4MSAwLjcxOSAwLjI4MWMwLjc0IDAgMS4zNzMtMC40IDEuNzE5LTF2LTEtNS00LTQtNGMwLTEuMS0wLjg5NS0yLTItMmgtNC04eiIgZmlsbD0iIzFhYmM5YyIvPjwvZz48ZyBmaWxsPSIjMTZhMDg1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLC0yKSI+PHBhdGggZD0ibTEwLjQzOSAxMDQxYzAgMC41IDAuMTA4IDAuOSAwLjMyMyAxLjIgMC4yMiAwLjMgMC41MTYgMC41IDAuODg5IDAuNSAwLjM2OCAwIDAuNjYzLTAuMiAwLjg4Mi0wLjUgMC4yMi0wLjMgMC4zMjktMC43IDAuMzI5LTEuMnMtMC4xMTItMC45LTAuMzM1LTEuMmMtMC4yMi0wLjMtMC41MTYtMC40LTAuODg5LTAuNC0wLjM2NCAwLTAuNjU2IDAuMS0wLjg3NiAwLjQtMC4yMTUgMC4zLTAuMzIzIDAuNy0wLjMyMyAxLjJtMi41NDggMS45Yy0wLjEyNSAwLjMtMC4zMjYgMC41LTAuNjAzIDAuNy0wLjI3MyAwLjEtMC41OTQgMC4yLTAuOTYzIDAuMi0wLjcxMiAwLTEuMjkyLTAuMi0xLjczOTUtMC44LTAuNDQzMS0wLjUtMC42NjQ3LTEuMS0wLjY2NDctMiAwLTAuOCAwLjIyMzYtMS41IDAuNjcwOS0yczEuMDI1My0wLjggMS43MzMzLTAuOGMwLjM2OSAwIDAuNjkgMC4xIDAuOTYzIDAuMyAwLjI3NyAwLjEgMC40NzggMC40IDAuNjAzIDAuN3YtMC44aDEuMjk4djQuM2MwLjUxNC0wLjEgMC45MTctMC40IDEuMjExLTAuOHMwLjQ0MS0wLjkgMC40NDEtMS42YzAtMC40LTAuMDYtMC44LTAuMTgtMS4xLTAuMTItMC40LTAuMzAyLTAuNy0wLjU0Ni0xLTAuMzk0LTAuNS0wLjg4Ny0wLjktMS40NzktMS4yLTAuNTg4LTAuMy0xLjIyNi0wLjQtMS45MTMtMC40LTAuNDgxIDAtMC45NDEgMC0xLjM4IDAuMi0wLjQzOSAwLjEtMC44NDQ1IDAuMy0xLjIxNzIgMC41LTAuNjEzIDAuNC0xLjA5MTMgMS0xLjQzNTEgMS42LTAuMzM5NiAwLjYtMC41MDk0IDEuMy0wLjUwOTQgMi4xIDAgMC42IDAuMTA5OCAxLjIgMC4zMjkzIDEuNyAwLjIyMzYgMC42IDAuNTQ0NiAxIDAuOTYyOSAxLjUgMC40MTQyIDAuNCAwLjg4ODQgMC43IDEuNDIyNiAwLjkgMC41Mzg5IDAuMiAxLjExMTkgMC4zIDEuNzIwOSAwLjMgMC41MjIgMCAxLjA0NC0wLjEgMS41NjYtMC4zIDAuNTIxLTAuMiAwLjk2Ny0wLjQgMS4zMzUtMC44bDAuNjY1IDFjLTAuNTE4IDAuNC0xLjA4MyAwLjctMS42OTYgMS0wLjYwOSAwLjItMS4yMjggMC4zLTEuODU4IDAuMy0wLjc2NiAwLTEuNDg5LTAuMi0yLjE2NzctMC40LTAuNjc5My0wLjMtMS4yODM5LTAuNy0xLjgxNDEtMS4yLTAuNTMwMS0wLjUtMC45MzM5LTEuMS0xLjIxMTQtMS44cy0wLjQxNjItMS40LTAuNDE2Mi0yLjIgMC4xNDA4LTEuNSAwLjQyMjQtMi4yIDAuNjgzNC0xLjMgMS4yMDUyLTEuOGMwLjUyMTktMC41IDEuMTI4Ni0wLjkgMS44MjAzLTEuMiAwLjY5NTUtMC4yIDEuNDE2NS0wLjQgMi4xNjE1LTAuNCAwLjkyOCAwIDEuNzcxIDAuMiAyLjUyOSAwLjYgMC43NTggMC4zIDEuMzkxIDAuOCAxLjkwMSAxLjUgMC4zMTEgMC40IDAuNTQ1IDAuOCAwLjcwMiAxLjMgMC4xNjEgMC41IDAuMjQyIDEgMC4yNDIgMS41IDAgMS4xLTAuMzM3IDItMS4wMTIgMi42LTAuNjc2IDAuNi0xLjYyOCAwLjktMi44NTggMC45aC0wLjI0MnYtMC45Ii8+PC9nPjxnPjxwYXRoIGQ9Im0yIDEwMzEuNHYxaDJ2LTFoLTJ6bTAgM3YxaDJ2LTFoLTJ6bTAgM3YxaDJ2LTFoLTJ6bTAgM3YxaDJ2LTFoLTJ6bTAgM3YxaDJ2LTFoLTJ6bTAgM3YxaDJ2LTFoLTJ6IiBmaWxsPSIjOTVhNWE2Ii8+PHBhdGggZD0ibTUgMTAyOC40Yy0xLjEwNDYgMC0yIDAuOS0yIDJ2MSA3IDEgMyAxIDUgMWMwIDEuMSAwLjg5NTQgMiAyIDJoMWMtMS4xMDQ2IDAtMi0wLjktMi0ydi0xLTUtMS0zLTEtNy0xYzAtMS4xIDAuODk1NC0yIDItMmgtMXoiIGZpbGw9IiMxYWJjOWMiLz48cGF0aCBkPSJtMyAxMDMxLjR2MWgxdi0xaC0xem0wIDN2MWgxdi0xaC0xem0wIDN2MWgxdi0xaC0xem0wIDN2MWgxdi0xaC0xem0wIDN2MWgxdi0xaC0xem0wIDN2MWgxdi0xaC0xeiIgZmlsbD0iIzE2YTA4NSIvPjwvZz48ZyBmaWxsPSIjYmRjM2M3Ij48cGF0aCBkPSJtMiAxMDMwLjR2MWgxdi0xaC0xem0wIDN2MWgxdi0xaC0xem0wIDN2MWgxdi0xaC0xem0wIDN2MWgxdi0xaC0xem0wIDN2MWgxdi0xaC0xem0wIDN2MWgxdi0xaC0xeiIvPjxwYXRoIGQ9Im0yIDEwMzAuNGMtMC41NTIzIDAtMSAwLjQtMSAxIDAgMC41IDAuNDQ3NyAxIDEgMXYtMnoiLz48cGF0aCBkPSJtMiAxMDMzLjRjLTAuNTUyMyAwLTEgMC40LTEgMSAwIDAuNSAwLjQ0NzcgMSAxIDF2LTJ6Ii8+PHBhdGggZD0ibTIgMTAzNi40Yy0wLjU1MjMgMC0xIDAuNC0xIDEgMCAwLjUgMC40NDc3IDEgMSAxdi0yeiIvPjxwYXRoIGQ9Im0yIDEwMzkuNGMtMC41NTIzIDAtMSAwLjQtMSAxIDAgMC41IDAuNDQ3NyAxIDEgMXYtMnoiLz48cGF0aCBkPSJtMiAxMDQyLjRjLTAuNTUyMyAwLTEgMC40LTEgMSAwIDAuNSAwLjQ0NzcgMSAxIDF2LTJ6Ii8+PHBhdGggZD0ibTIgMTA0NS40Yy0wLjU1MjMgMC0xIDAuNC0xIDEgMCAwLjUgMC40NDc3IDEgMSAxdi0yeiIvPjwvZz48cGF0aCBkPSJtMyAxMDMwLjR2MWgxdi0xaC0xem0wIDN2MWgxdi0xaC0xem0wIDN2MWgxdi0xaC0xem0wIDN2MWgxdi0xaC0xem0wIDN2MWgxdi0xaC0xem0wIDN2MWgxdi0xaC0xeiIgZmlsbD0iIzk1YTVhNiIvPjwvZz48L3N2Zz4="
                  />
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    onClick={() => handleClick(t.id, isBorrowed)}
                    variant="contained"
                    color={!isBorrowed ? "primary" : "secondary"}
                    disabled={t.availableCopies == 0 && !isBorrowed}
                  >
                    {isBorrowed
                      ? "Return"
                      : t.availableCopies == 0
                      ? "Not Available"
                      : "Borrow"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
