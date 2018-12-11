import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


const ProjectList = ({ projects, history }) => {

  const toProject = id => {
    history.push(`/projects/${id}`);
  }

  const style = {
    cardWrapper: {
      width: "90%",
      margin: "0 auto",
    },
    cardButton: {
      padding: "20px 0 20px 0",
      width: "100%",
      height: "100%"
    }
  };

  return (
    <div className="Projects">
      <h2>プロジェクト一覧</h2>
      <Grid container spacing={24} style={style.cardWrapper}>
        {(()=>{
          if(projects) {
            return (Object.keys(projects).map((key, i) => {
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <Button key={i}
                          onClick={() => toProject(key)}
                          style={style.cardButton}
                          variant="outlined">
                    { projects[key].name }
                  </Button>
                </Grid>
              );
            }));
          }
        })()}
      </Grid>
    </div>
  );
}


export default ProjectList;
