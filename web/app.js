import React from 'react';
import ReactDOM from 'react-dom';

import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import CreateIcon from '@material-ui/icons/Create';
import CssBaseline from '@material-ui/core/CssBaseline';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
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
import Modal from '@material-ui/core/Modal';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Rating from '@material-ui/lab/Rating'
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
import { BrowserRouter as Router, Switch, Route, Link as RLink, useRouteMatch, useParams, Redirect, useHistory }
       from "react-router-dom";
import { createBrowserHistory } from 'history';
import FileUploader from "react-firebase-file-uploader";
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';

import chunk from 'lodash.chunk'
import uuidv4 from 'uuid/v4';

const homeTitle = 'Everything You Need to Know to Be Great!';
const foodReviewsTitle = 'Delicious Food';
const lifeGuideTitle = 'A Great Life Guide';

const foodImagesUrl = 'https://storage.googleapis.com/great-fyi/food-reviews/images/'
const drawerWidth = 210;

const useStyles = makeStyles(theme => ({
  app: {
    maxWidth: '100em',
    paddingLeft: '1em',
    paddingRight: '1em',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '2em',
      paddingRight: '0em',
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
  drawer: {
    display: 'flex',
  },
  drawerNav: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth - 30,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContent: {
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
  shareIconHover: {
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
    width: '100%'
  },
  foodGridListTile: {
    marginBottom: '0.4em',
  },
  foodTitle: {
    color: 'white',
  },
  foodTitleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  postButtons: {
    margin: '0em 1em',
    width: '90px'
  }
}));

const ratingLabels = {
    1: 'So so',
    2: 'Good',
    3: 'Great',
};
const db = firebase.firestore();

const Bold = ({ children }) => <span style={{ fontWeight: 'bold' }}>{children}</span>

function CircularProgressBlue(props) {
  const classes = makeStyles({
    root: {
      position: 'relative',
    },
    top: {
      color: '#eef3fd',
    },
    bottom: {
      color: '#6798e5',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
    },
  })();

  return (
    <div className={classes.root}>
      <CircularProgress
        variant="determinate"
        value={100}
        className={classes.top}
        size={24}
        thickness={4}
        {...props}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        className={classes.bottom}
        size={24}
        thickness={4}
        {...props}
      />
    </div>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if user has not yet authenticated.
function SecretRoute({ children, publicPath, ...rest }) {
  if (!rest.path) alert('SecretRoute requires "path" property')
  if (!publicPath) alert('SecretRoute requires "publicPath" property')

  return (
    <Route
      {...rest}
      render={({ location }) =>
        rest.user ? (
          children
        ) : (
          <Redirect to={'#login' + window.location.pathname + '|' + publicPath} />
        )
      }
    />
  );
}


function ShareButtons(props) {
  const direction = 'direction' in props ? props.direction : 'row'
  return (
    <Box display="flex" flexDirection={direction} padding='1px' bgcolor='inherit' justifyContent="center">
      <FacebookShareButton url={window.location.href}>
        <FacebookIcon size={32} className={props.classes.shareIconHover} />
      </FacebookShareButton>
      <LinkedinShareButton url={window.location.href}>
        <LinkedinIcon size={32} className={props.classes.shareIconHover} />
      </LinkedinShareButton>
      <TwitterShareButton url={window.location.href}>
        <TwitterIcon size={32} className={props.classes.shareIconHover} />
      </TwitterShareButton>
      <EmailShareButton url={window.location.href} openWindow={true}>
        <EmailIcon size={32} className={props.classes.shareIconHover} />
      </EmailShareButton>
    </Box>
  )
}

function Home(props) {
  return (<div>
    <Typography paragraph>
      We have <RLink to='/delicious-food'>delicious food</RLink> and <RLink to='/life-guide'>a great life guide</RLink> so far. More to come later!
    </Typography>
    {props.user && <span>Welcome, {props.user.displayName}</span>}

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
      <span style={{ fontStyle: 'italic' }}>Note: This is v3.7 release of <Link color='inherit' href='https://github.com/maxzheng/great-life-guide' target="_blank">great-life-guide</Link> to allow for easy sharing.</span>
    </Typography>
    <ShareButtons classes={props.classes} />
  </div>)
}

function Copyright() {
  return (
    <Typography paragraph color="textSecondary" align="center" style={{marginTop: '1em'}}>
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

  let [tileData, setTileData] = React.useState([])
  let [reloadData, setReloadData] = React.useState(true)

  if (reloadData) {
    window.scrollTo(0, 0)
    setReloadData(false)
    db.collection('foodReviews').orderBy('updatedAt', 'desc').limit(100).get().then(res => {
      let reviews = []
      res.forEach(doc => {
        reviews.push({...doc.data(), id: doc.id})
      })
      setTileData(reviews)
    })
  }

  return (
    <div className={props.classes.foodRoot}>
      {chunk(tileData, cols).map(subset => {
        return <GridList className={props.classes.foodGridList} cols={cols}>
          {subset.map(tile => (
            <GridListTile key={tile.imageUrl} className={props.classes.foodGridListTile} style={{height: '230px'}}
                          onClick={() => props.history.push('/delicious-food/' + tile.id)} >
              <img src={tile.imageUrl} alt={tile.name} />
              <GridListTileBar
                title={tile.name}
                classes={{
                  root: props.classes.foodTitleBar,
                  title: props.classes.foodTitle,
                }}
                actionIcon={
                  <Rating
                    name="rating"
                    value={tile.rating}
                    max={3}
                    size="large"
                    style={{marginRight: '0.5em'}}
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  />
                }
              />
            </GridListTile>
          ))}
        </GridList>}
      )}
      <SpeedDials classes={props.classes} user={props.user} />
      <SecretRoute path='/delicious-food/:id' publicPath='/delicious-food' user={props.user}>
        <PostFoodReview user={props.user} classes={props.classes} history={props.history} setReloadData={setReloadData}/>
      </SecretRoute>
    </div>
  )
}

function DeleteAction(props) {
  const [ask, setAsk] = React.useState(false)

  return (
    <div style={props.style}>
      <DeleteIcon onClick={() => setAsk(true)} style={{cursor: 'pointer'}} />
      <Dialog
        maxWidth="xs"
        aria-labelledby="confirmation-delete"
        open={ask} >
        <DialogTitle id="confirmation-delete">Delete Confirmation</DialogTitle>
        <DialogContent>
          Are you sure that you want to delete it?
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setAsk(false)}>
            Cancel
          </Button>
          <Button onClick={() => { setAsk(false); props.onConfirm() }} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

function PostFoodReview(props) {
  let { id } = useParams()
  let [imageUrl, setImageUrl] = React.useState(null)
  let [rating, setRating] = React.useState(2)
  let [uploadStarted, setUploadStarted] = React.useState(false)
  let [initialValues, setInitialValues] = React.useState({})

  const editing = id && id != 'post'

  if (editing && Object.keys(initialValues).length == 0) {
    setInitialValues({name: '', brand: '', location: '', details: '', tags: ''})  // Needed for field labels to resize
    db.collection('foodReviews').doc(id).get().then(doc => {
      if (doc.exists) {
        let data = doc.data()
        data.tags = data.tags ? data.tags.join(', ') : ''
        setInitialValues(data)
        setImageUrl(data.imageUrl)
        setRating(data.rating)
      }
    })
  }

  const handleSubmit = (values, { setSubmitting }) => {
    values.imageUrl = imageUrl
    values.rating = rating
    values.updatedAt = new Date()
    values.userId = props.user.uid
    values.userName = props.user.displayName.split(' ')[0]
    values.tags = typeof values.tags == 'string' && values.tags && values.tags.split(/, */) || []

    if (initialValues.userId != values.userId)
      id = 'post'

    if (id == 'post') {
      db.collection("foodReviews")
        .add(values)
        .then(docRef => {
          props.setReloadData(true)
          props.history.push('/delicious-food')
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
          setSubmitting(false);
        });
    } else {
      db.collection("foodReviews")
        .doc(id)
        .set(values)
        .then(docRef => {
          props.setReloadData(true)
          props.history.push('/delicious-food')
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
          setSubmitting(false);
        });
    }
  }

  const handleDelete = () => {
    db.collection("foodReviews")
      .doc(id)
      .delete()
    props.setReloadData(true)
    props.history.push('/delicious-food')
  }

  // CSS to rotate portrait: transform = rotate(90deg) translate(-50%) scale(1.5)
  return (
    <Dialog
      aria-labelledby="Post Review"
      aria-describedby="Post review of delicious food"
      open={true}
      scroll='body'
      onClose={() => props.history.push('/delicious-food') }
      PaperProps={{
            style: {
              margin: "1em",
              maxWidth: "100%"
            },
      }}
      >
        <Box id='post-box' width='349px' style={{outline: 'none'}} bgcolor='white' align='center' padding='1em'>
          <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                { props.user &&
                  <label style={{cursor: 'pointer', marginTop: '0.5em'}}>
                    <Box id='photo-box' display='flex' width='100%' height='215px' style={{outline: 'none'}} bgcolor='gray'
                         border='1px solid gray' alignItems='center' justifyContent='center'>
                      { imageUrl && <img src={imageUrl} height='100%' alt='Uploaded image' /> }
                      { !imageUrl && (uploadStarted ? <CircularProgressBlue /> : <PhotoCameraIcon />) }
                      <FileUploader
                        accept="image/*"
                        name="image"
                        hidden
                        maxHeight={512}
                        maxWidth={768}
                        randomizeFilename
                        storageRef={firebase.storage().ref('food-reviews/images/' + props.user.uid)}
                        onUploadStart={() => { setUploadStarted(true); setImageUrl(null) } }
                        onUploadSuccess={filename => {
                          setImageUrl(foodImagesUrl + props.user.uid + '/' + filename)
                          setUploadStarted(false)
                        }}
                      />
                    </Box>
                  </label>
                }
                <Box display='flex' marginTop='1em' justifyContent='center'>
                  <Rating
                    name="rating"
                    value={rating}
                    max={3}
                    size="large"
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                    onClick={(e) => e.preventDefault() }
                    onChangeActive={(event, newRating) => {
                      if (newRating >= 1) setRating(newRating);
                    }}
                  />
                </Box>
                <Field component={TextField} name="name" label='Name' fullWidth required />
                <Field component={TextField} name="brand" label='Restaurant, store, or brand' fullWidth required />
                <Field component={TextField} name="location" label='City and state, or website' fullWidth required />
                <Field component={TextField} name="details" label="How is it delicious?" multiline fullWidth
                       rowsMax={3} />
                <Field component={TextField} name="tags" label="Tags for filtering (comma separated)" fullWidth />
                <br />
                <br />
                { editing && initialValues.userId == props.user.uid &&
                  <DeleteAction onConfirm={handleDelete} style={{float: 'left', marginTop: '0.3em'}} /> }
                <Button variant="contained" className={props.classes.postButtons}
                        onClick={() => props.history.push('/delicious-food') }>
                Cancel
                </Button>
                <Button type='submit' variant="contained" color="primary" className={props.classes.postButtons}
                        disabled={isSubmitting} >
                Post
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
    </Dialog>
  )
}

function SpeedDials(props) {
  const [open, setOpen] = React.useState(false);
  const [shareOpen, setShareOpen] = React.useState(false);

  const actions = [
    { icon: <ShareIcon />, name: 'Share', onClick: () => { setOpen(false); setShareOpen(true) } },
    { icon: <RLink to='/delicious-food/post' style={{ color: 'inherit', textDecoration: 'inherit'}}>
            <CreateIcon style={{marginTop: '0.2em'}}/></RLink>, name: 'Post' },
  ];

  return (
    <Box position='fixed' bottom='0em' right='0em'>
      <Modal
        aria-labelledby="Share page"
        aria-describedby="Share page on Facebook, LinkedIn, etc"
        open={shareOpen}
        onClose={ () => { setShareOpen(false) }} >
          <Box position='absolute' bottom='100px' right='26px' style={{outline: 'none'}} bgcolor="background.paper"
               onClick={() => { setOpen(false); setShareOpen(false) }} >
            <ShareButtons classes={props.classes} direction='column-reverse' />
          </Box>
      </Modal>
      <SpeedDial
        ariaLabel="Actions"
        className={props.classes.speedDial}
        icon={<SpeedDialIcon />}
        onClose={() => { setOpen(false) }}
        onOpen={() => { setOpen(true) }}
        open={open}
      >
        {actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
    </Box>
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
    '/delicious-food': {
      name: 'Delicious Food',
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
    <div className={classes.drawer}>
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
      <nav className={classes.drawerNav} aria-label="mailbox folders">
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
      <main className={classes.drawerContent}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path='/delicious-food'>
            <FoodReviews classes={classes} theme={theme} user={props.user} history={props.history}/>
          </Route>
          <Route path='/life-guide'>
            <LifeGuide classes={classes} />
          </Route>
          <Route path='/'>
            <Home classes={classes} user={props.user}/>
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
  const { page } = useParams();
  const name = page ? '/' + page : '/'
  const title = props.menu[name].title
  document.title = title
  props.setTitle(title)
  return null
}

function LoginBox(props) {
  // Not at login page
  if (!props.login)
    return null

  // Logged in already, so just need to redirect back to secret route.
  const [successPath, failedPath] = window.location.hash.substring(7).split('|')
  if (props.user) {
    return <Redirect to={successPath} />
  }

  // Not logged in
  React.useEffect(() => {
    setTimeout(() => {
      addFirebaseAuthUI("login-box")
    })
  })

  return (
    <Modal
        aria-labelledby="Login Box"
        aria-describedby="Login using Google, Facebook, Email, etc."
        open={true}
        onClose={() => props.history.push(failedPath) }
        style={{display:'flex', alignItems: 'center', justifyContent: 'center'}} >
          <Box width='270px' style={{outline: 'none'}} justifyContent='center'>
            <Typography variant='h6' color='textPrimary' align='center'>
              Please login to continue
            </Typography>
            <Typography variant='body2' color='textSecondary' align='center'>
              (or click any where to go back)
            </Typography>
            <Box id='login-box'/>
          </Box>
    </Modal>
  )
}

function App() {
  const classes = useStyles()
  let history = useHistory()

  let [user, setUser] = React.useState(null)
  let [login, setLogin] = React.useState(window.location.hash && window.location.hash.startsWith('#login'))

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }
  }, function(error) {
    console.log(error)
  })

  history.listen((location, action) => {
      if (location.hash && location.hash.startsWith('#login')) {
        setLogin(true)
      } else {
        setLogin(false)
      }
  });

  return (
    <div className={classes.app}>
      <LoginBox user={user} login={login} setLogin={setLogin} history={history} />
      { !login && <ResponsiveDrawer classes={classes} user={user} setLogin={setLogin} history={history} /> }
    </div >
  );
}

ReactDOM.render(
  <Router><App /></Router>,
  document.querySelector('#root'),
);
