import React, { useContext, useEffect } from 'react'

import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import ExamForm from '../../../../components/form/ExamForm'
import QuestionForm from '../../../../components/form/QuestionForm'
import ExamContext from '../../../../context/exams/examContext'
import EditionContext from '../../../../context/editions/editionContext'
import QuestionContext from '../../../../context/questions/questionContext'
import QuestionsList from '../../../../components/QuestionsList'

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

const Exam = ({ query }) => {
  const examContext = useContext(ExamContext)
  const questionContext = useContext(QuestionContext)
  const editionContext = useContext(EditionContext)

  useEffect(() => {
    examContext.clearCurrent()
  }, [])

  // const { addExam, current, error, clearCurrent, updateExam } = examContext
  // const { addQuestion, clearCurrent, error } = questionContext

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (<>
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
          // current={examContext.current}
          // updateExam={examContext.updateExam}
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
          currentExamId={examContext.current?._id.$oid}
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
  </>)
}

export default Exam
