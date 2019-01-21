import React from 'react'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import Grid from '@material-ui/core/Grid'
import fireStore from '../firebase/index'


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


const data = [
  {name: 'Thu', Commits: Thu.commitCnt, PullRequests: Thu.prCnt, Closed: Thu.closedIssueCnt, Open: Thu.openIssueCnt},
  {name: 'Fri', Commits: Fri.commitCnt, PullRequests: Fri.prCnt, Closed: Fri.closedIssueCnt, Open: Fri.openIssueCnt},
  {name: 'Sat', Commits: Sat.commitCnt, PullRequests: Sat.prCnt, Closed: Sat.closedIssueCnt, Open: Sat.openIssueCnt},
  {name: 'Sun', Commits: Sun.commitCnt, PullRequests: Sun.prCnt, Closed: Sun.closedIssueCnt, Open: Sun.openIssueCnt},
  {name: 'Mon', Commits: Mon.commitCnt, PullRequests: Mon.prCnt, Closed: Mon.closedIssueCnt, Open: Mon.openIssueCnt},
  {name: 'Tue', Commits: Tue.commitCnt, PullRequests: Tue.prCnt, Closed: Tue.closedIssueCnt, Open: Tue.openIssueCnt},
  {name: 'Wed', Commits: Wed.commitCnt, PullRequests: Wed.prCnt, Closed: Wed.closedIssueCnt, Open: Wed.openIssueCnt},
]



const new_data = {
  20190109: {
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
  },
  20190116: {
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
}


function getDates (new_data) {
  var datesList = []
  for (var date in new_data) {
    datesList.push(date)
  }
  return datesList
}


class RepoPage extends React.Component {

  render () {
    return (
      <div>
        <div>
          <Grid container>
            <Grid item xs={2}>
              <p style={{
                  fontFamily: 'Roboto',
                  fontSize: '28px',
                  marginBottom: '13px'
                }}>Member</p>
              <hr width='100%'/>
              <img src={iconUrl} alt="failed loading"
                style={{
                  width: '102px',
                  height: '102px',
                  borderRadius: '50%',
                  marginTop: '70px'
                }} />
              <p style={{
                fontFamily: 'Roboto',
                fontWeight: '300',
                fontSize: '24px'
              }}>
                {name}
              </p>



            </Grid>
            <Grid item xs={4}>
              <p style={{
                  fontFamily: 'Roboto',
                  fontSize: '28px',
                  marginBottom: '13px'
                }}>Activity</p>
              <hr width='100%'/>
              <ResponsiveContainer height={300}>
                <BarChart style={{fontSize: '14px', fontFamily: 'Roboto'}} data={data}>
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
              <p style={{
                  fontFamily: 'Roboto',
                  fontSize: '28px',
                  marginBottom: '13px'
                }}>Close</p>
              <hr width='100%'/>
                <Grid container>
                  <Grid item xs={6}>
                    <p style={{
                        fontSize: '24px',
                        fontFamily: 'Roboto',
                        margin: '23px'
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
                        fontSize: '24px',
                        fontFamily: 'Roboto',
                        margin: '23px'
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
                        fontSize: '24px',
                        fontFamily: 'Roboto',
                        margin: '23px'
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
                    <div style={{
                      background: '#6FDE81',
                      borderRadius: '5px',
                      marginRight: '10px',
                      width: '126px',
                      height: '32px',
                      }}>
                      <p style={{
                        fontSize: '18px',
                        fontFamily: 'Roboto',
                        paddingTop: '5px'
                      }}>enhancement</p>
                    </div>
                    <div style={{
                      background: '#FFBD6F',
                      borderRadius: '5px',
                      marginRight: '10px',
                      width: '126px',
                      height: '32px',
                      }}>
                      <p style={{
                        fontSize: '18px',
                        fontFamily: 'Roboto',
                        paddingTop: '5px'
                      }}>improve</p>
                    </div>
                    <div style={{
                      background: '#FF6F6F',
                      borderRadius: '5px',
                      marginRight: '10px',
                      width: '126px',
                      height: '32px',
                      }}>
                      <p style={{
                        fontSize: '18px',
                        fontFamily: 'Roboto',
                        paddingTop: '5px'
                      }}>bug</p>
                    </div>
                  </Grid>
                </Grid>
            </Grid>



            <Grid item xs={3}>
              <p style={{
                  fontFamily: 'Roboto',
                  fontSize: '28px',
                  marginBottom: '13px'
                }}>Open</p>
              <hr width='100%'/>
                <Grid container>
                  <Grid item xs={6}>
                    <p style={{
                        fontSize: '24px',
                        fontFamily: 'Roboto',
                        margin: '23px'
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
                        fontSize: '24px',
                        fontFamily: 'Roboto',
                        margin: '23px'
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
                        fontSize: '24px',
                        fontFamily: 'Roboto',
                        margin: '23px'
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
                    <div style={{
                      background: '#6FDE81',
                      borderRadius: '5px',
                      marginRight: '10px',
                      width: '126px',
                      height: '32px',
                      }}>
                      <p style={{
                        fontSize: '18px',
                        fontFamily: 'Roboto',
                        paddingTop: '5px'
                      }}>enhancement</p>
                    </div>
                    <div style={{
                      background: '#FFBD6F',
                      borderRadius: '5px',
                      marginRight: '10px',
                      width: '126px',
                      height: '32px',
                      }}>
                      <p style={{
                        fontSize: '18px',
                        fontFamily: 'Roboto',
                        paddingTop: '5px'
                      }}>improve</p>
                    </div>
                    <div style={{
                      background: '#FF6F6F',
                      borderRadius: '5px',
                      marginRight: '10px',
                      width: '126px',
                      height: '32px',
                      }}>
                      <p style={{
                        fontSize: '18px',
                        fontFamily: 'Roboto',
                        paddingTop: '5px'
                      }}>bug</p>
                    </div>
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
