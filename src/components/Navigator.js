import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import TimerIcon from '@material-ui/icons/Timer';
import SettingsIcon from '@material-ui/icons/Settings';
import {Link, Redirect, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import styles from "../utils/navigator_styles"
import { handleChangeSort} from "../actions/sort";

class Navigator extends React.Component{

    state = {
        redirect:false
    };

    render(){
        const teste = [];
        const { classes, ...other } = this.props;
        const setRedirect = (to) => {
            this.setState({redirect:to})

        }
        if  (this.props.categories !== undefined && this.props.categories.categories !== undefined){
                                  for (let x of this.props.categories.categories) {
                                      teste.push({
                                          id: x.path,
                                          icon: <SettingsEthernetIcon />,
                                          category:x.path,
                                          func: () => setRedirect('/category/'+x.path)
                                          })


                              }}



        const handleOrderPostsByScore = () => {
            const { dispatch } = this.props
            handleChangeSort(dispatch,'score')
        }

        const handleOrderPostsByDate = () => {
            const { dispatch } = this.props
            handleChangeSort(dispatch,'timestamp')
        }

        const categories = [
            {
                id: 'Categories',
                children: teste,
            },
            {
                id: 'Order by',
                children: [
                    {
                        id: 'Score',
                        icon: <SettingsIcon />,
                        func:handleOrderPostsByScore,
                    },
                    {
                        func:handleOrderPostsByDate,
                        id: 'Data',
                        icon: <TimerIcon />,
                    },
                ],
            },
        ];
        if(this.state.redirect !== false){
            this.setState({redirect:false})
            return <Redirect to={this.state.redirect}/>
        }
        return (
            <Drawer variant="permanent" {...other}>
                <List disablePadding>
                    <ListItem className={classNames(classes.item, classes.itemCategory)}>
                        <ListItemIcon>
                            <HomeIcon color="secondary" fontSize="large"/>
                        </ListItemIcon>
                        <ListItemText
                            classes={{
                                primary: classes.itemPrimary,
                            }}
                        >
                            <Link className='link' to='/' style={{'padding': '15px'}}>
                                HOME
                            </Link>
                        </ListItemText>
                    </ListItem>
                    {categories.map(({id, children}) => (
                        <React.Fragment key={id}>
                            <ListItem className={classes.item}>
                                <ListItemText
                                    classes={{
                                        primary: classes.item,
                                    }}
                                >
                                    {id}
                                </ListItemText>
                            </ListItem>
                            {children.map(({id: childId, icon, active, category, func}) => (
                                <ListItem
                                    button
                                    dense
                                    onClick={func}

                                    key={childId}
                                    className={classNames(
                                        classes.item,
                                        classes.itemActionable,
                                        active && classes.itemActiveItem,
                                    )}
                                >
                                    <ListItemIcon>{icon}</ListItemIcon>
                                    <ListItemText
                                        classes={{
                                            primary: classes.itemPrimary,
                                            textDense: classes.textDense,

                                        }}
                                    >
                                        {category !== undefined && (
                                            category
                                        )}

                                        {category === undefined && (
                                            childId
                                        )}

                                    </ListItemText>
                                </ListItem>
                            ))}
                            <Divider className={classes.divider}/>
                        </React.Fragment>
                    ))}
                </List>
            </Drawer>
    )
}
}




const mapStateToProps = ({ categories, classes, posts }) => ({
    categories:categories ,
    classes:classes,
    posts: posts
})


Navigator.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Navigator)))