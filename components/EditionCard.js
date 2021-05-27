import React from 'react';
import moment from 'moment'
import Link from 'next/link'
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    width: 250,
    margin: '2rem'
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
  description,
  id,
  ...props
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        // action={
        //   // TODO - apenas para admin
        //   <IconButton aria-label="settings" className={classes.button}>
        //     <DeleteOutlineIcon onClick={() => console.log('editar ou deletar')} />
        //   </IconButton>
        // }
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
          <Link href={`/edition/${id}`}><a>Acessar</a></Link>
        </IconButton>
      </CardActions>
    </Card>
  );
}
