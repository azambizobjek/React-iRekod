import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {setStakehSel,setShowFab} from '../../actions/stakeholderAction/stakehTypeAction'
import {setSelWorkFlow} from '../../actions/workflowAction/authListWorkFlow'
import {setActivePage,setPageTitle,setPageSubject} from '../../actions/layoutInitAction'
import {setStakehType,setStakehNumb} from '../../actions/stakeholderAction/stakehTypeAction'
import {setListWorkFlow,setListofSubject} from '../../actions/workflowAction/authListWorkFlow'
import {setStakehListNew} from '../../actions/workflowAction/createNewActAction'
import {setCustomField} from '../../actions/workflowAction/workflowDetailAction'
import {toggleErr} from '../../actions/auditTrailAction/modalAction'

 

class SideNav extends React.Component {
  constructor(){
    super();
    this.state = {
      workFlowToggle: false,
      stakehToggle: false,
      auditTrailToggle: false,
      // documentToggle: false,
      // uploadToggle:false,     
    };

  }
  toggleClass=(e)=> {
    e.preventDefault()
    switch(e.target.name){
      case 'stakeholder':
        const stakehState = this.state.stakehToggle
        this.setState({ stakehToggle: !stakehState, workFlowToggle:false,auditTrailToggle:false})
        break
      case 'workflow':
        const workflowState = this.state.workFlowToggle
        this.setState({ workFlowToggle: !workflowState, stakehToggle:false,auditTrailToggle:false})        
      break 
      case 'auditTrail': 
        const auditTrailState = this.state.auditTrailToggle
        this.setState({ auditTrailToggle: !auditTrailState, stakehToggle:false, workFlowToggle:false})        
      break 
      default:
    }
  }

  setActivePage=(e)=>{
      e.preventDefault()

      /////////////////////////////stakeholder////////////////////////////////////
      const {user:{stakeholder_id:bId,bio_access_id:idAccess}} = this.props.session

      this.props.setActivePage(e.target.getAttribute('data-pagename'))
      this.props.setPageTitle(e.target.getAttribute('data-pageTitle'))
      this.props.setStakehNumb(e.target.getAttribute('data-id'))
      // console.log(e.target.getAttribute('data-pageTitle'))     

      const stakehObj={
        stakeholder_id:bId,
        bio_access_id:idAccess,
        action:'ITEM_LIST_TYPE',
        stakeh_type: parseInt(e.target.getAttribute('data-id')),
      }

      this.props.setStakehType(stakehObj) 
      this.props.setStakehSel(null)  
      this.props.setShowFab(false) 
      this.props.setSelWorkFlow(null)                 


      // console.log(stakehObj)      

      // //stkh Detail
      // const stakehDet={
      //   stakeholder_id:bId,
      //   bio_access_id:idAccess,
      //   action:'ITEM_DETAIL',            
      // }
      // this.props.setStakeholderItemDetail(stakehDet)  


      ///////////////////////////////workflow////////////////////////////////////

      const listWrkFlwObj ={
        action: 'ITEM_LIST',
        bio_access_id: idAccess
      }
      const listofSubjectObj ={
        action: 'LIST_ITEM_SUBJECT',
        bio_access_id: idAccess
      }
  
      const stakehList={
        action: "ITEM_LIST",
        bio_access_id: idAccess       
      }
  
      const customFieldObj={
        action: "ITEM_LIST_BY_OBJECT",
        bio_access_id: idAccess,
        object_id:"STKH"    
    }
   
      const pageSubject= ""
      this.props.setStakehListNew(stakehList)
      this.props.setListWorkFlow(listWrkFlwObj)
      this.props.setListofSubject(listofSubjectObj)
      this.props.setPageTitle(e.target.getAttribute('data-pageTitle'))
      this.props.setCustomField(customFieldObj)
      this.props.setPageSubject(pageSubject)
      this.props.setStakehSel(null)    
      this.props.setShowFab(false) 
      this.props.setSelWorkFlow(null)     


      ////////////////////////////////workflow////////////////////////////////////

      const pgName = e.target.getAttribute('data-pagename')
        this.props.setActivePage(pgName)
        this.props.setStakehSel(null)  
        this.props.setShowFab(false) 
        this.props.setSelWorkFlow(null)      
                
        if(pgName==='log')
        {
          this.props.toggleErr(true)
        }  

        if(pgName==='print')
        {
          this.props.toggleErr(true)
        }

       
  
      

  } 
  
  render() {

      const {navBarClass}=this.props.layout
      const {user:{stakeholder_name:stakehName,roles:[{title}]}}=this.props.session

    return (
    <nav className={navBarClass}>

      <div className="side-navbar-wrapper">

        <div className="sidenav-header d-flex align-items-center justify-content-center">

          <div className="sidenav-header-inner text-center">
            <img src={require('../../img/user.svg')} alt="user" className="img-fluid "/>
            <h2 className="h5">{stakehName}</h2>
            <span>{title}</span>
          </div>

          <div className="sidenav-header-logo">
            <a className="brand-small text-center" href='/' onClick={this.setActivePage} data-pagename="dashboard">
              <img src={require('../../img/user.svg')} alt="user" className="img-fluid " data-pagename="dashboard" />
            </a>
          </div>

        </div>

        <div className="main-menu">
          <h5 className="sidenav-heading text-center">Main</h5>
          <ul id="side-main-menu" className="side-menu list-unstyled">

          {/* Dashboard */}
          <li>
            <a href="/" onClick={this.setActivePage} data-pagename="dashboard">
              <div className="userIcon" data-pagename="dashboard">
                <img src={require('../../img/StakeType/Dashboard.svg')} alt="dashboard" className="img-fluid mr-1" data-pagename="dashboard"/>
              </div>Dashboard
            </a>
          </li>

             {/* List Of WorkFlow */}
            <li>
              <a href="/" aria-expanded={this.state.workFlowToggle} data-toggle="collapse" name="workflow" className={this.state.workFlowToggle ? '' : 'collapsed'} onClick={this.toggleClass} >
              <div className="userIcon"><img src={require('../../img/folder.svg')} alt="doc" className="img-fluid p-1"/></div>Workflow </a>
              <ul id="chartsDropdown" className={this.state.workFlowToggle ? 'collapse list-unstyled show' : 'collapse list-unstyled'}>
                <li>
                      <a href="/" onClick={this.setActivePage} data-pagename="listOfWorkflow" data-pagetitle="List Workflow" >
                      <div className="userIcon" data-pagename="listOfWorkflow">
                      <img src={require('../../img/management.svg')} alt="doc" className="img-fluid p-1" data-pagename="listOfWorkflow" name="List Workflow" />
                      </div>List of Workflow
                      </a>
                </li>
              </ul>
            </li>

            {/* Stakeholder */}
            <li>
              <a href="/" aria-expanded={this.state.stakehToggle} data-toggle="collapse" name="stakeholder" className={this.state.stakehToggle ? '' : 'collapsed'} onClick={this.toggleClass} >
              <div className="userIcon"><img src={require('../../img/employee.svg')} alt="employee" className="img-fluid p-1"/></div>Stakeholder </a>
              <ul id="chartsDropdown" className={this.state.stakehToggle ? 'collapse list-unstyled show' : 'collapse list-unstyled'}>
                <li>
                  <a href="/" onClick={this.setActivePage} data-id='0' data-pagetitle="Group" data-pagename="index">
                    <div className="userIcon" data-pagename="index">
                        <img src={require('../../img/StakeType/Group.svg')} alt="group" className="img-fluid mr-1" data-pagename="Group"/>
                    </div>Group
                  </a>
                </li>
                <li>
                    <a href="/" onClick={this.setActivePage} data-id='1' data-pagetitle="Organization" data-pagename="index">
                    <div className="userIcon" data-pagename="index">
                    <img src={require('../../img/StakeType/Organization.svg')} alt="organization" className="img-fluid mr-1" data-pagename="index" />
                    </div>Organization
                    </a>
                </li>   
                <li>
                      <a href="/" onClick={this.setActivePage} data-id='2' data-pagetitle="Branch" data-pagename="index">
                      <div className="userIcon" data-pagename="index">
                      <img src={require('../../img/StakeType/Branch.svg')} alt="branch" className="img-fluid mr-1" data-pagename="index" />
                      </div>Branch
                      </a>
                </li> 
                <li>
                      <a href="/" onClick={this.setActivePage} data-id='3' data-pagetitle="Department" data-pagename="index">
                      <div className="userIcon" data-pagename="index">
                      <img src={require('../../img/StakeType/Department.svg')} alt="department" className="img-fluid mr-1" data-pagename="index" />
                      </div>Department
                      </a>
                </li> 
                <li>
                      <a href="/" onClick={this.setActivePage} data-id='4' data-pagetitle="Designation" data-pagename="index">
                      <div className="userIcon" data-pagename="index">
                      <img src={require('../../img/StakeType/Designation.svg')} alt="designation" className="img-fluid mr-1" data-pagename="index" />
                      </div>Designation
                      </a>
                </li>      
                <li>
                      <a href="/" onClick={this.setActivePage} data-id='5' data-pagetitle="User" data-pagename="index">
                      <div className="userIcon" data-pagename="index">
                      <img src={require('../../img/StakeType/User.svg')} alt="user" className="img-fluid mr-1" data-pagename="index" />
                      </div>User
                      </a>
                </li>       
              </ul>
            </li> 

                {/* Audit Trail */}

                <li>
                  <a href="/" aria-expanded={this.state.auditTrailToggle} data-toggle="collapse" name="auditTrail" className={this.state.auditTrailToggle ? '' : 'collapsed'} onClick={this.toggleClass} >
                  <div className="userIcon"><img src={require('../../img/folder.svg')} alt="audit" className="img-fluid p-1"/></div>Audit Log </a>
                  <ul id="chartsDropdown" className={this.state.auditTrailToggle ? 'collapse list-unstyled show' : 'collapse list-unstyled'}>
                    <li>
                        <a href="/" data-pagename="log" onClick={this.setActivePage}>
                        <div className="userIcon" data-pagename="log">
                        <img src={require('../../img/folder.svg')} alt="doc"  data-pagename="log"/>
                        </div>Search
                        </a>
                    </li>
                    <li>
                        <a href="/" data-pagename="print" onClick={this.setActivePage}>
                        <div className="userIcon" data-pagename="print">
                        <img src={require('../../img/folder.svg')} alt="doc"  data-pagename="print"/>
                        </div>Print Report
                        </a>
                    </li>
                  </ul>
                </li>



            
                     
          </ul>
        </div>
      </div>
    </nav>


    );
  }
}

SideNav.propTypes={
    session: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
    setActivePage: PropTypes.func.isRequired,
    setPageTitle: PropTypes.func.isRequired,
    setStakehType: PropTypes.func.isRequired,
    setStakehNumb: PropTypes.func.isRequired,
    setListWorkFlow: PropTypes.func.isRequired,
    setListofSubject: PropTypes.func.isRequired,
    setStakehListNew: PropTypes.func.isRequired,
    setCustomField: PropTypes.func.isRequired,
    setPageSubject: PropTypes.func.isRequired, 
    toggleErr: PropTypes.func.isRequired,
    setStakehSel: PropTypes.func.isRequired,
    setShowFab: PropTypes.func.isRequired, 
    setSelWorkFlow: PropTypes.func.isRequired,
    

  }
  const mapStateToProps= state =>({
    session:state.session,
    layout:state.layout,
    stakeholderlistType:state.stakeholderlistType
    


  })
  export default connect(mapStateToProps,{
    setActivePage,
    setStakehType,
    setPageTitle,
    setStakehNumb,
    setListWorkFlow,
    setListofSubject,
    setStakehListNew,
    setCustomField,
    setPageSubject,
    toggleErr,
    setStakehSel,
    setShowFab,
    setSelWorkFlow,
    
  })
  (SideNav)
