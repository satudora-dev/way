import React from 'react'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts'


const data = [
  {name: 'Monday', Active: 400, Merged: 180, Closed: 130},
  {name: 'Tuesday', Active: 300, Merged: 90, Closed: 320},
  {name: 'Wednesday', Active: 200, Merged: 10, Closed: 130},
  {name: 'Thursday', Active: 270, Merged: 190, Closed: 340},
  {name: 'Friday', Active: 180, Merged: 180, Closed: 130},
  {name: 'Saturday', Active: 230, Merged: 890, Closed: 30},
  {name: 'Sunday', Active: 340, Merged: 190, Closed: 230},
]

const styleBeta = {
}

class RepoPage extends React.Component {

  render () {
    return (
      <div>
        Satoshi Yoshio
        <BarChart style={styleBeta} width={700} height={250} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          {/* <XAxis dataKey="name" /> */}
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Active" fill="#94FC9F" stackId="a"/>
          <Bar dataKey="Merged" fill="#EBFC94" stackId="a"/>
          <Bar dataKey="Closed" fill="#FCCE94" stackId="a"/>
        </BarChart>
      </div>
    )
  }
}

export default RepoPage
