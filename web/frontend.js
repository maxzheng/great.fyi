import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Hidden from '@material-ui/core/Hidden';
import HomeIcon from '@material-ui/icons/Home';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const homeTitle = 'Everything You Need to Know to Be Great!';
const foodTitle = 'Delicious Food Reviews';
const lifeGuideTitle = 'A Great Life Guide';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  container: {
    maxWidth: '100em',
    paddingLeft: '1em',
    paddingRight: '1em',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '2em',
      paddingRight: '2em',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth - 30,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    paddingTop: theme.spacing(1.5),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(3),
    },
  },
}));

const Bold = ({ children }) => <span style={{ fontWeight: 'bold' }}>{children}</span>


function Home(props) {
  return (<div>
    <Typography paragraph>
      We have <Link href='#food' onClick={(e) => props.setTitle(foodTitle)}>delicious food reviews</Link> and <Link href='#life-guide' onClick={(e) => props.setTitle(lifeGuideTitle)}>a great life guide</Link> so far. More to come later!
    </Typography>
    <Typography variant="h5" gutterBottom align='center'>
      <pre>
      ===========================<br />
      =                         =<br />
      =         O     O         =<br />
      =                         =<br />
      =            U            =<br />
      =                         =<br />
      ===========================<br />
      </pre>
    </Typography>
  </div>)
}


function LifeGuide(props) {
  return (<div>
    <Typography paragraph>
      Congrats on starting a great life that is simple, peaceful, passionate, fruitful, meaningful, and happy!
    </Typography>
    <Typography paragraph>
      To be the greatest you, follow these 5 simple steps consistently:
    </Typography>
    <Typography paragraph>
    <ol>
      <li><Bold>One thing at a time.</Bold> There are many things going on in life, and so life seems complicated, but realistically, we can do or think about one thing at a time. If we do just that, life becomes simple, and things actually get done faster with higher quality.</li>
      <li><Bold>Be mindful with acceptance.</Bold> This lets you fully take in, understand, and enjoy what's currently happening (i.e. moments of life) without judgement or expectations. Meditate to train mindfulness by focusing on your breath or positive thoughts and emotions -- learn from and let go of negative ones and everything else. With everything that that you do, be focused while being aware of the surrounding. Then you are peaceful, and nothing from the outside can disturb you -- no matter what others say or do to you. Happiness starts from here.</li>
      <li><Bold>Energize your body, passion, and mind.</Bold> Those are the raw energies that enable you to do everything at peak performance. Exercise regularly to build up energy in your body. Do what you love, enjoy everything that you do, and be your true self to let your passion flow freely and wildly. Always keep learning and thinking to push the boundary of your mind. Finally don't forget to rest well to rejuvenate. Keep your heart pumping fast and live passionately! <FavoriteIcon color='secondary'/></li>
      <li><Bold>Aim at your target.</Bold> There must be a target (e.g. task, goal, mission) at any time as it provides the direction for what you want to do so you don't wander around aimlessly. There can be many targets, but aim at only one for a period of time to make good progress, then your life is fruitful. Set a goal for each day (e.g., today's goal is to relax and have fun). As there are many targets, you should set at least one life goal -- the big things that you want to do with your life. Prioritize the targets based on important values to get the highest return on your time.</li>
      <li><Bold>Do the right thing in the right way.</Bold> That is the fastest way to get everything you want as doing the wrong thing requires redo and some things can not be undone. Sometimes it's tempting to do the wrong things for a quick / short-term gain, but there are always consequences. In the long run, doing the right thing wins as it builds momentum from previous accomplishments. The right things to do are meaningful. It is equally important to do things in the right way with everything that you got and don't let anything hold you back, so you get the most out of time. Always understand why you do something before how.</li>
    </ol>
    </Typography>
    <Typography paragraph>
      Easily remember the steps using the acronym <Bold>1 BEAD</Bold> from the first word/letter of each step. Each step must be done successfully in order so the next step is easier to do. It takes time to master each step, but the results are immediate and increasingly substantial. When things are not going as expected, take a timeout to rest and reflect using the steps. Mastery is achieved when all steps are followed consistently and naturally for everything that you do and are done using <Bold>100%</Bold> of your energies with at least 1% for being mindful always. And voilà, a great life!
    </Typography>
    <Typography paragraph>
      <span style={{ fontStyle: 'italic' }}>Note: This is v3.7 release of <Link color='inherit' href='https://github.com/maxzheng/great-life-guide'>https://github.com/maxzheng/great-life-guide</Link> to allow for easy sharing, liking, or commenting</span>
    </Typography>
  </div>)
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <br />
      {'Copyright © '}
      <Link color="inherit" href="http://1bead.org/">
        1 BEAD
      </Link>
    </Typography>
  );
}

function FoodReviews() {
  return <div>Yummy yum yum</div>
}

function ResponsiveDrawer(props) {
  const classes = props.classes
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [title, setTitle] = React.useState(homeTitle);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        {['Great FYI'].map((text, index) => (
                    <ListItem button key={text} onClick={ () => { setTitle(homeTitle);
                                                                  setMobileOpen(false) } } >
                      <ListItemIcon><HomeIcon /></ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
      </List>
      <Divider />
      <List>
        {['Food Reviews'].map((text, index) => (
                    <ListItem button key={text} onClick={ () => { setTitle(foodTitle);
                                                                  setMobileOpen(false) } } >
                      <ListItemIcon><FastfoodIcon /></ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
      </List>
      <Divider />
      <List>
        {['Life Guide'].map((text, index) => (
                    <ListItem button key={text} onClick={ () => { setTitle(lifeGuideTitle);
                                                                  setMobileOpen(false) } } >
                      <ListItemIcon><MenuBookIcon /></ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{ paper: classes.drawerPaper, }}
            ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{ paper: classes.drawerPaper, }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        { title == homeTitle && <Home setTitle={setTitle} /> }
        { title == lifeGuideTitle && <LifeGuide /> }
        { title == foodTitle && <FoodReviews /> }
        <Copyright />
      </main>
    </div>
  );
}

function App() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <ResponsiveDrawer classes={classes}/>
    </div >
  );
}

ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);
