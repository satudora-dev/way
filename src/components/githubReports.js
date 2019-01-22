import React from 'react'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'
import Grid from '@material-ui/core/Grid'
import { fireStore } from '../firebase/index'


// font height, font widthで指定するとh1.heightなどで指定するからいいと思う
const h1 = {
  fontFamily: 'Roboto',
  fontStyle: 'Light',
  fontSize: '36px',
  lineHeight: '0px'
}
const h2 = {
  fontFamily: 'Roboto',
  fontStyle: 'Light',
  fontSize: '22px',
  lineHeight: '0px'
}
const h3 = {
  fontFamily: 'Roboto',
  fontStyle: 'Regular',
  fontSize: '18px',
  lineHeight: '0px'
}
const graph_small = {
  fontFamily: 'Roboto',
  fontStyle: 'Bold',
  fontSize: '10px',
  lineHeight: '0px'
}

const primary = '#A7A7A7'
const secondary = '#3970FF'
const sky = '#7BD2F7'
const leaf = '#7FF175'
const lemon = '#F6E976'
const sunset = '#FDB879'
const tomato = '#FF7F7F'

var name = "Yasunari Ota"

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



class GithubReports extends React.Component {
  constructor (props) {
    super (props)
  }

  componentWillMount () {
    this.props.fetchGithubReports()
  }

  render () {
    var iconUrl = null
    if (this.props.githubReports) {
      iconUrl = this.props.githubReports.awakia.iconUrl
    }
    return (
      <div>
        <div>
          <Grid container>
            <Grid item xs={2}>
              <p style={h2}>Member</p>
              <hr width='100%'/>
              <img src={iconUrl} alt="failed loading"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  marginTop: '126px'
                }} />
              <p style={h3}>{name}</p>


            </Grid>
            <Grid item xs={4}>
              <p style={h2}>Activity</p>
              <hr width='100%'/>
              <div style={{paddingTop: '40px'}}>
                <ResponsiveContainer height={230}>
                  <BarChart style={graph_small} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar name="Commits" dataKey="Commits" fill={sunset} stackId="a"/>
                    <Bar name="Pull Requests" dataKey="PullRequests" fill={lemon} stackId="a"/>
                    <Bar name="Closed Issues" dataKey="Closed" fill={leaf} stackId="a"/>
                    <Bar name="Open Issues" dataKey="Open" fill={sky} stackId="a"/>
                  </BarChart>
              </ResponsiveContainer>
              </div>
            </Grid>



            <Grid item xs={3}>
              <p style={h2}>Close</p>
              <hr width='100%'/>
                <Grid container>
                  <Grid item xs={6}>
                    <p style={
                        Object.assign({
                          paddingTop: '16px',
                          paddingBottom: '16px',
                        }, h3)
                      }>
                      <a
                        href='https://github.com/satudora-digital/way/issues/87'
                        target='_blank'
                        rel='noopener noreferrer'
                        >
                        #87
                      </a>
                    </p>
                    <p style={
                        Object.assign({
                          paddingTop: '16px',
                          paddingBottom: '16px',
                        }, h3)
                      }>
                      <a
                        href='https://github.com/satudora-digital/way/issues/79'
                        target='_blank'
                        rel='noopener noreferrer'
                        >
                        #79
                      </a>
                    </p>
                    <p style={
                        Object.assign({
                          paddingTop: '16px',
                          paddingBottom: '16px',
                        }, h3)
                      }>
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
                        background: tomato,
                        width: '126px',
                        height: '32px',
                        borderRadius: '5px'
                      }}>
                      <p style={
                          Object.assign({
                            paddingTop: '16px'
                          }, h3)
                        }>enhancement</p>
                    </div>
                    <div style={{
                      background: sunset,
                      width: '126px',
                      height: '32px',
                      borderRadius: '5px'
                      }}>
                      <p style={
                          Object.assign({
                            paddingTop: '16px'
                          }, h3)
                        }>improve</p>
                    </div>
                    <div style={{
                      background: tomato,
                      width: '126px',
                      height: '32px',
                      borderRadius: '5px'
                      }}>
                      <p style={
                          Object.assign({
                            paddingTop: '16px'
                          }, h3)
                        }>bug</p>
                    </div>
                  </Grid>
                </Grid>
            </Grid>



            <Grid item xs={3}>
              <p style={h2}>Open</p>
              <hr width='100%'/>
                <Grid container>
                  <Grid item xs={6}>
                    <p style={
                        Object.assign({
                          paddingTop: '16px',
                          paddingBottom: '16px'
                        }, h3)
                      }>
                      <a
                        href='https://github.com/satudora-digital/way/issues/87'
                        target='_blank'
                        rel='noopener noreferrer'
                        >
                        #87
                      </a>
                    </p>
                    <p style={
                        Object.assign({
                          paddingTop: '16px',
                          paddingBottom: '16px'
                        }, h3)
                      }>
                      <a
                        href='https://github.com/satudora-digital/way/issues/79'
                        target='_blank'
                        rel='noopener noreferrer'
                        >
                        #79
                      </a>
                    </p>
                    <p style={
                        Object.assign({
                          paddingTop: '16px',
                          paddingBottom: '16px'
                        }, h3)
                      }>
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
                        background: leaf,
                        width: '126px',
                        height: '32px',
                        borderRadius: '5px'
                      }}>
                      <p style={
                          Object.assign({
                            paddingTop: '16px'
                          }, h3)}>enhancement</p>
                    </div>
                    <div style={{
                        background: sunset,
                        width: '126px',
                        height: '32px',
                        borderRadius: '5px'
                      }}>
                      <p style={
                          Object.assign({
                            paddingTop: '16px'
                          }, h3)}>improve</p>
                    </div>
                    <div style={{
                        background: tomato,
                        width: '126px',
                        height: '32px',
                        borderRadius: '5px'
                      }}>
                      <p style={
                          Object.assign({
                            paddingTop: '16px'
                          }, h3)}>bug</p>
                    </div>
                  </Grid>
                </Grid>
            </Grid>
          </Grid>
        </div>
        <hr style={{marginTop: '73px'}} />



      </div>

    )
  }
}

export default GithubReports
