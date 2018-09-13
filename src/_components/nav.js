import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { connect } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appFrame: {
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    'appBar-left': {
        marginLeft: drawerWidth,
    },
    'appBar-right': {
        marginRight: drawerWidth,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});


class Navigation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchor: 'left',
        }
    }


    render() {
        const { classes } = this.props;
        const { anchor } = this.state;

        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor={anchor}
            >
                <List component="nav">
                    <ListItem button component='a' href="/census">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="CENSUS" />
                    </ListItem>
                </List>
                <Divider />
            </Drawer>
        );
    }
}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        state
    };
}

export default connect(mapStateToProps)(withStyles(styles)(Navigation));