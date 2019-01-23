import GithubReports from '../components/githubReports';
import { connect } from 'react-redux';
import { fetchGithubReports } from '../actions/githubReports'



const mapStateToProps = ({ githubReports }) => {
    return {
      githubReports: githubReports
    }
  }

  const mapDispatchToProps = {
    fetchGithubReports: fetchGithubReports
  }

export default connect(mapStateToProps, mapDispatchToProps)(GithubReports)
