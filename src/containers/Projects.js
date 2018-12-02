import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Projects from '../components/Project/Projects';
import { connect } from 'react-redux';
import {fetchProjectsIfNeeded} from '../actions/projects';


class ProjectsContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { fetchProjectsIfNeeded } = this.props;
    fetchProjectsIfNeeded();
  }

  render() {
    const {projects, history} = this.props;
    if(projects) {
      return (
        <Projects projects={projects} history={history}/>
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
)(ProjectsContainer);

