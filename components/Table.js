import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress'
import api from '../utils/api'

const useStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: '1px solid #F1F3F4'
    }
  }
})

function Row (props) {
  const {
    id,
    row,
    getChildren,
    childs,
    fetchData,
    hasChild,
    childTitle,
    deleteItem,
    childrenIsFetching,
    expandedId,
    setExpandedId
  } = props
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [user, setUser] = useState({})

  useEffect(() => {
    const loadData = async () => {
      await api.get(`${fetchData}/${row.user_id.$oid}`)
        .then(response => {
          setUser(response.data)
        })
        .catch(err => console.error(err))
    }
    loadData()
  }, [row])
  const handleClickOpenMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleSetOpen = id => {
    getChildren({ id: id })
    setExpandedId(expandedId === id ? -1 : id)
  }

  const deleteRow = id => {
    deleteItem(id)
  }
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          {hasChild && (
            <IconButton
              aria-label='expand row'
              size='small'
              onClick={() => handleSetOpen(id)}
              aria-expanded={expandedId === id}
            >
              {expandedId === id ? (
                <KeyboardArrowUpIcon />
              ) : (
                <KeyboardArrowDownIcon />
              )}
            </IconButton>
          )}
        </TableCell>
        <TableCell component='th' scope='row'>
          {id}
        </TableCell>
        <TableCell align='left'>{row.city}</TableCell>
        <TableCell align='left'>{row.state}</TableCell>
        <TableCell align='left'>{row.school}</TableCell>
        <TableCell align='left'>{user?.name}</TableCell>
        {/* <TableCell align='left'>
          <MoreVertIcon
            aria-controls='simple-menu'
            aria-haspopup='true'
            onClick={handleClickOpenMenu}
          />
        </TableCell> */}
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleCloseMenu}>Visualizar</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Editar</MenuItem>
        </Menu>
      </TableRow>
      <TableRow className={classes.root}>
        <TableCell
          style={{ padding: 0, background: 'rgba(241, 243, 244, 0.7)' }}
          colSpan={6}
        >
          <Collapse in={expandedId === id} timeout='auto' unmountOnExit>
            <Box>
              <Table size='small' aria-label='childs'>
                <colgroup>
                  <col style={{ width: '5%' }} />
                  <col style={{ width: '5%' }} />
                  <col style={{ width: '83%' }} />
                  <col style={{ width: '10%' }} />
                </colgroup>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>
                      <strong>{childTitle && childTitle}</strong>
                    </TableCell>
                    <TableCell />
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {childrenIsFetching && <CircularProgress color='secondary' />}
                  {childs &&
                    childs.length > 0 &&
                    childs.map(row => (
                      <TableRow key={row.id} className={classes.root}>
                        <TableCell />
                        <TableCell component='th' scope='row'>
                          {row.id}
                        </TableCell>
                        <TableCell>{row.attributes.title}</TableCell>
                        <TableCell align='left'>
                          <MoreVertIcon
                            aria-controls='simple-menu'
                            aria-haspopup='true'
                            onClick={handleClickOpenMenu}
                          />
                        </TableCell>
                        <Menu
                          id='simple-menu'
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleCloseMenu}
                        >
                          <MenuItem onClick={handleCloseMenu}>
                            Visualizar
                          </MenuItem>
                          <MenuItem onClick={handleCloseMenu}>Editar</MenuItem>
                          <MenuItem onClick={handleCloseMenu}>Deletar</MenuItem>
                        </Menu>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export default function DataTable ({
  data,
  getChildren,
  childs,
  childrenIsFetching,
  itemsIsFetching,
  request,
  ...props
}) {
  const classes = useStyles()
  const [expandedId, setExpandedId] = React.useState(-1)
  console.table(data)
  return (
    <>
      <TableContainer>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">
                <strong>ID Registro</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Cidade</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Estado</strong>
              </TableCell>
              <TableCell align="left">
                <strong>Escola</strong>
              </TableCell>
              <TableCell align='left'>
                <strong>Usuário</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          {itemsIsFetching ? (
            <CircularProgress color='secondary' />
          ) : (
            <TableBody>
              {data && data.map(row => (
                  <Row
                    key={row._id.$oid}
                    id={row._id.$oid}
                    row={row}
                    fetchData={request}
                    expandedId={expandedId}
                    setExpandedId={setExpandedId}
                    {...props}
                  />
                ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  )
}
