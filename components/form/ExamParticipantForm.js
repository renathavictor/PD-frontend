import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import QuestionsSteppers from '../QuestionsSteppers'
import QuestionContext from '../../context/questions/questionContext'
import api from '../../utils/api'

const ExamParticipantForm = ({ current }) => {
  const { query } = useRouter()
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    const load = async () => {
      current && await loadQuestion(current._id.$oid)
        .then(response => {
          setQuestions(response.data)
        })
    }
    load()
  }, [])

  const loadQuestion = async id => await api.get(`proofs/questoesPorProva/${id}`)

  return (
    <div>
      <QuestionsSteppers
        steps={questions}
      />
    </div>
  )
}

export default ExamParticipantForm
