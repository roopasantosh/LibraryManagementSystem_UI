import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
} from "@material-ui/core";
import { HelpOutline } from "@material-ui/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserRequest,
  fetchTransactionRequest,
  fetchAllTransactionRequest,
} from "../../store/user/user.actions";
import {
  getAllTransactions,
  getBooks,
  getCurrentUser,
} from "../../store/user/user.selector";
import TitleBar from "../base/TitleBar";
import moment from "moment";
import "../../index.css";

export default function TransContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserRequest());
  }, []);

  const { currentUser, transactionHistory } = useSelector((state) => {
    return {
      currentUser: getCurrentUser(state),
      //transactions: getTransactions(state),
      transactionHistory: getAllTransactions(state),
      //books: getBooks(state),
    };
  }, []);
  useEffect(() => {
    dispatch(fetchAllTransactionRequest());
  }, []);
  return (
    <>
      <TitleBar
        heading="Book Transaction History"
        secondary={"Library"}
        icon={<HelpOutline />}
      />
      <Grid container className="mt-2" spacing={2}>
        {transactionHistory.map((t) => {
          return (
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <Card elevation={10}>
                <CardHeader
                  title={t.title}
                  subheader={t.name || "Anonymuous"}
                  //subheaderTypographyProps={t.transactionType}
                />
                <CardContent style={{ textAlign: "center" }}>
                  <img
                    width="120"
                    src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgZGF0YS1uYW1lPSJZb3VyIEljb25zIiBpZD0iWW91cl9JY29ucyIgdmlld0JveD0iMCAwIDQ4IDQ4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjx0aXRsZS8+PHBhdGggZD0iTTgsMTNoNlYyNi4yNkE4LDgsMCwwLDAsMTYsNDJhNy43Nyw3Ljc3LDAsMCwwLDEuNDYtLjE0LDIuNzgsMi43OCwwLDAsMCwuODcuMTRjMi4xNywwLDIuMTctMiw0LjMzLTJzMi4xNywyLDQuMzMsMiwyLjE3LTIsNC4zNC0yLDIuMTYsMiw0LjMzLDJjMS41NiwwLDItMSwyLjkzLTEuNjFBMywzLDAsMCwwLDQwLDM3Ljg0VjExYTUsNSwwLDAsMC01LTVIMTFhNC42Miw0LjYyLDAsMCwwLTEsLjFoMEE1LDUsMCwwLDAsNiwxMSwyLDIsMCwwLDAsOCwxM1ptMiwyMWE2LDYsMCwwLDEsNC01LjY1LDUuNzksNS43OSwwLDAsMSwuOTMtLjI1bC4xMywwQTUuODYsNS44NiwwLDAsMSwxNiwyOGE2LDYsMCwxLDEtNiw2Wk0zNSw4YTMsMywwLDAsMSwzLDNWMzcuODRhMSwxLDAsMCwxLS40Ny44NSw3LjI1LDcuMjUsMCwwLDAtMS4wNS44NGMtLjUuNDUtLjU0LjQ3LS44Mi40N3MtLjMyLDAtLjgxLS40N2E0LjgzLDQuODMsMCwwLDAtNywwYy0uNDkuNDUtLjU0LjQ3LS44MS40N3MtLjMxLDAtLjgtLjQ3QTQuOTEsNC45MSwwLDAsMCwyMi45MiwzOGwwLDBhOC4yOSw4LjI5LDAsMCwwLC43NC0xLjc2bC4wNi0uMjRhNS45NCw1Ljk0LDAsMCwwLC4xNC0uNzEsMi4zNiwyLjM2LDAsMCwwLDAtLjI4QTcuNzcsNy43NywwLDAsMCwyNCwzNGE3LjksNy45LDAsMCwwLS41OS0zSDM1YTEsMSwwLDAsMCwwLTJIMjIuNDZhMS4wNiwxLjA2LDAsMCwwLS4xOSwwLDguMTIsOC4xMiwwLDAsMC0yLjQtMkgzNWExLDEsMCwwLDAsMC0ySDE5YTEsMSwwLDAsMC0xLDEsLjg4Ljg4LDAsMCwwLC4wNi4yOEE3LjgyLDcuODIsMCwwLDAsMTYsMjZWMTFhNyw3LDAsMCwwLS42Ny0zWm0tMjQuNzguMWgwbC4yMSwwQTMuMDYsMy4wNiwwLDAsMSwxMSw4YTMsMywwLDAsMSwyLjEyLjg3LDMuMSwzLjEsMCwwLDEsLjgyLDEuNTNBNS44LDUuOCwwLDAsMSwxNCwxMUg4QTMsMywwLDAsMSwxMC4yMiw4LjFaIi8+PHBhdGggZD0iTTI5LDE0aDZhMSwxLDAsMCwwLDAtMkgyOWExLDEsMCwwLDAsMCwyWiIvPjxwYXRoIGQ9Ik0yOSwxOGg2YTEsMSwwLDAsMCwwLTJIMjlhMSwxLDAsMCwwLDAsMloiLz48cGF0aCBkPSJNMjksMjJoNmExLDEsMCwwLDAsMC0ySDI5YTEsMSwwLDAsMCwwLDJaIi8+PHBhdGggZD0iTTIwLDIyaDRhMiwyLDAsMCwwLDItMlYxNGEyLDIsMCwwLDAtMi0ySDIwYTIsMiwwLDAsMC0yLDJ2NkEyLDIsMCwwLDAsMjAsMjJabTAtOGg0djZIMjBaIi8+PHBhdGggZD0iTTE5LjIsMzMuNzhhMSwxLDAsMCwwLDAtMS40MSwxLDEsMCwwLDAtMS40MiwwbC0yLjQzLDIuMzNMMTQuMiwzMy41NEExLDEsMCwxLDAsMTIuODEsMzVsMS44OCwxLjhhMSwxLDAsMCwwLDEuMzgsMFoiLz48L3N2Zz4="
                  />
                  <table className="table-striped">
                    <tr>
                      <th> Borrowed On</th>
                      <td>{moment(t.createdOn).format("LLL")}</td>
                    </tr>
                    {t.transactionType === "Return" && (
                      <tr>
                        <th> Returned On</th>
                        <td>{moment(t.creaupdatedOntedOn).format("LLL")}</td>
                      </tr>
                    )}
                    <tr>
                      <th> Status</th>
                      <td>{t.transactionType}</td>
                    </tr>
                  </table>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}
