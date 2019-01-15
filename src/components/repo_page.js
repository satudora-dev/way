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


const iconUrl = 'https://github.com/yasunari89.png'
const name = "Yasunari Ota"

const Mon = {
  closedIssueCnt: Math.floor(Math.random() * 31),
  closedIssueUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  commitCnt: Math.floor(Math.random() * 31),
  commitUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  openIssueCnt: Math.floor(Math.random() * 31),
  openIssueUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  prCnt: Math.floor(Math.random() * 31),
  prUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ]
}
const Tue = {
  closedIssueCnt: Math.floor(Math.random() * 31),
  closedIssueUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  commitCnt: Math.floor(Math.random() * 31),
  commitUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  openIssueCnt: Math.floor(Math.random() * 31),
  openIssueUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  prCnt: Math.floor(Math.random() * 31),
  prUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ]
}
const Wed = {
  closedIssueCnt: Math.floor(Math.random() * 31),
  closedIssueUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  commitCnt: Math.floor(Math.random() * 31),
  commitUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  openIssueCnt: Math.floor(Math.random() * 31),
  openIssueUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  prCnt: Math.floor(Math.random() * 31),
  prUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ]
}
const Thu = {
  closedIssueCnt: Math.floor(Math.random() * 31),
  closedIssueUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  commitCnt: Math.floor(Math.random() * 31),
  commitUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  openIssueCnt: Math.floor(Math.random() * 31),
  openIssueUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  prCnt: Math.floor(Math.random() * 31),
  prUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ]
}
const Fri = {
  closedIssueCnt: Math.floor(Math.random() * 31),
  closedIssueUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  commitCnt: Math.floor(Math.random() * 31),
  commitUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  openIssueCnt: Math.floor(Math.random() * 31),
  openIssueUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  prCnt: Math.floor(Math.random() * 31),
  prUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ]
}
const Sat = {
  closedIssueCnt: Math.floor(Math.random() * 31),
  closedIssueUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  commitCnt: Math.floor(Math.random() * 31),
  commitUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  openIssueCnt: Math.floor(Math.random() * 31),
  openIssueUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  prCnt: Math.floor(Math.random() * 31),
  prUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ]
}
const Sun = {
  closedIssueCnt: Math.floor(Math.random() * 31),
  closedIssueUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  commitCnt: Math.floor(Math.random() * 31),
  commitUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  openIssueCnt: Math.floor(Math.random() * 31),
  openIssueUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ],
  prCnt: Math.floor(Math.random() * 31),
  prUrls: [
    'https://github.com/satudora-digital/way/issues/87',
    'https://github.com/satudora-digital/way/issues/79',
    'https://github.com/satudora-digital/way/issues/76'
  ]
}

const month = new Date().getMonth() + 1
const day = new Date().getDate()


const data = [
  {name: 'Thu', Commits: Thu.commitCnt, PullRequests: Thu.prCnt, Closed: Thu.closedIssueCnt, Open: Thu.openIssueCnt},
  {name: 'Fri', Commits: Fri.commitCnt, PullRequests: Fri.prCnt, Closed: Fri.closedIssueCnt, Open: Fri.openIssueCnt},
  {name: 'Sat', Commits: Sat.commitCnt, PullRequests: Sat.prCnt, Closed: Sat.closedIssueCnt, Open: Sat.openIssueCnt},
  {name: 'Sun', Commits: Sun.commitCnt, PullRequests: Sun.prCnt, Closed: Sun.closedIssueCnt, Open: Sun.openIssueCnt},
  {name: 'Mon', Commits: Mon.commitCnt, PullRequests: Mon.prCnt, Closed: Mon.closedIssueCnt, Open: Mon.openIssueCnt},
  {name: 'Tue', Commits: Tue.commitCnt, PullRequests: Tue.prCnt, Closed: Tue.closedIssueCnt, Open: Tue.openIssueCnt},
  {name: 'Wed', Commits: Wed.commitCnt, PullRequests: Wed.prCnt, Closed: Wed.closedIssueCnt, Open: Wed.openIssueCnt},
]

const commitUrls = Thu.commitUrls.concat(Fri.commitUrls, Sat.commitUrls, Sun.commitUrls, Mon.commitUrls, Tue.commitUrls, Wed.commitUrls)
const prUrls = Thu.prUrls.concat(Fri.prUrls, Sat.prUrls, Sun.prUrls, Mon.prUrls, Tue.prUrls, Wed.prUrls)
const closedIssueUrls = Thu.closedIssueUrls.concat(Fri.closedIssueUrls, Sat.closedIssueUrls, Sun.closedIssueUrls, Mon.closedIssueUrls, Tue.closedIssueUrls, Wed.closedIssueUrls)
const openIssueUrls = Thu.openIssueUrls.concat(Fri.openIssueUrls, Sat.openIssueUrls, Sun.openIssueUrls, Mon.openIssueUrls, Tue.openIssueUrls, Wed.openIssueUrls)

class RepoPage extends React.Component {

  render () {
    return (
      <div>
        <div>
          <Grid container>
            <Grid item xs={2}>
              <img src={iconUrl} alt="failed loading"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  marginTop: '70px'
                }} />
              <p style={{
                fontFamily: 'Roboto',
                fontWeight: '300',
                fontSize: '20px'
              }}>
                {name}
              </p>
            </Grid>
            <Grid item xs={4}>
              <ResponsiveContainer height={300}>
                <BarChart style={{fontSize: '13px', fontFamily: 'Roboto'}} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar name="Commits" dataKey="Commits" fill="#7BD2F7" stackId="a"/>
                  <Bar name="Pull Requests" dataKey="PullRequests" fill="#7FF175" stackId="a"/>
                  <Bar name="Closed Issues" dataKey="Closed" fill="#F6E976" stackId="a"/>
                  <Bar name="Open Issues" dataKey="Open" fill="#FDB879" stackId="a"/>
                </BarChart>
              </ResponsiveContainer>
            </Grid>
            <Grid item xs={3}>
              <p>Close</p>
                <Grid container>
                  <Grid item xs={6}>
                    <p style={{
                        fontSize: '13px',
                        fontFamily: 'Roboto'
                      }}>
                      <a
                        href='https://github.com/satudora-digital/way/issues/87'
                        target='_blank'
                        rel='noopener noreferrer'
                        >
                        #87
                      </a>
                    </p>
                    <p style={{
                        fontSize: '13px',
                        fontFamily: 'Roboto'
                      }}>
                      <a
                        href='https://github.com/satudora-digital/way/issues/79'
                        target='_blank'
                        rel='noopener noreferrer'
                        >
                        #79
                      </a>
                    </p>
                    <p style={{
                        fontSize: '13px',
                        fontFamily: 'Roboto'
                      }}>
                      <a
                        href='https://github.com/satudora-digital/way/issues/76'
                        target='_blank'
                        rel='noopener noreferrer'
                        >
                        #76
                      </a>
                    </p>
                  </Grid>
                  <Grid item xs={6}>
                    <p style={{
                      fontSize: '13px',
                      background: '#6FDE81',
                      borderRadius: '5px',
                      marginRight: '10px',
                      fontFamily: 'Roboto'
                    }}>enhancement</p>
                    <p style={{
                      fontSize: '13px',
                      background: '#FFBD6F',
                      borderRadius: '5px',
                      marginRight: '10px',
                      fontFamily: 'Roboto'
                    }}>improve</p>
                    <p style={{
                      fontSize: '13px',
                      background: '#FF6F6F',
                      borderRadius: '5px',
                      marginRight: '10px',
                      fontFamily: 'Roboto'
                    }}>bug</p>
                  </Grid>
                </Grid>
            </Grid>
            <Grid item xs={3}>
              <p>Open</p>
                <Grid container>
                  <Grid item xs={6}>
                    <p style={{
                        fontSize: '13px',
                        fontFamily: 'Roboto'
                      }}>
                      <a
                        href='https://github.com/satudora-digital/way/issues/87'
                        target='_blank'
                        rel='noopener noreferrer'
                        >
                        #87
                      </a>
                    </p>
                    <p style={{
                        fontSize: '13px',
                        fontFamily: 'Roboto'
                      }}>
                      <a
                        href='https://github.com/satudora-digital/way/issues/79'
                        target='_blank'
                        rel='noopener noreferrer'
                        >
                        #79
                      </a>
                    </p>
                    <p style={{
                        fontSize: '13px',
                        fontFamily: 'Roboto'
                      }}>
                      <a
                        href='https://github.com/satudora-digital/way/issues/76'
                        target='_blank'
                        rel='noopener noreferrer'
                        >
                        #76
                      </a>
                    </p>
                  </Grid>
                  <Grid item xs={6}>
                    <p style={{
                      fontSize: '13px',
                      background: '#FFBD6F',
                      borderRadius: '5px',
                      marginRight: '10px',
                      fontFamily: 'Roboto'
                    }}>improve</p>
                    <p style={{
                      fontSize: '13px',
                      background: '#FF6F6F',
                      borderRadius: '5px',
                      marginRight: '10px',
                      fontFamily: 'Roboto'
                    }}>bug</p>
                    <p style={{
                      fontSize: '13px',
                      background: '#6FDE81',
                      borderRadius: '5px',
                      marginRight: '10px',
                      fontFamily: 'Roboto'
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
