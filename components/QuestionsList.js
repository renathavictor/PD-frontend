import React, { useEffect, useState, useContext } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import QuestionContext from '../context/questions/questionContext'
import api from '../utils/api'
import { CircularProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '35vw',
    margin: '4rem 3rem'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

const QuestionsList = ({ query, currentExamId, questionsId }) => {
  const classes = useStyles()
  const questionContext = useContext(QuestionContext)

  const { getQuestions, addQuestion, current } = questionContext
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const loadQuestions = async () => {
      questionsId && await questionsId.map(id => {
        loadData(id.$oid)
          .then(response => {
            setQuestions(prevState => {
              return prevState ? [...prevState, response.data] : [response.data]
            })
          })
          .catch(err => console.error(err))
      })
      setLoading(false)
    }
    loadQuestions()
  }, [])

  useEffect(() => {
    current && setQuestions(prevState => [...prevState, current])
  }, [current])

  // useEffect(() => {
  //   getQuestions()
  // }, [])

  const loadData = async id => await api.get(`questions/${id}`)
  if (loading) return <CircularProgress />

  return (
    <div className={classes.root}>
      {questions && questions.length > 0 && questions.map(question => (<>
      <Accordion key={question?._id.$oid}>
          <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{question.title}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ display: 'flex', flexFlow: 'column' }}>
          <ol style={{ fontSize: '14px', listStyle: 'upper-alpha' }}>
            <li>{question.answer1}</li>
            <li>{question.answer2}</li>
            <li>{question.answer3}</li>
            <li>{question.answer4}</li>
            <li>{question.answer5}</li>
          </ol>
          <span>Resposta certa: {question.right_answer}</span>
        </AccordionDetails>
      </Accordion>
        </>))}
    </div>
  )
}

export default QuestionsList
