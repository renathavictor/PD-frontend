import React, { useEffect, useContext } from 'react'

import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { CircularProgress } from '@material-ui/core'

import ExamContext from '../../../../context/exams/examContext'
import AuthContext from '../../../../context/auth/authContext'
import EditionContext from '../../../../context/editions/editionContext'
import QuestionContext from '../../../../context/questions/questionContext'

import ExamForm from '../../../../components/form/ExamForm'
import QuestionForm from '../../../../components/form/QuestionForm'
import QuestionsList from '../../../../components/QuestionsList'
import ExamParticipantForm from '../../../../components/form/ExamParticipantForm'
import { PARTICIPANT_PROFILE_ID } from '../../../../utils/constants'


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

const ExamPage = ({ query }) => {
  const authContext = useContext(AuthContext) || {}
  const examContext = useContext(ExamContext)
  const questionContext = useContext(QuestionContext)
  const editionContext = useContext(EditionContext)

  const [value, setValue] = React.useState(0);

  const { getExam, loading, current, error, clearCurrent } = examContext
  const { user, isAuthenticated } = authContext

  if (loading && !current) return <CircularProgress />

  useEffect(() => {
    const getCurrent = async () => {
      await getExam(query.slug)
    }
    getCurrent()
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  if (loading) return <CircularProgress />

  if (!current) return <p>Não encontrado</p>

  return user?.user?.profile_id?.$oid !== PARTICIPANT_PROFILE_ID ? (
    <p>
    <h1>{ editionContext.current?.title }</h1>
    <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Prova" />
        {/* <Tab label="Disabled" disabled /> */}
        <Tab label="Questões" />
      </Tabs>
      <TabPanel value={value} index={0} style={{ paddingBottom: '2rem' }}>
        <ExamForm
          addExam={examContext.addExam}
          current={examContext.current}
          updateExam={examContext.updateExam}
          error={examContext.logerror}
          clearCurrent={examContext.clearCurrent}
          editionId={query.id}
          handleChange={handleChange}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <span style={{ display: 'flex', flexFlow: 'row' }}>
          <QuestionForm
            clearCurrent={questionContext.clearCurrent}
            query={query}
            currentExamId={examContext.current._id.$oid}
            addQuestion={questionContext.addQuestion}
            error={questionContext.error}
          />
          {examContext.current && <QuestionsList
            query={query}
            currentExamId={examContext.current._id.$oid}
            questionsId={examContext.current.question_ids}
          />}
        </span>
      </TabPanel>
    </Paper>
  </p>
  ) : (
    <Paper square>
      <ExamParticipantForm
        current={current}
      />
    </Paper>
  )
}

export default ExamPage
