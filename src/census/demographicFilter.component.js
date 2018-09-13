import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { userService } from '../_services/';
import { censusAction } from '../_actions';


import Menu from '@material-ui/core/Menu';



const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

function MenuListFormater(props) {
    if (!props.listName) {
        return null;
    }
    return userService.humanizeKey(props.listName);
}



class DemographicFilter extends React.Component {
    button = null;

    state = {
        anchorEl: null,
        selectedIndex: 0,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(censusAction.getFilters());
    }


    handleClickListItem = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleMenuItemClick = (event, option, index) => {

        this.setState({ selectedIndex: index, anchorEl: null });

        const { dispatch } = this.props;
        dispatch(censusAction.getCensusByFilter(option));
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;

        const options = this.props.census.demographic_filter;

        return (
            <div className={classes.root}>
                <List component="nav">
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        onClick={this.handleClickListItem}
                    >
                        <ListItemText
                            primary={userService.humanizeKey(options[this.state.selectedIndex])}
                        />
                    </ListItem>
                </List>
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={option}
                            selected={index === this.state.selectedIndex}
                            onClick={event => this.handleMenuItemClick(event, option, index)}
                        >
                            <MenuListFormater listName={option} />
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

DemographicFilter.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    return {
        census: state.census
    };
}

const DemographicFilterPage = withRouter(connect(mapStateToProps, null, null, {
    pure: false
})(withStyles(styles)(DemographicFilter)));

export { DemographicFilterPage as DemographicFilter };