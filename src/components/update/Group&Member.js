import React, { Component,Fragment } from 'react' 
import Select from 'react-select'
import {setGroup,setRmvGroup,updListGroup,setAncestor,setMember,setRmvMember,updListMember} from '../../actions/stakehUpdateAction' 

import {connect} from 'react-redux'
import PropTypes from 'prop-types'
 

class GroupMember extends Component {
    constructor(){
        super()
        this.state={
            listItemGroup:[],
            listItemMember:[],
            groupVal:[],  
            memberVal:[],  
                    
        }
    }
    
    componentDidUpdate(prevProps){
        if(prevProps.stakeholderUpdate.listAncestor!==this.props.stakeholderUpdate.listAncestor){
            const {listAncestor}=this.props.stakeholderUpdate      
                // console.log(listAncestor)                     
                const ancestor = listAncestor!==undefined?listAncestor.map(itm=>({ value: itm.stakeholder_id, label:decodeURIComponent(itm.full_name) })):"Cannot Select"
                // console.log(stakehOptions)
            this.setState({ 
                listItemGroup:ancestor
            })
        } 
        if(prevProps.stakeholderUpdate.listDescendant!==this.props.stakeholderUpdate.listDescendant){
            const {listDescendant}=this.props.stakeholderUpdate      
                // console.log(listDescendant)                     
                const descendant = listDescendant!==undefined?listDescendant.map(itm=>({ value: itm.stakeholder_id, label:decodeURIComponent(itm.full_name) })):listDescendant
                // console.log(stakehOptions)
            this.setState({ 
                listItemMember:descendant
            })
        }
        if(prevProps.stakeholderView.stakeholder_Group!==this.props.stakeholderView.stakeholder_Group){
            const {stakeholder_Group} = this.props.stakeholderView

            const group = stakeholder_Group.map(itm=>({ value: itm.stakeholder_id, label:decodeURIComponent(itm.full_name)} ))

            this.setState({
                groupVal: group                
            })
        }
        if(prevProps.stakeholderView.stakeholder_Member!==this.props.stakeholderView.stakeholder_Member){
        const {stakeholder_Member} = this.props.stakeholderView

            const member = stakeholder_Member.map(itm=>({ value: itm.stakeholder_id, label:decodeURIComponent(itm.full_name)}))

            this.setState({
                memberVal: member
            })
        }      
    }

    handleGroupChange=(value)=>{
        // value.length>1?alert('You may only select 1'):this.setState({groupVal: value}) 
        this.setState({groupVal: value})   
        // console.log(value)
    } 
    
    handleMemberChange=(value)=>{
        this.setState({memberVal:value})
        console.log(value)
    }
     

    formSubmit=(e)=>{
        e.preventDefault()
        const {user:{bio_access_id:idAccess}} = this.props.session
        const {stakehSel} = this.props.stakeholderlistType
        const {stakeholder_Group,stakeholder_Member} = this.props.stakeholderView
        const {groupVal,memberVal}= this.state
        // console.log(stakeholder_Group)
        // const reduxGroup = stakeholder_Group.map(x=>({id:x.stakeholder_id}))
        // console.log(reduxGroup)
        //  console.log(groupVal)
       
        // const test  = groupVal.filter(x=>x.value === stkh-fc2694e297054827920613f180b6458b)
        console.log(stakeholder_Member)
       
        //Group
        if(groupVal.length >= stakeholder_Group.length ) {     
            groupVal.forEach((x,idx)=>{
                const groupSource = {
                    action: "ADD_CHILD_ITEM",
                    bio_access_id: idAccess,
                    parent_id: x.value,  
                    child_id: stakehSel,
                    def_organization: false,
                    def_group: false,
                    def_department: false,
                    def_designation: false                
                }
                this.props.setGroup(groupSource)
            })
        }

        if(groupVal.length < stakeholder_Group.length ) {            
            groupVal.forEach((x,idx)=>{
                const groupSource = {
                    action: "REMOVE_CHILD_ITEM",
                    bio_access_id: idAccess,
                    parent_id: x.value,  
                    child_id: stakehSel,
                    def_organization: false,
                    def_group: false,
                    def_department: false,
                    def_designation: false                
                }
                this.props.setRmvGroup(groupSource)
            })           
        }

        if (groupVal.length === 0 ){
            stakeholder_Group.forEach((x,idx)=>{
                const groupSource = {
                    action: "REMOVE_CHILD_ITEM",
                    bio_access_id: idAccess,
                    parent_id: x.stakeholder_id,  
                    child_id: stakehSel,
                    def_organization: false,
                    def_group: false,
                    def_department: false,
                    def_designation: false                
                }
                this.props.setRmvGroup(groupSource)
            })
        }

        //Member
        if(memberVal.length >= stakeholder_Member.length  ) {     
            memberVal.forEach((x,idx)=>{
                const memberSource = {
                    action: "ADD_CHILD_ITEM",
                    bio_access_id: idAccess,
                    parent_id: stakehSel,  
                    child_id: x.value               
                }
                this.props.setMember(memberSource)
            })
        }

        if(memberVal.length < stakeholder_Member.length  ) {            
            memberVal.forEach((x,idx)=>{
                const memberSource = {
                    action: "REMOVE_CHILD_ITEM",
                    bio_access_id: idAccess,
                    parent_id: stakehSel,  
                    child_id: x.value                             
                }
                this.props.setRmvMember(memberSource)
            })           
        }

        if (memberVal.length === 0 ){
            stakeholder_Member.forEach((x,idx)=>{
                const memberSource = {
                    action: "REMOVE_CHILD_ITEM",
                    bio_access_id: idAccess,
                    parent_id: stakehSel,  
                    child_id: x.stakeholder_id                                
                }
                this.props.setRmvMember(memberSource)
            })
        }
     
      

    }
    

  render() {

    const active = this.props.active
    const {listItemGroup,listItemMember,groupVal,memberVal} = this.state

  

    return (
      <Fragment>
        <h1 className="h3 display text-primary text-center">Group & Associate</h1>
            <form className="mt-3 ml-3 mr-3" onSubmit={this.formSubmit}>
                <div className="row justify-content-center mb-5">
                    <div className="col-xl-3 col-lg-4 col-md-4">
                        <div className="text-center">
                            <img src={require('../../img/add.svg')} alt='folder'className=" img-dash" />
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-8 col-md-8 col-sm-2">
                        <div className="row">
                            <div className="js-view col-lg-6 col-md-6 col-sm-6">
                                <label className="test">Group</label>
                                    <Select
                                        options={listItemGroup}
                                        onChange={this.handleGroupChange}
                                        value={groupVal} 
                                        isMulti
                                        placeholder="Group"/>                                 
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-6">
                                <label>Associate</label>
                                    <Select 
                                        options={listItemMember}
                                        onChange={this.handleMemberChange}
                                        value={memberVal} 
                                        isMulti
                                        placeholder="Associate"/>                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className={active==='group'?"modal-footer":""}>
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button type="button" className="btn btn-secondary">Close</button>
                </div>
            </form>
                {/* <Loader
                    modalIsOpen={this.state.openLoader}
                    loaderText={this.state.loaderText}
                /> */}
      </Fragment>
    )
  }
}
GroupMember.propTypes={
    session: PropTypes.object.isRequired,
    stakeholderlistType: PropTypes.object.isRequired,
    stakeholderView: PropTypes.object.isRequired,
    stakeholderUpdate: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
    setGroup: PropTypes.func.isRequired,
    setRmvGroup: PropTypes.func.isRequired,
    updListGroup: PropTypes.func.isRequired,
    setAncestor: PropTypes.func.isRequired,
    setMember: PropTypes.func.isRequired,
    setRmvMember: PropTypes.func.isRequired,
    updListMember: PropTypes.func.isRequired,
     

   
    
     
}

const mapStateToProps= state =>({
    session:state.session,
    stakeholderlistType:state.stakeholderlistType,
    layout:state.layout,
    stakeholderView: state.stakeholderView,
    stakeholderUpdate: state.stakeholderUpdate

        
         
})
    
export default connect(mapStateToProps,{
    setGroup,
    setRmvGroup,
    updListGroup,
    setAncestor,
    setMember,
    setRmvMember,
    updListMember
    
})(GroupMember)