import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '5px 5px 0px',
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "auto",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchBar(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <IconButton onClick={props.handleSearch} className={classes.iconButton}>
        <SearchIcon />
      </IconButton>
      <InputBase
        className={classes.input}
        placeholder="Search Books..."
        value={props.search}
        onChange={(e) => props.setSearch(e.target.value)}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton onClick={() => props.setSearch("")} color="primary" className={classes.iconButton} aria-label="directions">
        <ClearIcon />
      </IconButton>
    </Paper>
  );
}