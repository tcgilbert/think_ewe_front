import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    backgroundColor: "rgb(59,59,59)",
  },
  tabBtn: {
    color: "white",
    fontWeight: "bold"
  }
});

export default function CenteredTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        id="lookkyyyheerrreee"
        className="tab-container"
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        variant="fullWidth"
      >
        <Tab className={classes.tabBtn} label="Posts"/>
      </Tabs>
    </Paper>
  );
}