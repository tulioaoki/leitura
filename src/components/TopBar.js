import Toolbar from "./App";
import {Link} from "react-router-dom";
import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import connect from "react-redux/es/connect/connect";

class TopBar extends Component{
    render(){
        return(
            <div>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">
                            <Link className='link' to='/'>
                                HOME
                            </Link>
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}


function mapStateToProps({ classes }){
    return{
        classes:classes,
    }
}

export default connect(mapStateToProps)(TopBar)