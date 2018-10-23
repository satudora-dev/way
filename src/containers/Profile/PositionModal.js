const PositionModal = (open, addPosition, PositionModalclose, ) => {
  return(
    <div>
      <Grid>
        <Modal open={this.state.open}
               onClose={() => {if (!tutorial) this.setState({open: false})}}
        >
        <div style={style.selectProjectModalStyle}>
          {(() => {
            if(tutorial){
              return(
                <h3>Hello!! Which is your position?</h3>
              )
            }
            else{
              return(
                <h3>select position</h3>
              )
            }
          })()}
          <PositionSelect position={this.state.position} updateParentPosition={this.updatePosition} userID={this.state.id}/>
          <Button style={this.state.position === "" || this.state.position === undefined ? style.disabledstyle : style.btnstyle}
                  variant="outlined"
                  value="add"
                  disabled={this.state.position === "" || this.state.position === undefined}
                  onClick={() => this.onClickModalButton()}
          >
          done
          </Button>
        </div>
        </Modal>
      </Grid>
    </div>
  )
}
