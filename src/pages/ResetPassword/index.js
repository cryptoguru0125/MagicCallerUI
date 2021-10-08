import { connect } from 'react-redux';

import { getSpinner } from 'store/app/reducer';
import ResetPasswordPage from './ResetPasswordPage';

const mapStateToProps = state => ({
  loading: getSpinner(state, 'CHECK_TOKEN'),
  search: state.router.location.search,
});

export default connect(mapStateToProps)(ResetPasswordPage);
