import React, { useContext } from 'react'

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import CreateExamForm from '../../../components/CreateExamForm'
import CreateQuestionForm from '../../../components/CreateQuestionForm'
import ExamContext from '../../../context/exams/examContext'
import QuestionContext from '../../../context/questions/questionContext'

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

const createExam = ({ query }) => {
  const examContext = useContext(ExamContext)
  const questionContext = useContext(QuestionContext)

  // const { addExam, current, error, clearCurrent } = examContext
  // const { addQuestion, clearCurrent, error } = questionContext

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {

    console.log('--------------------- ', newValue)
    setValue(newValue);
  };

  React.useEffect(() => {
    console.log(examContext.current)
  }, [])

  return (
    <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Criar Prova" />
        {/* <Tab label="Disabled" disabled /> */}
        <Tab label="Adicionar Questão" />
      </Tabs>
      <TabPanel value={value} index={0} style={{ paddingBottom: '2rem' }}>
        <CreateExamForm
            addExam={examContext.addExam}
            current={examContext.current}
            error={examContext.logerror}
            clearCurrent={examContext.clearCurrent}
            editionId={query.id}
            handleChange={handleChange}
          />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CreateQuestionForm
          clearCurrent={questionContext.clearCurrent}
          addQuestion={questionContext.addQuestion}
          error={questionContext.error}
        />
      </TabPanel>
    </Paper>
  )
}

export default createExam
