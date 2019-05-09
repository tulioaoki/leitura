import React, {Component} from "react";
import connect from "react-redux/es/connect/connect";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';


class NewPostButton extends Component{
    render(){
        const classes = this.props;
        return(
            <Fab color="default" aria-label="Add" className={classes.fab}>
                <AddIcon />
            </Fab>
        )
    }
}

function mapStateToProps({ classes }){
    return {
        classes:classes
    }
}


export default connect(mapStateToProps)(NewPostButton)