import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        background: theme.palette.secondary.dark,
        borderRadius: 'unset',
        color: theme.palette.common.white
    },
    footer: {
        marginTop: 0,
        padding: 0,
        textAlign: 'right',
        width: '100%',
    },
    powered: {
        float: 'left'
    }
}));

export default function Footer() {
    const classes = useStyles();
    return (
        <footer className={classes.footer}>
            <Paper className={classes.root} elevation={0}>
                <Typography component="p">
                    @ 2024, LMS Copyright All rights reserved
                </Typography>
            </Paper>
        </footer>
    );
}