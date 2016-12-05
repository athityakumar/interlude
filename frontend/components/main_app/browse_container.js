import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import Browse from './browse';

const mapStateToProps = ( state ) => {
  return {
    session: state.session,
  };
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Browse);