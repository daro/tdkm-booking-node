import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ModeEditIcon from '@material-ui/icons/EditSharp';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const styleSheet = createMuiTheme(theme => ({
    title: {
        margin: '0 auto',
    }
}));

const Header = ({ classes, currentUser }) => (
    <AppBar position="static" color="default">
        <Toolbar>
            {currentUser &&
                <Avatar alt={currentUser.full_name} src={currentUser.avatar_url} />
            }
            <Typography component="span" type="title" color="inherit" className={classes.title}>
                Home
            </Typography>
            <IconButton component={Link} to="/new">
                <ModeEditIcon />
            </IconButton>
        </Toolbar>
    </AppBar>
);

Header.propTypes = {
    classes: PropTypes.object.isRequired,
    currentUser: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        full_name: PropTypes.string.isRequired,
        avatar_url: PropTypes.string.isRequired,
    }),
};

export default withStyles(styleSheet)(Header);
