import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import {
  AccountBoxSharp,
  ArrowRight,
  CalendarToday,
  Email,
  Fingerprint,
  HelpOutline,
  People,
  Person,
  Star,
  StarHalf,
} from "@material-ui/icons";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRequest } from "../../store/user/user.actions";
import { getCurrentUser } from "../../store/user/user.selector";
import TitleBar from "../base/TitleBar";

export default function ProfileContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserRequest());
  }, []);

  const { currentUser } = useSelector((state) => {
    return {
      currentUser: getCurrentUser(state),
    };
  }, []);

  return (
    <>
      <TitleBar
        heading="Profile Information"
        secondary={"Library"}
        icon={<HelpOutline />}
      />
      <Grid container spacing={2}>
        <Grid item md={6} lg={6} sm={12} xs={12}>
          <List>
            <ListItem>
              <ListItemAvatar>
                <AccountBoxSharp />
              </ListItemAvatar>
              <ListItemText primary={currentUser.name} secondary="Name" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Email />
              </ListItemAvatar>
              <ListItemText primary={currentUser.email} secondary="Email" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <Person />
              </ListItemAvatar>
              <ListItemText primary={currentUser.status} secondary="Status" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemAvatar>
                <CalendarToday />
              </ListItemAvatar>
              <ListItemText
                primary={moment(currentUser.createdOn).format("LLL")}
                secondary="Profile Created On"
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
}
