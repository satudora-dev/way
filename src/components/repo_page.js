import React from 'react'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'


const data = [
  {name: 'Monday', Active: 400, Merged: 180, Closed: 130},
  {name: 'Tuesday', Active: 300, Merged: 90, Closed: 320},
  {name: 'Wednesday', Active: 200, Merged: 10, Closed: 130},
  {name: 'Thursday', Active: 270, Merged: 190, Closed: 340},
  {name: 'Friday', Active: 180, Merged: 180, Closed: 130},
  {name: 'Saturday', Active: 230, Merged: 890, Closed: 30},
  {name: 'Sunday', Active: 340, Merged: 190, Closed: 230},
]


class RepoPage extends React.Component {

  render () {
    return (
      <div>
        <div>
          <Grid container>
            <Grid item xs={2}>
              <p style={{
                marginTop: '100px',
                fontWeight: 'bold'
              }}>
                Satoshi Yoshio
              </p>
            </Grid>
            <Grid item xs={4}>
              <ResponsiveContainer height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  {/* <XAxis dataKey="name" /> */}
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Active" fill="#94FC9F" stackId="a"/>
                  <Bar dataKey="Merged" fill="#EBFC94" stackId="a"/>
                  <Bar dataKey="Closed" fill="#FCCE94" stackId="a"/>
                </BarChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={3}>
              <p>CLOSED</p>
                <Grid container>
                  <Grid item xs={6}>
                    <p style={{fontSize: '12px'}}><a href=''>Issue #87</a></p>
                    <p style={{fontSize: '12px'}}><a href=''>Issue #79</a></p>
                    <p style={{fontSize: '12px'}}><a href=''>Issue #76</a></p>
                  </Grid>
                  <Grid item xs={6}>
                    <p style={{
                      fontSize: '12px',
                      background: '#94E8FC'
                    }}>enhancement</p>
                    <p style={{
                      fontSize: '12px',
                      background: '#FCCC94'
                    }}>improve</p>
                    <p style={{
                      fontSize: '12px',
                      background: '#F94B46'
                    }}>bug</p>
                  </Grid>
                </Grid>
            </Grid>
            <Grid item xs={3}>
              <p>OPEN</p>
                <Grid container>
                  <Grid item xs={6}>
                    <p style={{fontSize: '12px'}}><a href=''>Issue #87</a></p>
                    <p style={{fontSize: '12px'}}><a href=''>Issue #79</a></p>
                    <p style={{fontSize: '12px'}}><a href=''>Issue #76</a></p>
                  </Grid>
                  <Grid item xs={6}>
                    <p style={{
                      fontSize: '12px',
                      background: '#FCCC94'
                    }}>improve</p>
                    <p style={{
                      fontSize: '12px',
                      background: '#F94B46'
                    }}>bug</p>
                    <p style={{
                      fontSize: '12px',
                      background: '#94E8FC'
                    }}>enhancement</p>
                  </Grid>
                </Grid>
            </Grid>
          </Grid>
        </div>



        <div>
          <Grid container>
            <Grid item xs={2}>
              <p style={{
                marginTop: '100px',
                fontWeight: 'bold'
              }}>
                Tomohiko Hasegawa
              </p>
            </Grid>
            <Grid item xs={4}>
              <ResponsiveContainer height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  {/* <XAxis dataKey="name" /> */}
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Active" fill="#94FC9F" stackId="a"/>
                  <Bar dataKey="Merged" fill="#EBFC94" stackId="a"/>
                  <Bar dataKey="Closed" fill="#FCCE94" stackId="a"/>
                </BarChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={3}>
              <p>CLOSED</p>
                <Grid container>
                  <Grid item xs={6}>
                    <p style={{fontSize: '12px'}}><a href=''>Issue #87</a></p>
                    <p style={{fontSize: '12px'}}><a href=''>Issue #79</a></p>
                    <p style={{fontSize: '12px'}}><a href=''>Issue #76</a></p>
                  </Grid>
                  <Grid item xs={6}>
                    <p style={{
                      fontSize: '12px',
                      background: '#94E8FC'
                    }}>enhancement</p>
                    <p style={{
                      fontSize: '12px',
                      background: '#FCCC94'
                    }}>improve</p>
                    <p style={{
                      fontSize: '12px',
                      background: '#F94B46'
                    }}>bug</p>
                  </Grid>
                </Grid>
            </Grid>
            <Grid item xs={3}>
              <p>OPEN</p>
                <Grid container>
                  <Grid item xs={6}>
                    <p style={{fontSize: '12px'}}><a href=''>Issue #87</a></p>
                    <p style={{fontSize: '12px'}}><a href=''>Issue #79</a></p>
                    <p style={{fontSize: '12px'}}><a href=''>Issue #76</a></p>
                  </Grid>
                  <Grid item xs={6}>
                    <p style={{
                      fontSize: '12px',
                      background: '#FCCC94'
                    }}>improve</p>
                    <p style={{
                      fontSize: '12px',
                      background: '#F94B46'
                    }}>bug</p>
                    <p style={{
                      fontSize: '12px',
                      background: '#94E8FC'
                    }}>enhancement</p>
                  </Grid>
                </Grid>
            </Grid>
          </Grid>
        </div>
      </div>

    )
  }
}

export default RepoPage
