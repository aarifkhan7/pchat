import moment from 'moment';
import React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { FaRegCheckCircle } from "react-icons/fa";
import {deleteMineMessage,getMessage,deleteBothMsg} from "../store/actions/messengerAction.js"





const Message = ({message,currentfriend,scrollRef,typingMessage,deleteMessageSocket}) => {

 const {myInfo} = useSelector(state=>state.auth);
const dispatch=useDispatch();








  return (
       <>
       <div className='message-show'>
            {
                message && message.length > 0 ? message.map((m, index) => 
               
               //  {if(m.deleMsgMine!==""){
                    m.senderId === myInfo.id && m.deleMsgMine!==myInfo.id ? 
                    <div ref={scrollRef} className='my-message'>
                         {console.log("newe myided of deleete"+m.deleMsgMine)}
                    <div className='image-message'>
                         <div className='my-text'>
 <p className='message-text'>
     
     
 <span  onClick={()=>{
             

                    dispatch(deleteBothMsg({msgId:m._id, myId:myInfo.id}));

                    deleteMessageSocket({msgId:m._id, myId:myInfo.id});
                    dispatch(getMessage(currentfriend._id));

               }} className='deleIcon' >Delete for Everyone</span>
     
     
     
     
     
     <span  onClick={()=>{
                 

                    dispatch(deleteMineMessage({msgId:m._id, myId:myInfo.id}));
                    deleteMessageSocket({msgId:m._id, myId:myInfo.id});
                    
                    dispatch(getMessage(currentfriend._id));

               }} className='deleIcon' >Delete for Me</span> {m.message.text === '' ? <a href={`./image/${m.message.image}`}><img src={`./image/${m.message.image}`} /></a>  : m.message.text } </p>

     {
          index === message.length -1 && m.senderId === myInfo.id ? m.status === 'seen' ?  <a href={`./image/${currentfriend.image}`}><img className='img' src={`./image/${currentfriend.image}`} alt='' /></a> : m.status === 'delivared' ? <span> <FaRegCheckCircle /> </span> : <span> <FaRegCheckCircle /> </span> : ''
     }
 

                         </div>
                    </div>
                    <div className='time'>
        {moment(m.createdAt).startOf('mini').fromNow() } 
                    </div>
                 </div> :
                 m.deleMsgMine!==myInfo.id ?
                  <div ref={scrollRef} className='fd-message'>
                   <div className='image-message-time'>
                   <img src={`./image/${currentfriend.image}`} alt=''/>
                   <div className='message-time'>
                        <div className='fd-text'>
                         


             
               
               
               
               <p className='message-text'>
                    
                    
               <span name={m._id} onClick={()=>{
                    // console.log("event.target valu is"+m._id);

                    dispatch(deleteBothMsg({msgId:m._id, myId:myInfo.id}));

                    deleteMessageSocket({msgId:m._id, myId:myInfo.id});
                    dispatch(getMessage(currentfriend._id));

               }} className='deleIcon' >Delete for Everyone</span>
                    
                    
                    
                     <span name={m._id} onClick={()=>{
                    // console.log("event.target valu is"+m._id);

                    dispatch(deleteMineMessage({msgId:m._id, myId:myInfo.id}));


                    deleteMessageSocket({msgId:m._id, myId:myInfo.id});
                    dispatch(getMessage(currentfriend._id));

               }} className='deleIcon' >Delete for Me</span>
               
               
               
               
               
               {m.message.text === ''? <img src={`./image/${m.message.image}`} />  : m.message.text }  </p>
                        </div>
                        <div className='time'>
              {moment(m.createdAt).startOf('mini').fromNow() }             
                        </div>
                   </div>
                   </div>
              </div>:''
         
            ) :  <div className='friend_connect'>
              <img src={`./image/${currentfriend.image}`} alt='' />
              <h3>{currentfriend.userName} Connect You </h3>
              <span> {moment(currentfriend.createdAt).startOf('mini').fromNow() } </span>
                          </div>
            }
 

       </div>
       {
            typingMessage && typingMessage.msg && typingMessage.senderId === currentfriend._id ? <div className='typing-message'>
            <div className='fd-message'>
                        <div className='image-message-time'>
                        <img src={`./image/${currentfriend.image}`} alt='' />
                        <div className='message-time'>
                             <div className='fd-text'>
                    <p className='time'>Typing Message.... </p>
                             </div>
                             
                        </div>
                        </div>
                   </div>
     
            </div> : ''
       }

       

       </>
  )
};

export default Message;
