import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link, withRouter} from "react-router-dom";
import {connect} from "react-redux";

const styles = {
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -18,
        marginRight: 10,
    },
};

class DenseAppBar extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            categories:[],
        }
    }

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit">
                            <div style={{'display':'inline-block'}}>
                                <Link className='link' to='/' style={{'padding':'15px'}}>
                                    HOME
                                </Link>
                                { this.props.categories && this.props.categories.categories !== undefined &&
                                <span>
                                  {this.props.categories.categories.map((item) => (
                                      <Link className='link' to={'/category/'+item.path} style={{'padding':'15px'}}>
                                          {item.path}
                                      </Link>
                                  ))}
                              </span>}
                            </div>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

}

const mapStateToProps = ({ categories, classes }) => ({
    categories:categories ,
    classes:classes,
})


DenseAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(DenseAppBar)))