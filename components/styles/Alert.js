import styled from 'styled-components'

export const Alert = styled.div`
  margin: auto;
  .alert {
    padding: 0.7rem;
    margin: 1rem 0;
    opacity: 0.9;
    background: ${props => props.theme.offWhite};
    color: #333;
  }

  .alert-primary {
    background: ${props => props.theme.primary};
    color: #fff;
  }

  .alert-light {
    background: ${props => props.theme.offWhite};
    color: #333;
  }

  .alert-dark {
    background: ${props => props.theme.black};
    color: #fff;
  }

  .alert-danger {
    background: ${props => props.theme.danger};
    color: #fff;
  }

  .alert-success {
    background: ${props => props.theme.success};
    color: #fff;
  }

  .alert-white {
    background: #fff;
    color: #333;
    border: #ccc solid 1px;
  }

`
