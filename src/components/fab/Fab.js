import React from 'react' 
import Tooltip from 'rc-tooltip'
import 'rc-tooltip/assets/bootstrap.css';
 

export default function Fab({FabRec,delBtn}) {

   
const sendActive=(e)=>{
    e.preventDefault()
    FabRec(e.target.name, e.target.alt)      
}

const deleteBtn=()=>{    
    delBtn()
}

    

  return (
    <div>
    <div className="fab">
        <span className="fab-action-button">
            <Tooltip
                placement="left"
                overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>View Details</div>}
                arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                 >
                 <img name="view" src={require('../../img/detail2.svg')} alt='list' className='img-fluid' onClick={sendActive}    />
            </Tooltip>
        </span>

            <ul className="fab-buttons">
                <li className="fab-buttons-item">
                    <span className="fab-buttons-link">
                        <Tooltip
                            placement="left"
                            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Delete Stakeholder</div>}
                            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                            >
                             <img name="delete" src={require('../../img/trashcan.svg')} alt='delete' className='img-fluid' onClick={deleteBtn}   />
                        </Tooltip>
                    </span>
                </li>

                {/* <li className="fab-buttons-item">
                    <span className="fab-buttons-link">
                        <Tooltip
                            placement="left"
                            overlay={<div style={{ height: 20, width: '100%', textAlign:'center'}}>Send Email</div>}
                            arrowContent={<div className="rc-tooltip-arrow-inner"></div>}
                            >
                             <img name="email" src={require('../../img/add.svg')} alt='email' className='img-fluid'   />
                        </Tooltip>
                    </span>
                </li> */}
            </ul>
    </div>
  </div>
  )

}
