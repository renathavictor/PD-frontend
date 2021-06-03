import React, { useEffect, useContext } from 'react';
import Router, { useRouter }  from 'next/router'

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { Grid } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Modal from '@material-ui/core/Modal';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import api from '../utils/api';
import AlertContext from '../context/alert/alertContext'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '2rem'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    display: 'flex',
    flexFlow: 'column',
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function QuestionsSteppers({ steps, userRegisterId }) {
  const classes = useStyles();
  const theme = useTheme();
  const { query } = useRouter()
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = steps?.length;
  const [values, setValues] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const alertContext = useContext(AlertContext)
  const { setAlert } = alertContext

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setValues(prevState => {
      Object.keys(prevState).forEach(key => {
        return { ...prevState, [`${key}`]: event.target.value }
      })
      return { ...prevState, [`${steps[activeStep]?._id.$oid}`]: event.target.value }
    })
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const sendAnswer = async () => {
    Object.keys(values).forEach(key => {
      values[key] = values[key].replace(/\[(.*)/g, '')
    })
    await api.post(`/registries/salvaQuestoes/${userRegisterId}`, { ...values })
      .then(response => {
        handleClose()
        setAlert('Prova finalizada!', 'success')
        Router.push('/')
      })
      .catch(err => {
        console.error(err)
        setAlert(`Erro ao finalizar a prova: ${err.error}`, 'danger')
      })
  }


  const transformInValues = value => {
    const removeIndex = value.replace(/\[(.*)/g, '')
    const responseNumber = removeIndex.replace('answer', '')
    return responseNumber
  }

  return (
    <div className={classes.root}>
      <Paper square elevation={0} className={classes.header}>
        <Typography>Questão {activeStep + 1}</Typography>
      </Paper>
      <Grid container spacing={3} className={classes.content}>
        <Grid item xs={6}>
          <h2>{activeStep + 1} {steps[activeStep]?.title}</h2>
        </Grid>
        <Grid item xs={6}>
          <h3>Alternativas</h3>
          <FormControl component="fieldset">
          <RadioGroup aria-label="answer" name={`answer[${activeStep}]`} value={`${values[steps[activeStep]?._id.$oid]}`} onChange={handleChange}>
            <FormControlLabel value={`answer1[${activeStep}]`} control={<Radio />} label={steps[activeStep]?.answer1} />
            <FormControlLabel value={`answer2[${activeStep}]`} control={<Radio />} label={steps[activeStep]?.answer2} />
            <FormControlLabel value={`answer3[${activeStep}]`} control={<Radio />} label={steps[activeStep]?.answer3} />
            <FormControlLabel value={`answer4[${activeStep}]`} control={<Radio />} label={steps[activeStep]?.answer4} />
            <FormControlLabel value={`answer5[${activeStep}]`} control={<Radio />} label={steps[activeStep]?.answer5} />
          </RadioGroup>
        </FormControl>
        </Grid>
      </Grid>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={activeStep === maxSteps - 1 ? (
          <Button size='small' onClick={handleOpen}>
              Finalizar Prova
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
        ) : (
            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          )
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
        {steps ? steps.map((step, index) => (
          <Chip
          key={step._id.$oid}
          avatar={<Avatar>{index+1}</Avatar>}
          label={values.hasOwnProperty(step._id.$oid) ? transformInValues(values[step._id.$oid]) : 'Não respondida'}
          variant="outlined"
          style={{ justifyContent: 'flex-start' }}
          />
          )) : ''}
          <Button size='medium' onClick={() => sendAnswer()}>
            Finalizar
          </Button>
        </div>
      </Modal>
    </div>
  );
}
