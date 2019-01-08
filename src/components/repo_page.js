import React from 'react'
import { LineChart, Line } from 'recharts'


const data = [
  {name: 'Page A', uv: 4000},
  {name: 'Page B', uv: 3000},
  {name: 'Page C', uv: 2000},
  {name: 'Page D', uv: 2780},
  {name: 'Page E', uv: 1890},
  {name: 'Page F', uv: 2390},
  {name: 'Page G', uv: 3490},
]

class RepoPage extends React.Component {

  render () {
    return (
      <div>
        <LineChart width={400} height={400} data={data}>
          <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>
      </div>
    )
  }
}

export default RepoPage
