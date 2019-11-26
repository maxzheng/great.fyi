import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
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
import ShareIcon from '@material-ui/icons/Share';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { FacebookShareButton, FacebookIcon, LinkedinShareButton, LinkedinIcon, TwitterShareButton, TwitterIcon,
         EmailShareButton, EmailIcon } from 'react-share';
import { BrowserRouter as Router, Switch, Route, Link as RLink, useRouteMatch, useParams } from "react-router-dom";

import chunk from 'lodash.chunk'

const homeTitle = 'Everything You Need to Know to Be Great!';
const foodReviewsTitle = 'Delicious Food Reviews';
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
  menuItemLink: {
    color: 'black',
    textDecoration: 'none'
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
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
  iconHover: {
    '&:hover': {
      opacity: 0.75
    }
  },
  foodRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  foodGridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    backgroundColor: theme.palette.background.paper,
  },
  foodGridListTile: {
    marginBottom: '0.4em'
  },
  foodTitle: {
    color: 'white',
  },
  foodTitleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

const actions = [
  { icon: <ShareIcon />, name: 'Share' },
];

const Bold = ({ children }) => <span style={{ fontWeight: 'bold' }}>{children}</span>


function ShareButtons(props) {
  return (
    <Box display="flex" flexDirection="row" p={1} m={1} justifyContent="center">
      <FacebookShareButton url={window.location.href}>
        <FacebookIcon size={32} className={props.classes.iconHover} />
      </FacebookShareButton>
      <LinkedinShareButton url={window.location.href}>
        <LinkedinIcon size={32} className={props.classes.iconHover} />
      </LinkedinShareButton>
      <TwitterShareButton url={window.location.href}>
        <TwitterIcon size={32} className={props.classes.iconHover} />
      </TwitterShareButton>
      <EmailShareButton url={window.location.href} openWindow={true}>
        <EmailIcon size={32} className={props.classes.iconHover} />
      </EmailShareButton>
    </Box>
  )
}

function Home(props) {
  return (<div>
    <Typography paragraph>
      We have <RLink to='/food-reviews'>delicious food reviews</RLink> and <RLink to='/life-guide'>a great life guide</RLink> so far. More to come later!
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
    <ShareButtons classes={props.classes} />
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
      <li><Bold>Energize your body, passion, and mind.</Bold> Those are the raw energies that enable you to do everything at peak performance. Exercise regularly to build up energy in your body. Do what you love, enjoy everything that you do, and be your true self to let your passion flow freely and wildly. Always keep learning and thinking to push the boundary of your mind. Finally don't forget to rest well to rejuvenate. Keep your heart pumping fast and live passionately! <FavoriteIcon color='secondary' style={{position: 'relative', top: '0.2em', marginTop: '-0.3em'}} /></li>
      <li><Bold>Aim at your target.</Bold> There must be a target (e.g. task, goal, mission) at any time as it provides the direction for what you want to do so you don't wander around aimlessly. There can be many targets, but aim at only one for a period of time to make good progress, then your life is fruitful. Set a goal for each day (e.g., today's goal is to relax and have fun). As there are many targets, you should set at least one life goal -- the big things that you want to do with your life. Prioritize the targets based on important values to get the highest return on your time.</li>
      <li><Bold>Do the right thing in the right way.</Bold> That is the fastest way to get everything you want as doing the wrong thing requires redo and some things can not be undone. Sometimes it's tempting to do the wrong things for a quick / short-term gain, but there are always consequences. In the long run, doing the right thing wins as it builds momentum from previous accomplishments. The right things to do are meaningful. It is equally important to do things in the right way with everything that you got and don't let anything hold you back, so you get the most out of time. Always understand why you do something before how.</li>
    </ol>
    </Typography>
    <Typography paragraph>
      Easily remember the steps using the acronym <Bold>1 BEAD</Bold> from the first word/letter of each step. Each step must be done successfully in order so the next step is easier to do. It takes time to master each step, but the results are immediate and increasingly substantial. When things are not going as expected, take a timeout to rest and reflect using the steps. Mastery is achieved when all steps are followed consistently and naturally for everything that you do and are done using <Bold>100%</Bold> of your energies with at least 1% for being mindful always. And voilà, a great life!
    </Typography>
    <Typography paragraph>
      <span style={{ fontStyle: 'italic' }}>Note: This is v3.7 release of <Link color='inherit' href='https://github.com/maxzheng/great-life-guide' target="_blank">https://github.com/maxzheng/great-life-guide</Link> to allow for easy sharing, liking, or commenting</span>
    </Typography>
    <ShareButtons classes={props.classes} />
  </div>)
}

function Copyright() {
  return (
    <Typography paragraph color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://1bead.org/" target="_blank">
        1 BEAD
      </Link>
    </Typography>
  );
}

function FoodReviews(props) {
  const match = useRouteMatch();
  const medium = useMediaQuery(props.theme.breakpoints.up('md'))
  const large = useMediaQuery(props.theme.breakpoints.up('lg'))
  const cols = large ? 3 : (medium ? 2 : 1)

  const tileData = [
    {
      img: 'https://glebekitchen.com/wp-content/uploads/2017/04/tonkotsuramenfront.jpg',
      title: 'Ramen',
      author: 'Max',
    },
    {
      img: 'https://assets.epicurious.com/photos/5c93f15d7903444d883ded50/6:4/w_620%2Ch_413/Crisp-Roast-Duck-19032019.jpg',
      title: 'Roasted Duck',
      author: 'Ting',
    },
    {
      img: 'https://www.seriouseats.com/2019/08/20190809-burst-tomato-xo-pasta-vicky-wasik21-.jpg',
      title: 'Pasta',
      author: 'Kate',
    },
    {
      img: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Soft_tofu_2.jpg',
      title: 'Tofu',
      author: 'Jon',
    },
  ];

  return (
    <div className={props.classes.foodRoot}>
      {chunk(tileData, cols).map(subset => {
        return <GridList className={props.classes.foodGridList} cols={cols}>
          {subset.map(tile => (
            <GridListTile key={tile.img} className={props.classes.foodGridListTile} height={500}>
              <img src={tile.img} alt={tile.title} />
              <GridListTileBar
                title={tile.title}
                classes={{
                  root: props.classes.foodTitleBar,
                  title: props.classes.foodTitle,
                }}
                actionIcon={
                  <IconButton aria-label={`star ${tile.title}`}>
                    <StarBorderIcon className={props.classes.foodTitle} />
                    <StarBorderIcon className={props.classes.foodTitle} />
                    <StarBorderIcon className={props.classes.foodTitle} />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>}
      )}
      <ShareButtons classes={props.classes} />
    </div>
  )
}

function SpeedDials(props) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (<Box position='fixed' bottom='1em' right='1em'>
    <SpeedDial
      ariaLabel="SpeedDials"
      className={props.classes.speedDial}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {actions.map(action => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={handleClose}
        />
      ))}
    </SpeedDial></Box>
  );
}

function ResponsiveDrawer(props) {
  const classes = props.classes
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [title, setTitle] = React.useState(homeTitle);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menu = {
    '/': {
      name: 'Great FYI',
      icon: <HomeIcon />,
      title: homeTitle,
      divider: true
    },
    '/food-reviews': {
      name: 'Food Reviews',
      icon: <FastfoodIcon/>,
      title: foodReviewsTitle,
      divider: true
    },
    '/life-guide': {
      name: 'Life Guide',
      icon: <MenuBookIcon />,
      title: lifeGuideTitle,
      divider: false
    },
  }

  const menuItems = []
  for (const [path, {name, icon, title, divider}] of Object.entries(menu)) {
    menuItems.push(
      <div>
        <RLink to={path} className={classes.menuItemLink}>
          <ListItem button key={name} onClick={() => { setMobileOpen(false) }} >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        </RLink>
        { divider == true && <Divider /> }
      </div>
    )
  }

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
            <List>{menuItems}</List>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{ paper: classes.drawerPaper, }}
            variant="permanent"
            open
          >
            <List>{menuItems}</List>
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path='/food-reviews'>
            <FoodReviews classes={classes} theme={theme} />
          </Route>
          <Route path='/life-guide'>
            <LifeGuide classes={classes} />
          </Route>
          <Route path='/'>
            <Home classes={classes} />
          </Route>
        </Switch>
        <Route path='/:page?'>
          <TitleChanger setTitle={setTitle} menu={menu} />
        </Route>
        <Copyright />
      </main>
    </div>
  );
}

function TitleChanger(props) {
  let { page } = useParams();
  name = page ? '/' + page : '/'
  props.setTitle(props.menu[name].title)
  return null
}

function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.container}>
        <ResponsiveDrawer classes={classes}/>
      </div >
    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.querySelector('#root'),
);
