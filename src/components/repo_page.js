import React from 'react'
import { ResponsiveContainer, AreaChart, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Area, Bar } from 'recharts'
import Grid from '@material-ui/core/Grid'


const data1 = [
  {name: 'Mon', Active: 400, Merged: 180, Closed: 130},
  {name: 'Tue', Active: 300, Merged: 90, Closed: 320},
  {name: 'Wed', Active: 200, Merged: 10, Closed: 130},
  {name: 'Thu', Active: 270, Merged: 190, Closed: 340},
  {name: 'Fri', Active: 180, Merged: 180, Closed: 130},
  {name: 'Sat', Active: 230, Merged: 890, Closed: 30},
  {name: 'Sun', Active: 340, Merged: 190, Closed: 230},
]
const data2 = [
  {name: 'Mon', Active: 270, Merged: 190, Closed: 340},
  {name: 'Tue', Active: 300, Merged: 90, Closed: 320},
  {name: 'Wed', Active: 400, Merged: 180, Closed: 130},
  {name: 'Thu', Active: 230, Merged: 890, Closed: 30},
  {name: 'Fri', Active: 180, Merged: 180, Closed: 130},
  {name: 'Sat', Active: 200, Merged: 10, Closed: 130},
  {name: 'Sun', Active: 230, Merged: 89, Closed: 30},
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
                <BarChart data={data1}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
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
                    <p style={{fontSize: '12px'}}><a href='https://github.com/satudora-digital/way/issues/87' target='_blank'>Issue #87</a></p>
                    <p style={{fontSize: '12px'}}><a href='https://github.com/satudora-digital/way/issues/79' target='_blank'>Issue #79</a></p>
                    <p style={{fontSize: '12px'}}><a href='https://github.com/satudora-digital/way/issues/76' target='_blank'>Issue #76</a></p>
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
                    <p style={{fontSize: '12px'}}><a href='https://github.com/satudora-digital/way/issues/87' target='_blank'>Issue #87</a></p>
                    <p style={{fontSize: '12px'}}><a href='https://github.com/satudora-digital/way/issues/79' target='_blank'>Issue #79</a></p>
                    <p style={{fontSize: '12px'}}><a href='https://github.com/satudora-digital/way/issues/76' target='_blank'>Issue #76</a></p>
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
                <AreaChart data={data2}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="Active" fill="#94FC9F" stroke="#94FC9F" stackId="a"/>
                  <Area type="monotone" dataKey="Merged" fill="#EBFC94" stroke="#EBFC94" stackId="a"/>
                  <Area type="monotone" dataKey="Closed" fill="#FCCE94" stroke="#FCCE94" stackId="a"/>
                </AreaChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={3}>
              <p>CLOSED</p>
                <Grid container>
                  <Grid item xs={6}>
                    <p style={{fontSize: '12px'}}><a href='https://github.com/satudora-digital/way/issues/87' target='_blank'>Issue #87</a></p>
                    <p style={{fontSize: '12px'}}><a href='https://github.com/satudora-digital/way/issues/79' target='_blank'>Issue #79</a></p>
                    <p style={{fontSize: '12px'}}><a href='https://github.com/satudora-digital/way/issues/76' target='_blank'>Issue #76</a></p>
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
                    <p style={{fontSize: '12px'}}><a href='https://github.com/satudora-digital/way/issues/87' target='_blank'>Issue #87</a></p>
                    <p style={{fontSize: '12px'}}><a href='https://github.com/satudora-digital/way/issues/79' target='_blank'>Issue #79</a></p>
                    <p style={{fontSize: '12px'}}><a href='https://github.com/satudora-digital/way/issues/76' target='_blank'>Issue #76</a></p>
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
