import { Avatar, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUser } from '../../store/user/user.selector';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    paddingLeft: theme.spacing(1),
    color: '#FFFFFF',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  listItem: {
    padding: 0,
  },
  calendarItem: {
    right: 0,
  },
  leftIcon: {
    color: '#FFFFFF',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.dark,
  },
}));

export default function TitleBar(props) {
  const classes = useStyles();

  const { currentUser } = useSelector((state) => {
    return {
      currentUser: getCurrentUser(state),
    };
  });
  return (
    <List className={classes.root}>
      <ListItem className={classes.listItem}>
        <ListItemIcon className={classes.leftIcon}>
          <Avatar className={classes.avatar}>{props.icon}</Avatar>
        </ListItemIcon>
        <ListItemText
          primary={props.heading}
          secondary={<>{currentUser.name}</>}
          classes={{ secondary: classes.leftIcon }}
        />
        {props.action && <ListItemSecondaryAction>{props.action}</ListItemSecondaryAction>}
      </ListItem>
    </List>
  );
}
