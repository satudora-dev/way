import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProjectList from '../components/Project/ProjectList';
import { connect } from 'react-redux';
import {fetchProjectsIfNeeded} from '../actions/projects';


class ProjectListContainer extends React.Component {

  componentDidMount() {
    const { fetchProjectsIfNeeded } = this.props;
    fetchProjectsIfNeeded();
  }

  render() {
    const {projects, history} = this.props;
    if(projects) {
      return (
        <ProjectList projects={projects} history={history}/>
      )
    }else{
      return (
        <CircularProgress />
      );
    }
  }
}

const mapStateToProps = ({projects}) => {
  if(!projects.noData) {
    return {
      projects: projects,
    }
  }else{
    return {
      projects: null,
    }
  }
}

const mapDispatchToProps = {
  fetchProjectsIfNeeded: fetchProjectsIfNeeded,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectListContainer);
