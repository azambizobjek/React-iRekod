import {WIZARD_PAGE,ROLE_STORE,STAKEHOLDER_LIST,STAKEHOLDER_VIEW,ITEM_LIST_ANCESTOR,ITEM_LIST_DESCENDANT,STORE_DETAIL,SECURITY_LEVEL,ADD_GROUP_ITEM} from './types'
import {biorisUrl} from '../appConfig'

//Select stakeholder
export const setWizardPage=(param)=>{
    return {
        type:WIZARD_PAGE,
        payload:param
    }
}

//Get Role
export const setRoleStore = (param) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/roles?param=${JSON.stringify(param)}`
        fetch(url,{method:'GET'})
        .then(res=>res.json())
        .then(res=>{
            // console.log(res)
            dispatch({
                type:ROLE_STORE,payload:res.results
            })
        })
}

//Security Level
export const setSecLevel = (param) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/securityLevel?param=${JSON.stringify(param)}`
        fetch(url,{method:'GET'})
        .then(res=>res.json())
        .then(res=>{
            // console.log(res)
            dispatch({
                type:SECURITY_LEVEL,payload:res.results
            })
        })
}

//Stakeholder List
export const setStakehList = (param) => dispatch =>{
    // console.log(stakehType)
    const url=`${biorisUrl}/stakeholder?param=${JSON.stringify(param)}`
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
            dispatch({
                type:STAKEHOLDER_LIST,payload:res.results
            })
        })
}

//SetStkhAccDetail
export const setStkhAccDetail = (param) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/stakeholder?param=${JSON.stringify(param)}`
        fetch(url)
        .then(res=>res.json())
        .then(res=>{
        //    if(res.results.acl_entries)
            dispatch({
                type:STAKEHOLDER_VIEW,payload:res.results
            })
        })
}

//ListAncestor
export const setAncestor = (param) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/stakeholder?param=${JSON.stringify(param)}`
        fetch(url)
        .then(res=>res.json())
        .then(res=>{ 
        //    if(res.results.acl_entries)
            dispatch({
                type:ITEM_LIST_ANCESTOR,payload:res.results
            })
        })
}

//ListDescendant
export const setDescendant = (param) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/stakeholder?param=${JSON.stringify(param)}`
        fetch(url)
        .then(res=>res.json())
        .then(res=>{ 
        //    if(res.results.acl_entries)
            dispatch({
                type:ITEM_LIST_DESCENDANT,payload:res.results
            })
        })
}

//Update Stakeholder
export const updStkh = (param) => dispatch =>{
    // console.log(param)
    const url=`${biorisUrl}/stakeholder?param=${JSON.stringify(param)}`
        fetch(url,{method:'PUT'})
        .then(res=>res.json())
        .then(res=>{ 
            console.log(res)
            dispatch({
                type:STORE_DETAIL,payload:res.results
            })
        })
}

//Add Group
export const setGroup = (param) => dispatch =>{
    console.log(param)
    const url=`${biorisUrl}/stakeholder?param=${JSON.stringify(param)}`
        fetch(url,{method:'POST'})
        .then(res=>res.json())
        .then(res=>{ 
            console.log(res)
            dispatch({
                type:ADD_GROUP_ITEM,payload:res.results
            })
        })
}