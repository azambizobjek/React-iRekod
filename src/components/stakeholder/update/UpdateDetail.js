import React, { Component,Fragment } from 'react'
import BasicWizard from '../../stakeholder/update/BasicWizard'
import SecurityWizard from '../../stakeholder/update/SecurityWizard'
import AccessWizard from '../../stakeholder/update/AccessWizard'
import GrpMberWizard from '../../stakeholder/update/Group&Member'
import CustomField from '../../stakeholder/update/CustomField'
import FolTabHead from '../../stakeholder/update/FolTabHead'
import {setRoleStore,setStakehList,setStkhAccDetail,setAncestor,setDescendant,setSecLevel,setcustomField,setWizardPage} from '../../../actions/stakeholderAction/stakehUpdateAction'
import {setActivePage} from '../../../actions/layoutInitAction' 
import {setStakehType} from '../../../actions/stakeholderAction/stakehTypeAction'
import {viewStakehGroup,viewStakehMember} from '../../../actions/stakeholderAction/stakehViewDetail'

 

import {connect} from 'react-redux'
import PropTypes from 'prop-types'

class UpdateDetail extends Component {

    handleWizard=(wizardName)=>{        
        const {user:{bio_access_id:idAccess}} = this.props.session
        const {stakehSel,stakehNumb} = this.props.stakeholderlistType  
        // console.log(stakehNumb)
        
        this.props.setWizardPage(wizardName)
        // console.log(e.target.getAttribute('data-wizardname'))  
        
        //Role List
        const RoleObj={
            action: "ITEM_LIST",
            bio_access_id: idAccess      
        }
        this.props.setRoleStore(RoleObj)
        
          //Stakeholder List
        const stakehList={
            action:"ITEM_LIST",
            bio_access_id:idAccess
        }
        this.props.setStakehList(stakehList)

          //stkh Detail
        const stakehDet={
            stakeholder_id:stakehSel,
            bio_access_id:idAccess,
            action:'ITEM_DETAIL',            
        }
        this.props.setStkhAccDetail(stakehDet)   

        //Ancestor Group
        const listAncestor={
            bio_access_id: idAccess,
            stakeholder_id: stakehSel,
            action: "ITEM_LIST_ANCESTOR",
            stakeh_type: parseInt(stakehNumb)      
        }
        this.props.setAncestor(listAncestor)

        //Descendant Member
        const listDescendant={
            bio_access_id: idAccess,
            stakeholder_id: stakehSel,
            action: "ITEM_LIST_DESCENDANT",
            stakeh_type: parseInt(stakehNumb)      
        }
        this.props.setDescendant(listDescendant)

        //Security Level
         const SecurityObj={
            action: "ITEM_LIST",
            bio_access_id: idAccess      
        }
        this.props.setSecLevel(SecurityObj)

        //List Group
        const stakehGroup={
            stakeholder_id:stakehSel,
            bio_access_id:idAccess,
            action:'ITEM_LIST_GROUP',             
        }
        this.props.viewStakehGroup(stakehGroup)

         //Member
        const stakehMember={
            stakeholder_id:stakehSel,
            bio_access_id:idAccess,
            action:'ITEM_LIST_MEMBER',             
        }
        this.props.viewStakehMember(stakehMember)

        const customFieldObj={
            action:"ITEM_LIST_ATTRIBUTE",
            bio_access_id: idAccess
        }
        this.props.setcustomField(customFieldObj)

    }
 
    components={
        basic:BasicWizard,
        security:SecurityWizard,        
        access:AccessWizard,
        group:GrpMberWizard,
        custom:CustomField     

        // icon:{
        //     delete:`fab-trash.svg`,
        //     move:`fab-move.svg`
        // }
    }

    setActivePage=(e)=>{
        e.preventDefault()     
        const {user:{stakeholder_id:bId,bio_access_id:idAccess}} = this.props.session
        const {stakehSel,stakehNumb} = this.props.stakeholderlistType
        // console.log(stakehNumb)   
       
        const stakehObj={
            stakeholder_id:bId,
            bio_access_id:idAccess,
            action:'ITEM_LIST_TYPE',
            stakeh_type: parseInt(stakehNumb),
        }
        this.props.setStakehType(stakehObj) 
        this.props.setActivePage(e.target.getAttribute('data-pagename'))

        const stakehDet={
            stakeholder_id:stakehSel,
            bio_access_id:idAccess,
            action:'ITEM_DETAIL',            
        }
        this.props.setStkhAccDetail(stakehDet)  
        
         //Ancestor Group
         const listAncestor={
            bio_access_id: idAccess,
            stakeholder_id: stakehSel,
            action: "ITEM_LIST_ANCESTOR",
            stakeh_type: parseInt(stakehNumb)      
        }
        this.props.setAncestor(listAncestor)

        //Descendant Member
        const listDescendant={
            bio_access_id: idAccess,
            stakeholder_id: stakehSel,
            action: "ITEM_LIST_DESCENDANT",
            stakeh_type: parseInt(stakehNumb)      
        }
        this.props.setDescendant(listDescendant)

        //Member
        const stakehMember={
            stakeholder_id:stakehSel,
            bio_access_id:idAccess,
            action:'ITEM_LIST_MEMBER',             
        }
        this.props.viewStakehMember(stakehMember)

         //List Group
         const stakehGroup={
            stakeholder_id:stakehSel,
            bio_access_id:idAccess,
            action:'ITEM_LIST_GROUP',             
        }
        this.props.viewStakehGroup(stakehGroup)

        // this.handleWizard()
         
        const customFieldObj={
            action:"ITEM_LIST_ATTRIBUTE",
            bio_access_id: idAccess
        }
        this.props.setcustomField(customFieldObj)



    }

  render() {

    const {pageTitle}=this.props.layout
    const {stakehSel} = this.props.stakeholderlistType
    const {wizardPage:wzdPage,container_Line} = this.props.stakeholderUpdate
    const {stakeholder_Detail} = this.props.stakeholderView      
    const item = stakeholder_Detail.find(rec=>rec.stakeholder_id===stakehSel) //iterate
    // console.log(item)
    // console.log(active_Wizard)   
  
    const Body=this.components[wzdPage]
    // const icon = this.components.icon[type]      
    
    return (
        <Fragment>
        <div className="breadcrumb-holder">
            <div className="container-fluid">
                <div className="breadcrumb">
                    <div className="breadcrumb-item"><a href='/' onClick={this.setActivePage} data-pagename="dashboard">Home</a></div>
                    <div className="breadcrumb-item"><a className="breadcrumb-item" href='/' data-pagename="index" onClick={this.setActivePage}>{pageTitle}</a></div>
                    <div className="breadcrumb-item"><a className="breadcrumb-item" href='/' data-pagename="viewStakeh" onClick={this.setActivePage}>Details</a></div>
                    <div className="breadcrumb-item active">{decodeURIComponent(item.full_name)}</div>
                </div>
            </div>
        </div>     
        
        <section className="forms">
           <div className="container-fluid">
               <header>
                  <h1 className="h3 display">{decodeURIComponent(item.full_name)}</h1>
               </header>
               <div className=" row">
                   <div className="col-lg-12">
                       <div className="card">
                       <div className="card-header">
                            <div className="row">
                                <FolTabHead
                                    activeEditor={this.handleWizard}
                                    active={wzdPage}
                                    isContainer={container_Line} />                             
                            </div>
                        </div>
                            <div className="card-body">
                               <Body                                     
                                    item={item}                                     
                                    active={wzdPage}/>                                   
                           </div>
                       </div>
                   </div>
               </div>
           </div>
       </section>
   </Fragment>
    )
  }
}
UpdateDetail.propTypes={
    session: PropTypes.object.isRequired,  
    layout:PropTypes.object.isRequired,
    stakeholderView: PropTypes.object.isRequired,    
    stakeholderlistType: PropTypes.object.isRequired,   
    setWizardPage: PropTypes.func.isRequired,
    stakeholderUpdate: PropTypes.object.isRequired,
    setStakehList: PropTypes.func.isRequired,
    setStkhAccDetail: PropTypes.func.isRequired,
    setAncestor: PropTypes.func.isRequired,
    setDescendant: PropTypes.func.isRequired,
    setActivePage: PropTypes.func.isRequired,
    setStakehType: PropTypes.func.isRequired,
    setSecLevel: PropTypes.func.isRequired,
    viewStakehGroup: PropTypes.func.isRequired,
    viewStakehMember: PropTypes.func.isRequired, 
    setcustomField: PropTypes.func.isRequired,
 
  }
  
  const mapStateToProps= state =>({
        session:state.session,      
        layout:state.layout,
        stakeholderView: state.stakeholderView,
        stakeholderlistType:state.stakeholderlistType,
        stakeholderUpdate:state.stakeholderUpdate,
  })
    
  export default connect(mapStateToProps,{
    setWizardPage,
    setRoleStore,
    setStakehList,
    setStkhAccDetail,
    setAncestor,
    setDescendant,
    setActivePage,
    setStakehType,
    setSecLevel,
    viewStakehGroup,
    viewStakehMember,
    setcustomField,
       
  
  })(UpdateDetail)
