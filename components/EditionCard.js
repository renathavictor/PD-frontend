import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    width: 250,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {
    '&.MuiButtonBase-root': {
      background: 'none',
      border: 'none',
      color: theme.palette.primary.main,
      '&:hover': {
        background: 'none',
        border: 'none',
        color: theme.palette.primary.light,
      }
    }
  }
}));

export default function EditionCard({
  startDate,
  title,
  description
}) {
  const classes = useStyles();
  console.log(startDate)
  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          // TODO - apenas para admin
          <IconButton aria-label="settings" className={classes.button}>
            <MoreVertIcon />
          </IconButton>
        }
        title={title}
      />
      <CardMedia
        className={classes.media}
        image="/assets/default-img.png"
        title="Logo edição"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {/* {moment.utc(startDate).format()} */}
          {moment(startDate).format('DD/MM/YYYY')}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* TODO
          deixar apenas para o participante
          Um ou outro de acordo com o status
        */}
        { /* <IconButton aria-label="inscriptions" className={classes.button}>
          Inscrever-se
        </IconButton> */}
        <IconButton aria-label="acess" className={classes.button}>
          Acessar
        </IconButton>
      </CardActions>
    </Card>
  );
}
